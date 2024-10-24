import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  password: "",
  email: "",
  confirmEmail: "",
  isLogged: false,
  msg: "",
  role_id: "",
  authError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      console.log("action.payload", action.payload);
      state.id = action.payload.user.id;
      state.username = action.payload.user.username;
      state.isLogged = action.payload.isLogged;
      state.role_id = action.payload.user.role_id || "2";
      state.authError = null;
    },
    loginFailed(state, action) {
      state.authError = action.payload.error;
    },
    logout(state) {
      state.username = "";
      state.password = "";
      state.email = "";
      state.confirmEmail = "";
      state.isLogged = false;
      state.role_id = "";
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setMsg(state, action) {
      state.msg = action.payload;
    },
    updateField(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetFields(state) {
      state.username = "";
      state.password = "";
      state.email = "";
      state.confirmEmail = "";
    },
  },
});

export const {
  login,
  loginFailed,
  logout,
  updateField,
  setMsg,
  setLoading,
  resetFields,
} = userSlice.actions;
export default userSlice.reducer;
