import { Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { dispatchGetAccount } from "../dispatchs/dispatchAccount";

import Introduce from "../components/Introduce/Introduce";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

import PrivateRoutes from "./PrivatesRoutes";
import Welcome from "../components/Welcome/Welcome";
import Home from "../components/Home/Home";
import Explore from "../components/Explore/Explore";
import Posting from "../components/Posting/Posting";
import MyProfile from "../components/MyProfile/MyProfile";
import Profile from "../components/re-use/Profile/Profile";
import Search from "../components/Search/Search";
import ChatBoxs from "../components/ChatBoxs/ChatBoxs";


const AppRoutes = ({ socketRef }) => {
    let checkLogin = JSON.parse(localStorage.getItem('checkLogin'))
    
    useEffect(() => {
        if (checkLogin === true) {
            dispatchGetAccount()
        }
    }, [checkLogin])

    return <>
        <Routes>
            {/* publics*/}
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path='/profile' element={<Profile />} />

            {/* privates */}
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/posting" element={<Posting />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/chat-boxs" element={<ChatBoxs socketRef={socketRef}/>} />
            </Route>

            
            <Route path="*" element={'404 not found'} exact="true" />
            
        </Routes>
    </>
}

export default AppRoutes