// All Import File  Code Is Here......................................................................................................
import axios from "axios";
import { useAuth } from "@/stores";


// All Variable  Code Is Here.....................................................................................................


// API Calling Code Is Here.....................................................................................................

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});
// All Function  Code Is Here.....................................................................................................

axiosInstance.interceptors.request.use(
  function (config) {
    const authInfo = useAuth();
    const auth = authInfo.user ? `Bearer ${authInfo.user.token}` : "";
    config.headers["Authorization"] = auth;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error);
      const authInfo = useAuth();
      authInfo.user = {};
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;