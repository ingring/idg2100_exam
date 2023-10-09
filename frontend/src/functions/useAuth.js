// inspiried by this video by dave grey https://www.youtube.com/watch?v=oUZjO00NkhY&t=729s
import { useContext, useDebugValue } from "react"
import AuthContext from "../context/AuthProvider"



// A custom hook that retrieves the authentication object from the context and adds a label for debugging purposes
const useAuth = () => {

    const { auth } = useContext(AuthContext)
    useDebugValue(auth, auth => auth?.player ? "logged in" : "logged out")
    return useContext(AuthContext)

}

export default useAuth