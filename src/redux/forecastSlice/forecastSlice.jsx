import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getWeatherData = createAsyncThunk(
  "/forecast/getWeatherData",
  async ({ cityName, metric }) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=32f408218d01bffee2d4c418e9cb9034&units=${metric}`
    );
    console.log(res.data);
    return res.data;
  }
);

export const getDailyData = createAsyncThunk(
  "/forecast/getDailyData",
  async ({ cityName, metric }) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=32f408218d01bffee2d4c418e9cb9034&units=${metric}&cnt=5`
    );
    console.log(res.data);
    return res.data;
  }
);

export const foreacstSlice = createSlice({
  name: "forecast",
  initialState: {
    daily: [],
    weekly: [],
    hourly: [],
    type: "metric",
    city: "sivas",
    days: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
    isLoading: false,
  },
  extraReducers: {
    [getWeatherData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getWeatherData.fulfilled]: (state, action) => {
      state.daily = action.payload;
      state.isLoading = false;
    },
    //daily
    [getDailyData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getDailyData.fulfilled]: (state, action) => {
      state.hourly = action.payload;
      state.isLoading = false;
    },
  },
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { changeCity } = foreacstSlice.actions;
export default foreacstSlice.reducer;
