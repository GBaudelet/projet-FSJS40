import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.username = action.payload.username;
      state.password = "";
    },
    logout(state) {
      state.username = "";
    },
    setMsg(state, action) {
      console.log(action.payload);
      state.msg = action.payload;
    },
    updateField(state, action) {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

export const { login, logout, updateField, setMsg } = userSlice.actions;
export default userSlice.reducer;
