import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <Header />
      </div>
      {/* <header className="h-20 border"></header> */}
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
