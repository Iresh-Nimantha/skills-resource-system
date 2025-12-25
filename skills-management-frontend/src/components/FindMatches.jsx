// ==========================================
// FILE: src/components/FindMatches.jsx
// ==========================================
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Swal from "sweetalert2";
import { apiCall } from "../hooks/useApi";

const FindMatches = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);

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

  const handleFindMatches = async () => {
    if (!selectedProject) {
      Swal.fire("Error", "Please select a project", "error");
      return;
    }

    setLoading(true);
    try {
      // Get project details
      const project = await apiCall(`/projects/${selectedProject}`);
      setProjectDetails(project);

      // Get matching personnel
      const data = await apiCall(`/projects/${selectedProject}/match`);
      setMatches(data);

      if (data.length === 0) {
        Swal.fire(
          "No Matches",
          "No personnel match the project requirements",
          "info"
        );
      } else {
        Swal.fire(
          "Success",
          `Found ${data.length} matching personnel`,
          "success"
        );
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
      console.error(error);
    }
    setLoading(false);
  };

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case "Expert":
        return "bg-purple-100 text-purple-800";
      case "Advanced":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Beginner":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Find Matches</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a project...</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name} {project.status && `(${project.status})`}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleFindMatches}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? "Searching..." : "Find Matches"}
          </button>
        </div>
      </div>

      {/* Project Details */}
      {projectDetails && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Project: {projectDetails.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Description:</span>
              <p className="text-gray-600">
                {projectDetails.description || "No description"}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs ${
                  projectDetails.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : projectDetails.status === "Active"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {projectDetails.status}
              </span>
            </div>
            {projectDetails.start_date && (
              <div>
                <span className="font-medium text-gray-700">Start Date:</span>
                <span className="text-gray-600 ml-2">
                  {projectDetails.start_date}
                </span>
              </div>
            )}
            {projectDetails.end_date && (
              <div>
                <span className="font-medium text-gray-700">End Date:</span>
                <span className="text-gray-600 ml-2">
                  {projectDetails.end_date}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Matching Personnel */}
      {matches.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-lg font-semibold text-blue-900">
              Matching Personnel ({matches.length})
            </h2>
            <p className="text-sm text-blue-700 mt-1">
              These personnel meet all required skills and proficiency levels
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Level
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Matching Skills
                  </th>
                </tr>
              </thead>
              <tbody>
                {matches.map((person) => (
                  <tr key={person.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{person.name}</td>
                    <td className="py-3 px-4 text-gray-600">{person.email}</td>
                    <td className="py-3 px-4">{person.role || "-"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          person.experience_level === "Senior"
                            ? "bg-green-100 text-green-800"
                            : person.experience_level === "Mid-Level"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {person.experience_level}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {person.skills?.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded text-xs ${getProficiencyColor(
                              skill.proficiency
                            )}`}
                          >
                            {skill.skill_name} ({skill.proficiency})
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindMatches;
