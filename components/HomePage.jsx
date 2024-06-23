import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, View } from "react-native";
import { HomePageStyle } from "../styles/HomePageStyle";
import DataContainer from "@/components/DataContainer";
import axios from "axios";
const cheerio = require("cheerio");


const HomePage = () => {
  const [dolarTl, setDolarTl] = useState("");
  const [eurTl, setEurTl] = useState("");
  const [gold, setGold] = useState("");
  const [quarterGold, setQuarterGold] = useState("");


  const getData = async () => {
    try {
      
      const { data } = await axios.get("https://dolar.tlkur.com/");
      const $ = cheerio.load(data);

      const eurTl = $("#EURTRY").text();
      const dolarTl = $("#USDTRY").text();
      const gold = $("#GRAM_XAUTL").text();
      const quarterGold = $("#XAUUSD").html();
      console.log(quarterGold);
      setDolarTl(dolarTl);
      setEurTl(eurTl);
      setGold(gold);
      setQuarterGold(quarterGold);
    } catch (error) {
      console.log(error.message);
    }
  };

    useEffect(() => {
      getData(); // Initial fetch

      const intervalId = setInterval(() => {
        getData();
      }, 10000); // 10000ms = 10 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, []);

  return (
    <View style={HomePageStyle.container}>
      {/* <Button onPress={getData} title="tıkla"></Button> */}
      <DataContainer dataName={"DOLAR/TL"} data={dolarTl} />
      <DataContainer dataName={"EURO/TL"} data={eurTl} />
      <DataContainer dataName={"GRAM ALTIN"} data={gold} />
      <DataContainer dataName={"ALTIN"} data={quarterGold} />
    </View>
  );
};

export default HomePage;
