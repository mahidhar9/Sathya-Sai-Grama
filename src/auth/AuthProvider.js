import React, { createContext, useState, useEffect } from 'react';
import {auth} from '../auth/firebaseConfig';
import {onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            setUser(user);
        });
        return unsubscribe; // unsubscribe on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
