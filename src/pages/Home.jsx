import React from "react";
import Banner from "../components/Banner";
import { useLoaderData } from "react-router";

const Home = () => {
  const data = useLoaderData();
  return (
    <div>
      <main className="flex-grow">
        <Banner slides={data} />
      </main>
    </div>
  );
};

export default Home;
