import React from "react";
import { Outlet, useLoaderData } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  const allTasks = useLoaderData();
  console.log(allTasks)
  return (
    <div className="flex flex-col min-h-screen">
      <div className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <Header allTasks={allTasks} />
      </div>

      <main>
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
