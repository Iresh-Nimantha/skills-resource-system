// ==========================================
// FILE: src/components/Dashboard.jsx
// ==========================================
import React, { useState, useEffect } from "react";
import { Users, Target, Briefcase } from "lucide-react";
import { apiCall } from "../hooks/useApi";

const Dashboard = () => {
  const [personnel, setPersonnel] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [personnelData, skillsData, projectsData] = await Promise.all([
        apiCall("/personnel"),
        apiCall("/skills"),
        apiCall("/projects"),
      ]);
      setPersonnel(personnelData);
      setSkills(skillsData);
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard & Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Personnel</p>
              <p className="text-4xl font-bold text-gray-800">
                {personnel.length}
              </p>
            </div>
            <Users className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Skills</p>
              <p className="text-4xl font-bold text-gray-800">
                {skills.length}
              </p>
            </div>
            <Target className="w-12 h-12 text-pink-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Projects</p>
              <p className="text-4xl font-bold text-gray-800">
                {projects.length}
              </p>
            </div>
            <Briefcase className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Top Personnel Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Top Personnel</h2>

        {personnel.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No personnel available
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Level
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {personnel.slice(0, 5).map((person) => (
                  <tr key={person.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{person.name}</td>
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
                    <td className="py-3 px-4">{person.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
