import React from "react";
import Banner from "../components/Banner";
import FeaturedTasks from "../components/FeaturedTasks";
import BrowseCategory from "../components/BrowseCategory";
import ReviewSystem from "../components/ReviewSystem";
import WhyTaskHub from "../components/WhyTaskHub";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <div>
      <main className="flex-grow">
        <Banner />
      </main>
      <div className="max-w-[1500px] mx-auto">
        <BrowseCategory></BrowseCategory>
        <FeaturedTasks></FeaturedTasks>
        <WhyTaskHub></WhyTaskHub>
      </div>
      <HowItWorks></HowItWorks>
      <div className="max-w-[1500px] mx-auto">
        <ReviewSystem></ReviewSystem>
      </div>
    </div>
  );
};

export default Home;
