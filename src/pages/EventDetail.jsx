import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError("Event konnte nicht geladen werden.");
      }
    };
    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (err) {
      setError("Event konnte nicht gelöscht werden.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-[#ff5500] transition-colors duration-200 text-sm mb-8 block"
        >
          ← Back
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {event && (
          <div className="bg-[#111118] border border-[#ffffff10] rounded-lg p-8 hover:border-[#ff5500] transition-all duration-200">
            <p className="text-[#ff5500] text-xs font-bold tracking-widest mb-3">
              {new Date(event.date).toLocaleDateString("de-DE")}
            </p>
            <h1 className="text-4xl font-black text-white mb-4">
              {event.title}
            </h1>
            <p className="text-gray-500 text-sm mb-6">📍 {event.location}</p>
            <p className="text-gray-300 leading-relaxed mb-8">
              {event.description}
            </p>
            {token && (
              <button
                onClick={handleDelete}
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm px-4 py-2 rounded transition-all duration-200 cursor-pointer"
              >
                Delete Event
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
