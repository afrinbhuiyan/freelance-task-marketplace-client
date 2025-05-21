import React from "react";
import Banner from "../components/Banner";
import FeaturedTasks from "../components/FeaturedTasks";
import HowItWorks from "../components/HowItWorks";
import BrowseCategory from "../components/BrowseCategory";

const Home = () => {
  return (
    <div>
      <main className="flex-grow">
        <Banner />
      </main>
      <BrowseCategory></BrowseCategory>
      <FeaturedTasks></FeaturedTasks>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;
