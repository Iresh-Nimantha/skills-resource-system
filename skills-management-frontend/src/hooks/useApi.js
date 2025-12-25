export const API_BASE = "http://localhost:5000/api";

export const apiCall = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "API Error");
    return data;
  } catch (error) {
    throw error;
  }
};
