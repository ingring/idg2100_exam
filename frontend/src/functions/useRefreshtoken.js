// inspired by dave grey in this video https://www.youtube.com/watch?v=27KeYk-5vJw
import axios from "./axios";
import useAuth from "./useAuth";
const refreshURL = "/refresh";

//this function makes a new accestoken from the refreshtoken
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(refreshURL, {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        accesstoken: response.data.accesstoken,
        username: response.data.username,
        role: response.data.role,
      };
    });

    return response.data.accesstoken;
  };

  return refresh;
};

export default useRefreshToken;
