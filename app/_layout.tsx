import HomePage from "@/components/HomePage";
import { HomePageStyle } from "@/styles/HomePageStyle";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <View style = {{flex : 1}}>
       <HomePage/>
    </View>
   
  );
}

