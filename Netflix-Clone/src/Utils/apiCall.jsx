import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
    const navigate = useNavigate();

    const signOutUser = async () => {
      try {
        console.log("signed out")
        await signOut(auth);
        navigate("/");
      } catch (error) {
        console.log("Sign out error", error);
      }
    };
  
    return signOutUser;
  };