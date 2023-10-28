import { Route, Routes } from "react-router-dom";
import Introduce from "../components/Introduce/Introduce";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

import PrivateRoutes from "./PrivatesRoutes";
import Home from "../components/Home/Home";
import Explore from "../components/Explore/Explore";
import Posting from "../components/Posting/Posting";
import Account from "../components/Account/Account";

const AppRoutes = () => {

    return <>
        <Routes>
            {/* publics*/}
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* privates */}
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/posting" element={<Posting />} />
                <Route path="/account" element={<Account />} />
            </Route>

            
            <Route path="*" element={'404 not found'} exact="true" />
            
        </Routes>
    </>
}

export default AppRoutes