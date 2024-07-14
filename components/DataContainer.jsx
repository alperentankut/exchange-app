import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { DataContainerStyle } from "../styles/DataContainer";
import { Card, Button, Icon, ListItem } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DataContainer = ({ dataName, data, percent }) => {
  const [storageData, setStorageData] = useState("");

  const getStorageData = async () => {
    const data = await AsyncStorage.getItem("data");
    const lastData = JSON.parse(data);
    setStorageData(lastData)
  };

  useEffect(() => {
    getStorageData();
  }, [storageData]);

  const saveData = async (dataName, price) => {
    try {
      const dataJson = await AsyncStorage.getItem("data");
      let storedData = {};

      if (dataJson !== null) {
        storedData = JSON.parse(dataJson);
      }

      // Eğer dataName daha önce kaydedilmişse favorilerden çıkar
      if (storedData[dataName]) {
        delete storedData[dataName];
        await AsyncStorage.setItem("data", JSON.stringify(storedData));
        Alert.alert("Favorilerden Çıkarıldı");
        return;
      }

      // Yeni veriyi kaydetme
      storedData[dataName] = price;
      await AsyncStorage.setItem("data", JSON.stringify(storedData));

      Alert.alert(
        "Favorilere Eklendi",
        null,
        [
          {
            text: "Tamam",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert("Veri kaydedilirken hata oluştu:", error.message);
    }
  };
  const percentFunc = () => {
    if (percent?.indexOf("+") !== -1) {
      return "positive";
    }
    if (percent?.indexOf("-") !== -1) {
      return "negative";
    }
  };
  return (
    <View style={cardStyle.card}>
      <ListItem
        bottomDivider
        containerStyle={{ backgroundColor: "seagreen", padding: 6 }}
      >
        <ListItem.Content
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ListItem.Title style={{ color: "white" }}>{dataName}</ListItem.Title>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ alignItems: "flex-end" }}>
              <ListItem.Subtitle style={{ color: "white" }}>
                {data}
              </ListItem.Subtitle>
              <ListItem.Subtitle
                style={{
                  color: percentFunc() === "positive" ? "lightgreen" : "red",
                  fontSize: "10",
                  fontSize: "10",
                }}
              >{`${percent}%`}</ListItem.Subtitle>
            </View>
            <Pressable onPress={() => saveData(dataName, data)}>
              <Icon name={Object.keys(storageData).includes(dataName) ? "star" : "staro"} type="antdesign" color={"white"} />
            </Pressable>
          </View>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export const cardStyle = StyleSheet.create({
  card: {
    width: "100%",
    // height: "20%",
  },
});

export default DataContainer;
