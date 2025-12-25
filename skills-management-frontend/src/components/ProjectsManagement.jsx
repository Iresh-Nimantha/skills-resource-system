import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";
import { apiCall } from "../hooks/useApi";

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "Planning",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await apiCall("/projects");
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiCall(`/projects/${editingId}`, "PUT", formData);
        Swal.fire("Updated!", "Project updated successfully", "success");
      } else {
        await apiCall("/projects", "POST", formData);
        Swal.fire("Created!", "Project created successfully", "success");
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      name: project.name,
      description: project.description || "",
      start_date: project.start_date || "",
      end_date: project.end_date || "",
      status: project.status || "Planning",
    });
    setEditingId(project.id);
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
        await apiCall(`/projects/${id}`, "DELETE");
        Swal.fire("Deleted!", "Project has been deleted.", "success");
        fetchProjects();
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      status: "Planning",
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Projects Management
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Project Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) =>
                    setFormData({ ...formData, start_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) =>
                    setFormData({ ...formData, end_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Planning">Planning</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
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

      {/* Projects Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="text-left py-5 px-6 font-bold text-lg text-gray-800 border-b-2 border-gray-200">
                  Project Name
                </th>
                <th className="text-left py-5 px-6 font-bold text-lg text-gray-800 border-b-2 border-gray-200">
                  Description
                </th>
                <th className="text-left py-5 px-6 font-bold text-lg text-gray-800 border-b-2 border-gray-200">
                  Dates
                </th>
                <th className="text-left py-5 px-6 font-bold text-lg text-gray-800 border-b-2 border-gray-200">
                  Status
                </th>
                <th className="text-left py-5 px-6 font-bold text-lg text-gray-800 border-b-2 border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
                >
                  <td className="py-6 px-6 font-semibold text-gray-900">
                    {project.name}
                  </td>
                  <td className="py-6 px-6 text-gray-700">
                    {project.description || "-"}
                  </td>
                  <td className="py-6 px-6 text-sm">
                    {project.start_date && project.end_date ? (
                      <div>
                        <div>{project.start_date}</div>
                        <div className="text-gray-500">
                          to {project.end_date}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-6 px-6">
                    {project.status && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : project.status === "Active"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    )}
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(project)}
                        className="group p-3 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:shadow-2xl hover:scale-110 transition-all duration-300"
                        title="Edit"
                      >
                        <Edit2 className="w-6 h-6 text-green-500 hover:text-green-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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

export default ProjectsManagement;
