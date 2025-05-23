import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

import lBg from "../assets/loginBackround.png";
import rImg from "../assets/register.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setError] = useState("");

  const navigate = useNavigate();

  const { createUser, googleLogin, updateUserProfile } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const { email, password, name, photoURL } = data;
    console.log(email, password, name, photoURL);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter");
    }

    createUser(email, password)
      .then((result) => {
        console.log(result);
        updateUserProfile({ displayName: name, photoURL: photoURL })
          .then(() => {
            Swal.fire({
              title: "Drag me!",
              icon: "success",
              draggable: true,
            });
            navigate("/");
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Logged in with Google",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
     <div className="min-h-screen pt-16">
      <div>
        <div
          className="lg:p-20 p-8 bg-cover bg-center"
          style={{ backgroundImage: `url(${lBg})` }}
        >
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign Up</h2>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row-reverse justify-between items-center mx-5 lg:mx-20 my-10 lg:my-20">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img 
              className="max-w-2xl w-full h-auto" 
              src={rImg} 
              alt="Sign up illustration" 
            />
          </div>
          
          <div className="w-full lg:w-1/2 space-y-8 p-8 lg:mx-20">
            <h2 className="mb-10 lg:mb-20 text-3xl lg:text-5xl font-roboto">
              Create your account
            </h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
                  <div className="flex-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="mt-1 block w-full px-3 py-2 border focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 placeholder:text-sm"
                      placeholder="Enter Your Name"
                    />
                  </div>

                  <div className="flex-1">
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
                </div>

                <div>
                  <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                    Profile Photo URL
                  </label>
                  <input
                    id="photoURL"
                    name="photoURL"
                    type="url"
                    className="mt-1 block w-full px-3 py-2 border focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 placeholder:text-sm"
                    placeholder="https://example.com/photo.jpg"
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
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors && (
                    <p className="mt-1 text-sm text-red-600">{errors}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="relative w-full inline-flex items-center justify-center px-10 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-yellow-400 group hover:bg-yellow-500"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-black bg-opacity-10 group-hover:w-full group-hover:h-56"></span>
                  <span className="relative">Register</span>
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
                  <FaGoogle className="mr-2" />
                  Google
                </button>
              </div>
            </div>

            <div className="text-center text-sm pt-4">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
