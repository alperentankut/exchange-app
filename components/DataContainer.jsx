import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { DataContainerStyle } from "../styles/DataContainer";
import { Card, Button, Icon } from "@rneui/themed";

const DataContainer = ({ dataName, data }) => {
  return (
    <View style={cardStyle.card}>
      
      <Card containerStyle = {{ borderColor : "darkgreen" , borderRadius : 10 , borderWidth : 2 , backgroundColor : "seagreen" }}>
        <Card.Title style ={{color : "white"}}>{dataName}</Card.Title>
        <Card.Divider />
        <View>
          <Text style = {{color : "white"}}>{data}</Text>
        </View>
      </Card>
    </View>
  );
};

export const cardStyle = StyleSheet.create({
  card: {
    width : "50%",
  }
});

export default DataContainer;
