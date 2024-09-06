"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!data.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const { email, password } = data;

    try {
      const response = await axios.post(
        "https://backend-bora.onrender.com/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const responseData = response.data;

      if (!responseData.ok) {
        toast.error(responseData.message || "Login failed");
      } else {
        toast.success(responseData.message || "Login Successful");

        localStorage.setItem("userId", responseData.data._id);
        localStorage.setItem("userName", responseData.data.name);
        localStorage.setItem("userEmail", responseData.data.email);
        router.push("/dashboard"); 
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
      <Header isLoginPage={true} />
      <section className="py-5 overflow-clip relative">
        <div className="container">
          <div className="flex gap-2 justify-center">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 z-10">
              <h2 className="section-subtitle mb-4 text-[30px] text-center">Log In</h2>
              <p className="text-center mb-6">Enter your credentials below to log in to your account</p>
              <form onSubmit={loginUser}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className={`form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:outline-none`}
                    autoComplete="currentnew-password"
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

                <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r btn btn-primary hover:bg-[#001E80] text-white py-2 rounded-lg shadow-m transition-colors duration-300 flex items-center justify-center"
                  disabled={loading}
                >
               {loading ? <div className="spinner"></div> : "Log In"}
               </button>
                </div>

                <p className="text-center text-sm mt-4">
                  Dont have an account?{" "}
                  <Link href="/signup">
                    Sign Up
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