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
    <div className="min-h-screen bg-[#0a0a0f] pt-24 px-8">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-[#ff5500] transition-colors duration-200 text-sm mb-8 block"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-black text-white mb-2">
          Create <span className="text-[#ff5500]">Event</span>
        </h1>
        <p className="text-gray-500 text-sm mb-8">Add a new event to FRAG.GG</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="bg-[#111118] border border-[#ffffff10] rounded-lg p-8 flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="bg-[#0a0a0f] border border-[#ffffff15] text-white rounded px-4 py-3 focus:outline-none focus:border-[#ff5500] transition-colors duration-200 placeholder-gray-600"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="bg-[#0a0a0f] border border-[#ffffff15] text-white rounded px-4 py-3 focus:outline-none focus:border-[#ff5500] transition-colors duration-200 placeholder-gray-600"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-[#0a0a0f] border border-[#ffffff15] text-white rounded px-4 py-3 focus:outline-none focus:border-[#ff5500] transition-colors duration-200"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="bg-[#0a0a0f] border border-[#ffffff15] text-white rounded px-4 py-3 focus:outline-none focus:border-[#ff5500] transition-colors duration-200 placeholder-gray-600 resize-none"
          />
          <button
            onClick={handleSubmit}
            className="bg-[#ff5500] hover:bg-[#cc4400] text-white font-bold py-3 rounded transition-colors duration-200"
          >
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
