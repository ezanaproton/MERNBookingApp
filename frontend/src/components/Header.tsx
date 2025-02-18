// import React from "react";
import { Link } from "react-router-dom";

const Footer = () =>{
    return(
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-tight">
                <Link to="/">MernHolidays.com</Link>
            </span>
                <span className="text-white">Sign In</span>
            </div>
        </div>
)
}

export default Footer;