import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputComp from "../components/InputComp";
import { useSelector } from "react-redux";
import DailyForecast from "../components/DailyForecast";
import DayClock from "../components/DayClock";
import { LinearGradient } from "expo-linear-gradient";

const HomePage = () => {
  const city = useSelector((state) => state.forecast.city);

  return (
    <LinearGradient colors={["#b91c1c", "#c2410c"]} className={`w-full h-full`}>
      <SafeAreaView className={`w-full h-full items-center justify-start`}>
        <InputComp />
        <DayClock />
        <DailyForecast />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomePage;
