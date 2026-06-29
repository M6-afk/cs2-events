import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data.results || []);
      } catch (err) {
        setError("Events konnten nicht geladen werden.");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-6 tracking-widest">
        CS2 TOURNAMENTS
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/events/${event.id}`)}
            className="bg-[#111111] border border-orange-500 rounded p-4 cursor-pointer hover:bg-[#1a1a1a] transition"
          >
            <h2 className="text-white font-bold text-lg">{event.title}</h2>
            <p className="text-gray-400 text-sm mt-1">
              {new Date(event.date).toLocaleDateString("de-DE")}
            </p>
            <p className="text-orange-400 text-sm mt-1">📍 {event.location}</p>
            <p className="text-gray-300 text-sm mt-2 line-clamp-2">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
