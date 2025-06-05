import { createSlice } from "@reduxjs/toolkit";


const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
    user : user ? JSON.parse(user) : null,
    token : token || null
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        logout : () =>{
            localStorage.removeItem("user");
            localStorage.removeItem("token")
        }
    }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;


