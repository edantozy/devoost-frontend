import { removeToken, setToken } from "@redux/slices/authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { token: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setToken(credentials.token));
      localStorage.setItem("token", credentials.token);
    } catch (error) {
      console.error("Error logging in", error);
      return thunkAPI.rejectWithValue(error);
    }
    return credentials.token;
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(removeToken());
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error logging out", error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const loadToken = createAsyncThunk(
  "auth/loadToken",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }

      thunkAPI.dispatch(setToken(token));

      return token;
    } catch (error) {
      console.error("Error loading token", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
