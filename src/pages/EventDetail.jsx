import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-orange-500 hover:text-orange-400 mb-6 block"
      >
        ← Zurück
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {event && (
        <div className="bg-[#111111] border border-orange-500 rounded p-6">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">
            {event.title}
          </h1>
          <p className="text-gray-400 text-sm mb-4">{event.date}</p>
          <p className="text-gray-300">{event.description}</p>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
