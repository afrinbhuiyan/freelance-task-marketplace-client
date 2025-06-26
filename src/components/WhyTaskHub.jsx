import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaGlobe, FaClock, FaUserTie, FaUsers } from "react-icons/fa";
import person from "../assets/person.png";

const WhyTaskHub = () => {
  const benefits = [
    "Vetted professionals only",
    "Secure milestone payments",
    "Global talent pool",
    "Time-saving matching",
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-white">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1">
            <div className="mb-14">
              <h2 className="text-5xl font-light text-gray-900 mb-6">
                The <span className="font-bold text-teal-600">TaskHub</span>{" "}
                Standard
              </h2>
              <p className="text-xl text-gray-600">
                Quality, reliability, and exceptional results
              </p>
            </div>
           <div className="space-y-8">
             {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start border-b border-gray-100 pb-6"
              >
                <div className="bg-teal-100 p-2 rounded-full mr-4">
                  <FaCheck className="text-teal-600" />
                </div>
                <h3 className="text-xl text-gray-800">{benefit}</h3>
              </motion.div>
            ))}
           </div>
          </div>

          <div className="relative flex-1">
            <div className="">
              <img
                src={person}
                alt="Professional collaboration"
                className="w-full h-[700px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-24 -left-0 bg-white p-6 rounded-xl shadow-2xl border border-gray-100 w-64 hover:-translate-y-2 transition-transform duration-300 z-10"
            >
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-lg mr-3">
                  <FaGlobe className="text-teal-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    10K+
                  </h3>
                  <p className="text-gray-500 text-sm">Successful Projects</p>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-teal-100 rounded-full -z-10 opacity-60" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-2xl border border-gray-100 w-64 hover:-translate-y-2 transition-transform duration-300 z-10"
            >
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <FaUsers className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    50K+
                  </h3>
                  <p className="text-gray-500 text-sm">Trusted Members</p>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-purple-100 rounded-full -z-10 opacity-60" />
            </motion.div>

            <div className="absolute top-1/4 -right-8 w-32 h-32 bg-teal-200 rounded-full opacity-20 blur-xl" />
            <div className="absolute bottom-1/3 -left-8 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-xl" />
          </div>
        </div>
    </section>
  );
};

export default WhyTaskHub;
