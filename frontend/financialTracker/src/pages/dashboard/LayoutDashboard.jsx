import { Outlet } from "react-router-dom";
import React from 'react'
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";

function LayoutDashboard() {
  return (
    <>
      <Navbar />
      <div className=" h-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default LayoutDashboard