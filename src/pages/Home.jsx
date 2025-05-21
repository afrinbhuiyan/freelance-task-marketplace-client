import React from "react";
import Banner from "../components/Banner";
import FeaturedTasks from "../components/FeaturedTasks";
import BrowseCategory from "../components/BrowseCategory";
import ReviewSystem from "../components/ReviewSystem";

const Home = () => {
  return (
    <div>
      <main className="flex-grow">
        <Banner />
      </main>
      <BrowseCategory></BrowseCategory>
      <FeaturedTasks></FeaturedTasks>
      <ReviewSystem></ReviewSystem>
    </div>
  );
};

export default Home;
