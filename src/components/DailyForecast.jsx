import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as icon from "react-native-heroicons/solid";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import {
  getDailyData,
  getWeatherData,
} from "../redux/forecastSlice/forecastSlice";
import HourlyForecast from "./HourlyForecast";

const DailyForecast = () => {
  const Loading = useSelector((state) => state.forecast.isLoading);
  const DailyForecast = useSelector((state) => state.forecast.daily);

  const currentCity = useSelector((state) => state.forecast.city);
  const currentType = useSelector((state) => state.forecast.type);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getWeatherData({
        cityName: currentCity,
        metric: currentType,
      })
    );
  }, []);

  if (DailyForecast == "") {
    return (
      <View className={`w-full items-center justify-center mt-10 flex-row`}>
        <Text className="font-bold text-2xl text-white mr-1">Loading ... </Text>
        {/* <icon.ArrowPathIcon size={50} fill={"white"} className="animate-spin" /> */}
      </View>
    );
  } else {
    return (
      <View className={`w-full items-center justify-center mt-10`}>
        <View
          className={`space-x-4  w-full flex-row mt-2 items-center justify-center`}
        >
          <Text className={`text-6xl font-medium text-white `}>
            {DailyForecast.main.temp.toFixed()}
            {currentType !== "metric" ? "°F" : "°C"}
          </Text>
          <Text
            className={`text-xl font-medium   ${
              DailyForecast.main.temp.toFixed() < 11
                ? "text-sky-400"
                : "text-orange-300"
            }`}
          >
            {DailyForecast.weather[0].main}
          </Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${DailyForecast.weather[0].icon}@2x.png`,
            }}
            className={`w-32 h-32 `}
          />
        </View>
        <View className={`w-full flex-row items-center justify-between mt-6`}>
          <View className={`flex-1 space-y-4 ml-2 justify-between `}>
            <View className="flex-row items-center justify-start">
              <icon.ArrowUpIcon size={26} fill={"white"} />
              <Text className={`text-sm font-light text-white ml-1`}>
                En Yüksek : {DailyForecast.main.temp_max.toFixed()}
              </Text>
            </View>
            <View className="flex-row items-center justify-start ">
              <icon.ArrowDownIcon size={26} fill={"white"} />
              <Text className={`text-sm font-light text-white ml-1`}>
                En Düşük : {DailyForecast.main.temp_min.toFixed()}
              </Text>
            </View>
          </View>
          <View className={`flex-1 space-y-2 items-start ml-6`}>
            <View className="flex-row items-center justify-start space-x-1">
              <FontAwesome5 name="temperature-low" size={20} color="white" />
              <Text className="text-sm font-light text-white">
                Hissedilen : {DailyForecast.main.feels_like.toFixed()}
                {currentType !== "metric" ? "°F" : "°C"}
              </Text>
            </View>
            <View className="flex-row items-center justify-start space-x-1">
              <Ionicons name="water" size={20} color={"white"} />
              <Text className="text-sm font-light text-white">
                Nem : {DailyForecast.main.humidity}%
              </Text>
            </View>
            <View className="flex-row items-center justify-start space-x-1">
              <Feather name="wind" size={20} color="white" />
              <Text className="text-sm font-light text-white">
                Rüzgar : {DailyForecast.wind.speed} km/h
              </Text>
            </View>
          </View>
        </View>
        <View
          className={`w-full mt-6 rounded-xl mx-1 items-center justify-center overflow-hidden  bg-slate-700/70  `}
        >
          <View
            className={`w-full flex-row items-center space-x-1 justify-start mt-4`}
          >
            <Text className={`text-xl font-medium text-white ml-4`}>
              Bugün Genel olarak
            </Text>
            <Text
              className={`text-xl  font-medium   ${
                DailyForecast.main.temp.toFixed() < 11
                  ? "text-sky-400"
                  : "text-orange-300"
              }`}
            >
              {DailyForecast.weather[0].description}
            </Text>
          </View>
          <HourlyForecast />
        </View>
      </View>
    );
  }
};

export default DailyForecast;
