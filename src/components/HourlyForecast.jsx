import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyData } from "../redux/forecastSlice/forecastSlice";
import HourlyCard from "./HourlyCard";

const HourlyForecast = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector((state) => state.forecast.city);
  const currentType = useSelector((state) => state.forecast.type);
  const HourlyForecast = useSelector((state) => state.forecast.hourly);

  useState(() => {
    dispatch(
      getDailyData({
        cityName: currentCity,
        metric: currentType,
      })
    );
  }, []);
  if (HourlyForecast == "") {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  } else {
    return (
      <View className={`w-full my-2`}>
        <Text className={`text-lg font-medium text-white ml-4 mt-6 mb-2`}>
          Sattlik Hava Durumu:
        </Text>
        <FlatList
          horizontal={true}
          data={HourlyForecast.list}
          renderItem={(hourly) => <HourlyCard hourly={hourly.item} />}
          keyExtractor={(hourly) => hourly.dt}
        />
      </View>
    );
  }
};

export default HourlyForecast;
