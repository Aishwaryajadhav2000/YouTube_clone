import { useDispatch } from "react-redux";
import API_BASE_URL from "./Apicall";
import axios from "axios";
import {loginSuccess} from "../redux/authSlice"

// API to fetch current user data
const useFetchCurrentUser = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axios.get(`${API_BASE_URL}/getuser`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      const freshUser = response.data;
      console.log("freshuser" , freshUser)
      dispatch(loginSuccess({ user: freshUser, token }));
      return freshUser;
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    }
  };

  return fetchUser;
};

export default useFetchCurrentUser;
