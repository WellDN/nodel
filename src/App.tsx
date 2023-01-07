import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './Home'
import { Login, Signup } from "./login";


export default function App() {
    
    return(
    <div>
<Link 
to="">
    Home
</Link>
    <div>
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/login" element={<Login />} />
    </Routes>
</div>
</div>
    )
}