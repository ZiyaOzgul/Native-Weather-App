import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
const { width, height } = Dimensions.get("screen");
import * as icon from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCity,
  getWeatherData,
} from "../redux/forecastSlice/forecastSlice";
const InputComp = () => {
  const [cityInput, setCityInput] = useState("");
  const dispatch = useDispatch();

  const currentCity = useSelector((state) => state.forecast.city);
  const currentType = useSelector((state) => state.forecast.type);

  return (
    <View
      className={`w-full  h-12  mt-4  flex-row items-center justify-start `}
    >
      <TextInput
        placeholder="Enter City..."
        value={cityInput}
        onChangeText={setCityInput}
        className={`text-center ml-2 h-9 w-80 bg-white rounded-lg text-black`}
      />
      <TouchableOpacity
        onPress={() => {
          dispatch(changeCity(cityInput));
          dispatch(
            getWeatherData({
              cityName: cityInput,
              metric: currentType,
            })
          );
          setCityInput("");
          Keyboard.dismiss();
        }}
      >
        <icon.MagnifyingGlassIcon size={38} fill={"white"} className={`ml-2`} />
      </TouchableOpacity>
    </View>
  );
};

export default InputComp;
