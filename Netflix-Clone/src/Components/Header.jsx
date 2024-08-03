import { NavbarMenu } from "./Navbar.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/Firebase.jsx";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/userSlice.jsx";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
   

  return (
    <div className="bg-blue-gray-900 h-screen ">
      <div className=" w-full py-2 px-8 bg-gradient-to-b from-black ">
        <NavbarMenu />
      </div>
    </div>
  );
};

export default Header;
