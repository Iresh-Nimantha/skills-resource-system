import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Target, X } from "lucide-react";
import Swal from "sweetalert2";
import { apiCall } from "../hooks/useApi";

const PersonnelManagement = () => {
  const [personnel, setPersonnel] = useState([]);
  const [skills, setSkills] = useState([]);
  const [assignedSkills, setAssignedSkills] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showSkillsSection, setShowSkillsSection] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    experience_level: "Junior",
  });

  useEffect(() => {
    fetchPersonnel();
    fetchSkills();
  }, []);

  // Fetch all personnel
  const fetchPersonnel = async () => {
    try {
      const data = await apiCall("/personnel");
      setPersonnel(data);
      await fetchAssignedSkills(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all skills
  const fetchSkills = async () => {
    try {
      const data = await apiCall("/skills");
      setSkills(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch assigned skills for all personnel
  const fetchAssignedSkills = async (personnelList) => {
    const result = {};
    for (const person of personnelList) {
      const data = await apiCall(`/personnel-skills/${person.id}/skills`);
      result[person.id] = data;
    }
    setAssignedSkills(result);
  };

  // ===== CRUD FUNCTIONS =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiCall(`/personnel/${editingId}`, "PUT", formData);
        Swal.fire("Updated!", "Personnel updated successfully", "success");
      } else {
        await apiCall("/personnel", "POST", formData);
        Swal.fire("Created!", "Personnel created successfully", "success");
      }
      fetchPersonnel();
      resetForm();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleEdit = (person) => {
    setFormData({
      name: person.name,
      email: person.email,
      role: person.role || "",
      experience_level: person.experience_level,
    });
    setEditingId(person.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await apiCall(`/personnel/${id}`, "DELETE");
        Swal.fire("Deleted!", "Personnel has been deleted.", "success");
        fetchPersonnel();
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", role: "", experience_level: "Junior" });
    setEditingId(null);
    setShowForm(false);
  };

  // ===== SKILL ASSIGNMENT FUNCTIONS =====
  const handleAssignSkills = (person) => {
    setSelectedPersonnel(person);
    // Preload already assigned skills
    setSelectedSkills(
      (assignedSkills[person.id] || []).map((s) => ({
        id: s.id,
        name: s.name,
        proficiency: s.proficiency,
      }))
    );
    setShowSkillsSection(true);
  };

  const toggleSkillSelection = (skill) => {
    const isSelected = selectedSkills.some((s) => s.id === skill.id);
    if (isSelected) {
      setSelectedSkills(selectedSkills.filter((s) => s.id !== skill.id));
    } else {
      setSelectedSkills([
        ...selectedSkills,
        { ...skill, proficiency: "Intermediate" },
      ]);
    }
  };

  const updateSkillProficiency = (skillId, proficiency) => {
    setSelectedSkills(
      selectedSkills.map((skill) =>
        skill.id === skillId ? { ...skill, proficiency } : skill
      )
    );
  };

  const removeSelectedSkill = (skillId) => {
    setSelectedSkills(selectedSkills.filter((s) => s.id !== skillId));
  };

  const handleBulkSave = async () => {
    if (!selectedPersonnel || selectedSkills.length === 0) return;

    Swal.fire({
      title: "Assigning skills...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await apiCall("/personnel-skills/bulk-assign", "POST", {
        personnelId: selectedPersonnel.id,
        skills: selectedSkills.map((s) => ({
          skillId: s.id,
          proficiency: s.proficiency,
        })),
      });

      Swal.close();
      Swal.fire({
        title: "Success!",
        text: `${selectedSkills.length} skills assigned to ${selectedPersonnel.name}`,
        icon: "success",
        confirmButtonText: "Awesome!",
      });

      setSelectedSkills([]);
      setShowSkillsSection(false);
      fetchAssignedSkills(personnel); // Refresh after saving
    } catch (error) {
      Swal.close();
      Swal.fire("Error", "Failed to assign skills", "error");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Personnel Management
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Personnel
          </button>
        </div>
      </div>

      {/* ===== PERSONNEL TABLE ===== */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="py-5 px-6 font-bold text-gray-800">Name</th>
                <th className="py-5 px-6 font-bold text-gray-800">Email</th>
                <th className="py-5 px-6 font-bold text-gray-800">Role</th>
                <th className="py-5 px-6 font-bold text-gray-800">Level</th>
                <th className="py-5 px-6 font-bold text-gray-800">Skills</th>
                <th className="py-5 px-6 font-bold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {personnel.map((person) => (
                <tr
                  key={person.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-6 px-6">{person.name}</td>
                  <td className="py-6 px-6">{person.email}</td>
                  <td className="py-6 px-6">{person.role || "-"}</td>
                  <td className="py-6 px-6">{person.experience_level}</td>
                  <td className="py-6 px-6">
                    {assignedSkills[person.id]?.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-block px-2 py-1 m-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
                      >
                        {skill.name} ({skill.proficiency})
                      </span>
                    ))}
                  </td>
                  <td className="py-6 px-6 flex gap-4 items-center">
                    {/* Assign Skills */}
                    <button
                      onClick={() => handleAssignSkills(person)}
                      className="hover:scale-110 transition"
                    >
                      <Target
                        className="text-blue-500 hover:text-blue-600"
                        size={20}
                      />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(person)}
                      className="hover:scale-110 transition"
                    >
                      <Edit2
                        className="text-green-500 hover:text-green-600"
                        size={20}
                      />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(person.id)}
                      className="hover:scale-110 transition"
                    >
                      <Trash2
                        className="text-red-500 hover:text-red-600"
                        size={20}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== SKILL ASSIGNMENT SECTION ===== */}
      {showSkillsSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Assign Skills to {selectedPersonnel?.name}
              </h2>
              <button onClick={() => setShowSkillsSection(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {skills.map((skill) => {
                const selected = selectedSkills.find((s) => s.id === skill.id);
                return (
                  <div
                    key={skill.id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={!!selected}
                        onChange={() => toggleSkillSelection(skill)}
                        className="mr-2"
                      />
                      {skill.name}
                    </div>
                    {selected && (
                      <select
                        value={selected.proficiency}
                        onChange={(e) =>
                          updateSkillProficiency(skill.id, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleBulkSave}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Save Skills
            </button>
          </div>
        </div>
      )}

      {/* ===== PERSONNEL FORM SECTION ===== */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit" : "Add"} Personnel
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              />
              <select
                value={formData.experience_level}
                onChange={(e) =>
                  setFormData({ ...formData, experience_level: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              >
                <option value="Junior">Junior</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingId ? "Update" : "Add"} Personnel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonnelManagement;
