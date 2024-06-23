import React from "react";
import { Text, View } from "react-native";
import { DataContainerStyle } from "../styles/DataContainer";

const DataContainer = ({ dataName , data }) => {
  return (
    <View style={DataContainerStyle.container}>
      <Text>{dataName}</Text>
      <Text>{data}</Text>

    </View>
  );
};

export default DataContainer;
