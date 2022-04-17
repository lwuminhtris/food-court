
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import CheckOut from "./pages/Checkout/checkout";


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="checkout" element={<CheckOut />} />
        </Routes>
    )
}