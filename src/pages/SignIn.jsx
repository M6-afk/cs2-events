import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Login fehlgeschlagen.");

      const data = await response.json();
      login(data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold text-orange-500 mb-6 tracking-widest">
        SIGN IN
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-[#111111] border border-orange-500 rounded p-6 flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-[#0a0a0a] border border-gray-600 text-white rounded px-4 py-2 focus:outline-none focus:border-orange-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="bg-[#0a0a0a] border border-gray-600 text-white rounded px-4 py-2 focus:outline-none focus:border-orange-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default SignIn;
