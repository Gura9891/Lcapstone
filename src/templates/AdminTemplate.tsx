import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "../Component/FooterLayout/Footer";
import Header from "../Component/HeaderLayout/Header";
import NavbarLeft from "../Component/TableAdmin/NavbarLeft";

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
