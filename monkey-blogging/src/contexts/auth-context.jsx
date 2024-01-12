import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
function AuthProvider(props) {
    const [userInfo, setUserInfo] = useState({});
    const value = { userInfo, setUserInfo };
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        setUserInfo(user)
      })
    }, [])
    
    return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
    const context = useContext(AuthContext);
    if (typeof context === "undefined") {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
