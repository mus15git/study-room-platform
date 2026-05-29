import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      toast.success("Registration Successful");

      navigate("/");

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
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
        />

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
          className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg text-white font-semibold"
        >
          Register
        </button>

        <p className="text-gray-400 mt-4 text-center">
          Already have an account?
          <Link
            to="/"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;