import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };
    try {
      await registerUser(data).unwrap();
      toast.success("Akun berhasil dibuat!");
      navigate("/login");
    } catch (error) {
      setMessage("Username atau Email telah digunakan");
      toast.failed("Akun gagal dibuat!");
    }
  };

  return (
    <div className="max-w-sm bg-white mx-auto p-8 mt-36 mb-36">
      <h2 className="text-2xl font-semibold pt-5 ">Please Register</h2>
      <form
        onSubmit={handleRegister}
        className="space-y-5 max-x-sm mx-auto pt-8"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          required
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
        />
        {message && <p className="text-red-500">{message}</p>}
        <button className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md">
          Register
        </button>
      </form>
      <p className="my-5 text-center ">
        Already Have An Account? Please{" "}
        <Link to="/login" className="text-red-700 italic">
          Login
        </Link>
        .
      </p>
    </div>
  );
};

export default Register;
