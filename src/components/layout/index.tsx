import React from "react";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import ServerStatusProvider from "./ServerStatusProvider";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-[100vh]">
      <ToastContainer />
      <ServerStatusProvider>
        {children}
        <Footer />
      </ServerStatusProvider>
    </div>
  );
};

export default Layout;
