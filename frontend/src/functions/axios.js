// inspiredby dave grey's video https://www.youtube.com/watch?v=nI8PYZNFtac&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=4
import axios from 'axios'

//defines what url to use for all axios
const BASE_URL = "http://localhost:5000/"

//makes the normal axios use base url for everything
export default axios.create({
    baseURL: BASE_URL
})

//defines an axiosPrivate instance to use in useAxiosPrivate, with credentials to use in authorization
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "content-type" : "application/json"
    },
    withCredentials: true
})