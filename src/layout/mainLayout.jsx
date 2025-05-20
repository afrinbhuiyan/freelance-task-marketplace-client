import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <Header />
      </header>
      <main className="flex-grow">
        <Banner />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Outlet />
        </div>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
