"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const router = useRouter();
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!data.password) newErrors.password = "Password is required";
    if (!data.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";
    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      for (const [key, message] of Object.entries(validationErrors)) {
        toast.error(message);
      }
      return;
    }

    setLoading(true);
    setErrors({});

    const { name, email, password, confirmPassword } = data;

    try {
      const response = await axios.post(
        "https://backend-bora.onrender.com/user/register",
        { name, email, password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const responseData = response.data;

      if (!responseData.ok) {
        toast.error(responseData.message || "Registration failed");
      } else {
        setData({ name: "", email: "", password: "", confirmPassword: "" });
        toast.success(
          responseData.message || "Registration Successful, Welcome!"
        );
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "An unexpected error occurred"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header isRegisterPage={true} />
    <section
    className="py-5 overflow-clip relative">
        <div className="container">
      <div className="flex gap-2 justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 z-10">
        <h2 className="section-subtitle mb-4 text-[30px] text-center">Sign Up</h2>
        <p className="text-center mb-6">Enter your details below to create your account and get started</p>
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className={`form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:outline-none`}
              autoComplete="off"
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className={`form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:outline-none`}
              autoComplete="off" 
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className={`form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:outline-none`}
                autoComplete="new-password" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
             >
                {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
              </button>
            </div>
            {errors.password && <div className="text-red-500">{errors.password}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={data.confirmPassword}
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                className={`form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
              </button>
            </div>
            {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-gradient-to-r btn btn-primary hover:bg-[#001E80] text-white py-2 rounded-lg shadow-md transition-colors duration-300"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
    <Footer />
    </>
  );
}

