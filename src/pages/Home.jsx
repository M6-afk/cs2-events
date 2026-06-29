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
    <div className="bg-[#0a0a0f]">
      <div className="pt-32 pb-16 px-8 border-b border-[#ff5500]/20">
        <p className="text-[#ff5500] text-sm font-bold tracking-widest mb-3">
          FRAG.GG
        </p>
        <h1 className="text-5xl font-black text-white mb-4">
          The Home of <span className="text-[#ff5500]">CS2</span> Events
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Discover tournaments, majors and community events from around the
          world.
        </p>
      </div>
      <div className="px-8 py-12">
        <h2 className="text-white font-bold text-xl mb-6 tracking-wide">
          UPCOMING EVENTS
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              className="bg-[#111118] border border-[#ffffff10] rounded-lg p-5 cursor-pointer hover:border-[#ff5500] hover:bg-[#15151f] transition-all duration-200"
            >
              <p className="text-[#ff5500] text-xs font-bold tracking-widest mb-2">
                {new Date(event.date).toLocaleDateString("de-DE")}
              </p>
              <h2 className="text-white font-bold text-lg mb-1">
                {event.title}
              </h2>
              <p className="text-gray-500 text-sm mb-3">📍 {event.location}</p>
              <p className="text-gray-400 text-sm line-clamp-2">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
