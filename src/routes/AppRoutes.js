import { Route, Routes } from "react-router-dom";
import Introduce from "../components/Introduce/Introduce";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const AppRoutes = () => {
    return <>
        <Routes>
            {/* public */}
            <Route path="/" element={<Home />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
        </Routes>
    </>
}

export default AppRoutes