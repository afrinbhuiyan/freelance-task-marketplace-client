import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCreative,
  Pagination,
  Navigation,
} from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { Fade, Zoom, Bounce } from "react-awesome-reveal";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../assets/banner-1.webp";
import banner2 from "../assets/banner-2.avif";
import banner3 from "../assets/banner-3.avif";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Post Your Task",
      typedWords: [
        "Web Projects",
        "Design Jobs",
        "Marketing Work",
        "Writing Tasks",
      ],
      description:
        "Easily post your tasks and connect with skilled freelancers today.",
      buttonText: "Add a Task",
      buttonLink: "/add-task",
      bgImage: banner1,
      accentColor: "text-yellow-100",
      buttonColor: "bg-white hover:bg-gray-100 text-gray-900",
      inputPlaceholder: "What task do you need done?",
    },
    {
      id: 2,
      title: "Browse Freelance Jobs",
      typedWords: ["Development", "Design", "Writing", "Marketing"],
      description:
        "Find the perfect task for your skillset and start earning instantly.",
      buttonText: "Browse Tasks",
      buttonLink: "/browse",
      bgImage: banner2,
      accentColor: "text-yellow-100",
      buttonColor: "bg-white hover:bg-gray-100 text-gray-900",
      inputPlaceholder: "Search for jobs...",
    },
    {
      id: 3,
      title: "Manage Your Work",
      typedWords: [
        "Your Posted Tasks",
        "Bid Responses",
        "Task Updates",
        "Collaborations",
      ],
      description:
        "Keep track of your tasks, bids, and updates — all in one place.",
      buttonText: "My Posted Tasks",
      buttonLink: "/my-posted-tasks",
      bgImage: banner3,
      overlayColor: "rgba(59, 130, 246, 0.75)",
      accentColor: "text-yellow-100",
      buttonColor: "bg-white hover:bg-gray-100 text-gray-900",
      inputPlaceholder: "Filter your tasks...",
    },
  ];

  return (
    <div className="relative overflow-hidden font-['Inter']">
      <Swiper
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, EffectCreative, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-[600px] md:h-[800px] overflow-hidden"
              style={{
                backgroundImage: `url(${slide.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-[#11111193]"></div>
              <div className="absolute inset-0 bg-noise opacity-10"></div>

              <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                <div className="md:w-1/2">
                  <Fade direction="left" duration={800} cascade>
                    <div className="space-y-6">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-['Poppins']">
                        {slide.title}{" "}
                        <span className={`${slide.accentColor} font-semibold`}>
                          <Typewriter
                            words={slide.typedWords}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1500}
                          />
                        </span>
                      </h1>

                      <Zoom duration={600} delay={300}>
                        <p className="text-xl text-white/90 max-w-lg font-medium">
                          {slide.description}
                        </p>
                      </Zoom>

                      <Fade delay={400} duration={800}>
                        <div className="relative max-w-lg">
                          <input
                            type="text"
                            placeholder={slide.inputPlaceholder}
                            className="w-full py-4 px-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 pr-12"
                          />
                          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </Fade>

                      <div className="flex gap-4 flex-wrap pt-2">
                        <Fade delay={500} duration={800}>
                          <button
                            className={`${slide.buttonColor} px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                          >
                            {slide.buttonText}
                          </button>
                        </Fade>
                        <Bounce delay={700}>
                          <button className="border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-full font-medium transition-all">
                            Learn More
                          </button>
                        </Bounce>
                      </div>
                    </div>
                  </Fade>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute z-30 bottom-8 right-8 md:bottom-auto md:right-8 md:top-1/2 md:-translate-y-1/2">
          <div className="swiper-button-next !text-white !bg-white/10 !backdrop-blur-sm !w-12 !h-12 !rounded-full !border !border-white/20 after:!text-xl hover:!scale-110 transition-transform"></div>
        </div>
        <div className="absolute z-30 bottom-8 left-8 md:bottom-auto md:left-8 md:top-1/2 md:-translate-y-1/2">
          <div className="swiper-button-prev !text-white !bg-white/10 !backdrop-blur-sm !w-12 !h-12 !rounded-full !border !border-white/20 after:!text-xl hover:!scale-110 transition-transform"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
