import React from "react";
import Banner from "../components/Banner";
import FeaturedTasks from "../components/FeaturedTasks";

const Home = () => {
  return (
    <div>
      <main className="flex-grow">
        <Banner />
      </main>
        <FeaturedTasks></FeaturedTasks>
    </div>
  );
};

export default Home;
