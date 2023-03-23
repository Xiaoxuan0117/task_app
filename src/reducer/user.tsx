import { createSlice } from "@reduxjs/toolkit";
import { userState } from "../type";

const initialState: userState = {
  name: "",
  avatar: "",
  user_url: "",
  repo: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
