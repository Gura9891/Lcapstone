import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "../Component/FooterLayout/Footer";
import Header from "../Component/HeaderLayout/Header";

type Props = {};

export default function AdminTemplate({}: Props) {
  return (
    <>
     <Header />
     <Outlet />
     <Footer />
    </>
  );
}
