import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MapPinIcon } from "react-native-heroicons/solid";

const DayClock = () => {
  const Days = useSelector((state) => state.forecast.days);
  const [clock, setClock] = useState("");
  const [DayName, setDayName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const DailyForecast = useSelector((state) => state.forecast.daily);

  useEffect(() => {
    setInterval(() => {
      const dateobj = new Date();
      setClock(dateobj.toLocaleTimeString());
    }, 1000);
    const date = new Date();
    let currentDate = `${
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    }:${
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
    }:${date.getFullYear()}`;
    setDayName(Days[date.getDay()]);
    setDateTime(currentDate);
  }, []);

  if (DailyForecast == "") {
    return (
      <View>
        <Text>...</Text>
      </View>
    );
  } else {
    return (
      <View className={`w-full mt-4`}>
        <View
          className={`w-full flex-row items-center space-x-2 justify-center`}
        >
          <Text className={`text-xl font-medium text-white`}>{dateTime} </Text>
          <Text className={`font-semibold text-2xl text-white text-center `}>
            {clock}
          </Text>
        </View>
        <Text className={`text-sm text-center font-medium text-white`}>
          {DayName}{" "}
        </Text>
        <View className={`flex-row space-x-1 items-end  justify-center mt-4`}>
          <MapPinIcon size={32} fill={"white"} className={``} />
          <Text className={`text-lg font-medium text-white`}>
            {DailyForecast.name}
          </Text>
        </View>
      </View>
    );
  }
};

export default DayClock;
