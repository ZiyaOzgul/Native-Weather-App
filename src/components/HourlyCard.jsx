import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const HourlyCard = ({ hourly }) => {
  const dateFunc = (dateTime) => {
    let a = new Date(dateTime);
    // return days[a.getDay()];
    return a.getHours() === 0 ? a.getHours() + "0:00" : a.getHours() + ":00";
  };
  const currentType = useSelector((state) => state.forecast.type);

  return (
    <View className={`w-32  ml-1 bg-slate-800/75 items-center rounded-xl`}>
      <Text
        className={`text-lg font-medium text-white text-center mt-1`}
      >{`${dateFunc(hourly.dt_txt)}`}</Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`,
        }}
        className={`w-32 h-32 -mt-1 `}
      />
      <Text className={`font-medium text-lg text-white -mt-2 mb-1`}>
        {hourly.main.temp.toFixed()}
        {currentType === "metric" ? "°C" : "°F"}
      </Text>
    </View>
  );
};

export default HourlyCard;
