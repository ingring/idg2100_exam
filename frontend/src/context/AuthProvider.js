// Inspired by Dave Gray, video: https://www.youtube.com/watch?v=oUZjO00NkhY&t=562s
// And this https://www.youtube.com/watch?v=27KeYk-5vJw
import { createContext, useState } from "react";

const AuthContext = createContext({});

//makes a wrapper for all routes that makes login persist over refreshes and navigating
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;