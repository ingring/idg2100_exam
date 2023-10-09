// inspired by this video by dave grey https://www.youtube.com/watch?v=nI8PYZNFtac&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=4
import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshtoken";
import useAuth from "./useAuth";

//this makes a new axios instance that uses auth to send authorization with every request/response in the headers, so we can use restricted routes
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    //assigns interceptor for requests
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accesstoken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    //assigns response interceptor. With this, when a response comes back as forbidden it tries once to refresh the token, so that when the accestoken runs out it automatically gets refreshed when we navigate the site

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccesstoken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccesstoken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    //axiosPrivate use these interceptors
    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
