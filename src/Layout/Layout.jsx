// عاوز لما يدوس ع برودكت يعمل كوينت جمب الجرس

//
import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Nav />

      <Outlet />

      <Footer />
    </>
  );
}
