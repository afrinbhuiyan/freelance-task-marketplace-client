import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

import lBg from "../assets/loginBackround.png";
import lImg from "../assets/login.png";
import { AuthContext } from "../provider/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signInUser, googleLogin } = use(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    const form = e.target;
    const { email, password } = Object.fromEntries(new FormData(form).entries());

    try {
      await signInUser(email, password);
      Swal.fire({
        title: "Welcome Back!",
        text: "You have successfully logged in",
        icon: "success",
        confirmButtonText: "Continue",
        background: "#FFF9E6",
        confirmButtonColor: "#F59E0B",
      });
      navigate("/");
    } catch (error) {
      setErrors({ general: error.message });
      Swal.fire({
        title: "Login Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
        background: "#FFF9E6",
        confirmButtonColor: "#F59E0B",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      Swal.fire({
        title: "Welcome!",
        text: "Logged in with Google successfully",
        icon: "success",
        confirmButtonText: "Continue",
        background: "#FFF9E6",
        confirmButtonColor: "#F59E0B",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
        background: "#FFF9E6",
        confirmButtonColor: "#F59E0B",
      });
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div>
        <div
          className="lg:p-20 p-8 bg-cover bg-center"
          style={{ backgroundImage: `url(${lBg})` }}
        >
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row-reverse justify-between items-center mx-5 lg:mx-20 my-10 lg:my-20">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img 
              className="max-w-2xl w-full h-auto" 
              src={lImg} 
              alt="Login illustration" 
            />
          </div>
          
          <div className="w-full lg:w-1/2 space-y-8 p-8 lg:mx-20">
            <h2 className="mb-10 lg:mb-20 text-3xl lg:text-5xl font-roboto">
              Welcome back
            </h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 placeholder:text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="block w-full px-3 py-2 border focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 placeholder:text-sm pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              {errors.general && (
                <p className="text-sm text-red-600">{errors.general}</p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative w-full inline-flex items-center justify-center px-10 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white group ${
                    loading ? "bg-yellow-500" : "bg-yellow-400 hover:bg-yellow-500"
                  }`}
                >
                  {loading ? (
                    <span className="relative">Processing...</span>
                  ) : (
                    <>
                      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-black bg-opacity-10 group-hover:w-full group-hover:h-56"></span>
                      <span className="relative">Login</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaGoogle className="mr-2 text-red-500" />
                  Google
                </button>
              </div>
            </div>

            <div className="text-center text-sm pt-4">
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;