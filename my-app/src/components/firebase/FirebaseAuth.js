import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase-config";

const FirebaseAuth = () => {
    const [values, setValues] = useState({ email: "", password: "" });
    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    const [userInfo, setUserInfo] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUserInfo(currentUser);
            } else {
                setUserInfo("");
            }
        });
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
    };
    const handleSignOut = () => {
        signOut(auth);
    };
    return (
        <div className="p-10">
            <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
                <form onSubmit={handleCreateUser}>
                    <input
                        type="text"
                        className="p-3 rounded border border-t-gray-200 w-full mb-5 outline-none focus:border-blue-500"
                        placeholder="Enter your email address"
                        name="email"
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        className="p-3 rounded border border-t-gray-200 w-full mb-5 outline-none focus:border-blue-500"
                        placeholder="Enter your author"
                        name="password"
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="p-3 bg-blue-500 text-white text-sm font-semibold w-full rounded-lg">
                        Sign up
                    </button>
                </form>
                <div className="mt-10 flex items-center gap-x-5">
                    <span>{userInfo?.email}</span>
                    <button onClick={handleSignOut} className="p-3 bg-purple-500 text-white text-sm font-semibold rounded-lg">
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FirebaseAuth;
