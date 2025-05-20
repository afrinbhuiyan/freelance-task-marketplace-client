import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Photo URL
              </label>
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors && <p className="mt-1 text-sm text-red-600">{errors}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
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
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaGoogle className="mr-2" />
              Google
            </button>
          </div>
        </div>

        <div className="text-center text-sm">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
