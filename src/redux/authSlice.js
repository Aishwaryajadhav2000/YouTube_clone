import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
    user: user ? JSON.parse(user) : null,
    token: token || null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        logout: () => {
            localStorage.removeItem("user");
            localStorage.removeItem("token")
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;


