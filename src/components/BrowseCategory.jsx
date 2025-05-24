import React from "react";
import {
  FaCode,
  FaPenFancy,
  FaChartLine,
  FaPenAlt,
  FaMusic,
  FaVideo,
  FaLaptopCode,
  FaMoneyBillWave,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { TbDeviceImacCode } from "react-icons/tb";

import develop from "../assets/coding.png";
import design from "../assets/graphic-design.png";
import marketing from "../assets/graph.png";
import writing from "../assets/interpreter.png";
import audio from "../assets/microphone.png";
import video from "../assets/video.png";
import programming from "../assets/school.png";
import accounting from "../assets/growth.png";

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const categories = [
  {
    title: "Development & IT",
    icon: <img className="w-12" src={develop} alt="" />,
    services: "8 Services",
    description: "Software Engineer, Web/Mobile Developer & More",
  },
  {
    title: "Design & Creative",
    icon: <img className="w-12" src={design} alt="" />,
    services: "8 Services",
    description: "Website Design, Adobe XD, Figma, Photoshop",
  },
  {
    title: "Digital Marketing",
    icon: <img className="w-12" src={marketing} alt="" />,
    services: "1 Service",
    description: "Social Media Management & Digital Services",
  },
  {
    title: "Writing & Translation",
    icon: <img className="w-12" src={writing} alt="" />,
    services: "1 Service",
    description: "Writing, Translation Projects, Quick Delivery",
  },
  {
    title: "Music & Audio",
    icon: <img className="w-12" src={audio} alt="" />,
    services: "0 Services",
    description: "Freelance Music, Audio Services, Music Projects",
  },
  {
    title: "Video & Animation",
    icon: <img className="w-12" src={video} alt="" />,
    services: "0 Services",
    description: "Animation Video Maker with Studio Quality",
  },
  {
    title: "Programming & Tech",
    icon: <img className="w-12" src={programming} alt="" />,
    services: "1 Service",
    description: "Programmers and Coders for Your Project",
  },
  {
    title: "Finance & Accounting",
    icon: <img className="w-12" src={accounting} alt="" />,
    services: "4 Services",
    description: "Team Collaboration for Your Business Needs",
  },
];

const BrowseCategory = () => {
  return (
    <div className="py-16 lg:py-28 px-4">
      <div className="max-w-7xl mx-auto">

        <Reveal keyframes={customAnimation} triggerOnce duration={800}>
          <div className="text-start">
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3 roboto">
              Browse Services by Category
            </h2>
            <p className="text-gray-600 roboto text-sm md:text-base">
              Get inspiration from 800+ skills
            </p>
            <div className="w-24 h-1 bg-yellow-400 mt-2 md:mt-4 rounded-full" />
          </div>
        </Reveal>

        <Zoom triggerOnce delay={800} duration={600}>
          <div className="flex justify-end">
            <button className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 font-medium py-2 px-4 transition-all duration-300 hover:-translate-y-1 group">
            <span className="group-hover:-translate-x-1 transition-transform">
              <FaArrowLeft />
            </span>
            <span className="text-sm md:text-base">
                View All Categories
            </span>
          </button>
          </div>
        </Zoom>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Fade
              key={index}
              direction="up"
              delay={index * 100}
              triggerOnce
              duration={600}
              cascade
            >
              <div
                className={`relative group bg-white overflow-hidden rounded-xl p-6 h-full hover:border-l-4 border-yellow-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="py-4 text-yellow-500">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 relative z-10">
                  {category.title}
                </h3>
                <p className={` font-medium mb-2 relative z-10`}>
                  {category.services}
                </p>
                <p className="text-gray-600 text-sm relative z-10">
                  {category.description}
                </p>
                <button
                  className={`mt-4  text-sm font-medium flex items-center relative z-10 group-hover:underline`}
                >
                  Explore
                  <FaArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseCategory;
