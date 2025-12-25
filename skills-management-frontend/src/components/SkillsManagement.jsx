// ==========================================
// FILE: src/components/SkillsManagement.jsx
// ==========================================
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";
import { apiCall } from "../hooks/useApi";

const SkillsManagement = () => {
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await apiCall("/skills");
      setSkills(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiCall(`/skills/${editingId}`, "PUT", formData);
        Swal.fire("Updated!", "Skill updated successfully", "success");
      } else {
        await apiCall("/skills", "POST", formData);
        Swal.fire("Created!", "Skill created successfully", "success");
      }
      fetchSkills();
      resetForm();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      category: skill.category || "",
      description: skill.description || "",
    });
    setEditingId(skill.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await apiCall(`/skills/${id}`, "DELETE");
        Swal.fire("Deleted!", "Skill has been deleted.", "success");
        fetchSkills();
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", category: "", description: "" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Skills Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Skill" : "Add New Skill"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Framework, Programming Language"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="text-left py-5 px-6 font-bold text-lg text-gray-800 border-b-2 border-gray-200">
                  Skill Name
                </th>
                <th className="text-left py-5 px-6 font-bold text-lg text-gray-800 border-b-2 border-gray-200">
                  Category
                </th>
                <th className="text-left py-5 px-6 font-bold text-lg text-gray-800 border-b-2 border-gray-200">
                  Description
                </th>
                <th className="text-left py-5 px-6 font-bold text-lg text-gray-800 border-b-2 border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr
                  key={skill.id}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
                >
                  <td className="py-6 px-6 font-semibold text-gray-900">
                    {skill.name}
                  </td>
                  <td className="py-6 px-6">
                    {skill.category ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                        {skill.category}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-6 px-6 text-gray-700">
                    {skill.description || "-"}
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="group p-3 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:shadow-2xl hover:scale-110 transition-all duration-300"
                        title="Edit"
                      >
                        <Edit2 className="w-6 h-6 text-green-500 hover:text-green-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="group p-3 rounded-2xl hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:shadow-2xl hover:scale-110 transition-all duration-300"
                        title="Delete"
                      >
                        <Trash2 className="w-6 h-6 text-red-600 group-hover:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkillsManagement;
