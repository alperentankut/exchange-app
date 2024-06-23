import HomePage from "@/components/HomePage";
import { HomePageStyle } from "@/styles/HomePageStyle";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View>
       <HomePage/>
    </View>
   
  );
}
