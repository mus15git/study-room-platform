import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response.data.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <Toaster />

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl w-[400px] shadow-lg"
      >
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg text-white font-semibold"
        >
          Login
        </button>

        <p className="text-gray-400 mt-4 text-center">
          Don’t have an account?
          <Link
            to="/register"
            className="text-blue-500 ml-2"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;