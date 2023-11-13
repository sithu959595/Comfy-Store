import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const themes = {
  winter: "winter",
  dracula: "dracula",
};
const getSavedUser = () => {
  const savedUser = JSON.parse(localStorage.getItem("user")) || null;
  return savedUser;
};
const getSavedTheme = () => {
  const savedTheme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", savedTheme);
  return savedTheme;
};
const initialState = {
  user: getSavedUser(),
  theme: getSavedTheme(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logout successfully");
    },
    toggleTheme: (state) => {
      const { winter, dracula } = themes;
      state.theme = state.theme === winter ? dracula : winter;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});
export const userSliceReducer = userSlice.reducer;
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
