import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Event konnte nicht erstellt werden.");

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold text-orange-500 mb-6 tracking-widest">
        CREATE EVENT
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-[#111111] border border-orange-500 rounded p-6 flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="bg-[#0a0a0a] border border-gray-600 text-white rounded px-4 py-2 focus:outline-none focus:border-orange-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="bg-[#0a0a0a] border border-gray-600 text-white rounded px-4 py-2 focus:outline-none focus:border-orange-500"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="bg-[#0a0a0a] border border-gray-600 text-white rounded px-4 py-2 focus:outline-none focus:border-orange-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="bg-[#0a0a0a] border border-gray-600 text-white rounded px-4 py-2 focus:outline-none focus:border-orange-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition"
        >
          CREATE
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
