import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Registrierung fehlgeschlagen.");
      navigate("/signin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="text-[#ff5500] font-black text-3xl">FRAG</span>
          <span className="text-white font-black text-3xl">.GG</span>
          <p className="text-gray-500 text-sm mt-2">Create your account</p>
        </div>
        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}
        <div className="bg-[#111118] border border-[#ffffff10] rounded-lg p-8 flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="bg-[#0a0a0f] border border-[#ffffff15] text-white rounded px-4 py-3 focus:outline-none focus:border-[#ff5500] transition-colors duration-200 placeholder-gray-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-[#0a0a0f] border border-[#ffffff15] text-white rounded px-4 py-3 focus:outline-none focus:border-[#ff5500] transition-colors duration-200 placeholder-gray-600"
          />
          <button
            onClick={handleSubmit}
            className="bg-[#ff5500] hover:bg-[#cc4400] text-white font-bold py-3 rounded transition-colors duration-200"
          >
            REGISTER
          </button>
          <p className="text-gray-600 text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-[#ff5500] cursor-pointer hover:text-orange-400"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
