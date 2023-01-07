import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "./login";

export function Home() {
    return(
    <>
    <div className="">
        <Link
    to={"/login"}>
        login
    </Link>
    </div>
    <div>
        <Link
    to={"/signup"}>
        signup
    </Link>
        </div>
    </>
    )
}