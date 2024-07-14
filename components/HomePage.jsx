import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  HomePageStyleheet,
  SafeAreaView,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { HomePageStyle } from "../styles/HomePageStyle";
import DataContainer from "@/components/DataContainer";
import { WebView } from "react-native-webview";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const cheerio = require("cheerio");

const HomePage = () => {
  const webViewRef = useRef(null);
  const [dolarTl, setDolarTl] = useState("");
  const [eurTl, setEurTl] = useState("");
  const [gold, setGold] = useState("");
  const [onsGold, setOnsGold] = useState("");
  const [btc, setBtc] = useState("");
  const [fetching, setFetching] = useState(false);
  const [price, setPrice] = useState("");
  const [text, setText] = useState("");
  const [priceName, setPriceName] = useState("");
  const [visible, setVisible] = useState(false);
  const [storageData, setStorageData] = useState("");

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const runJavaScript = `
    (function() {
      var dolarTl = document.querySelector("#USDTRY").innerText;
      var dolarPercent = document.querySelector("#USDTRY_PERCENT").innerText;
      var eurTl = document.querySelector("#EURTRY").innerText;
      var eurPercent = document.querySelector("#EURTRY_PERCENT").innerText;
      var gold = document.querySelector("#GRAM_XAUTL").innerText;
      var goldPercent = document.querySelector("#GRAM_XAUTL_PERCENT").innerText;
      var onsGold = document.querySelector("#XAUUSD").innerText;
      var onsGoldPercent = document.querySelector("#XAUUSD_PERCENT").innerText;
      var btc = document.querySelector("#BTCUSD").innerText;
      var btcPercent = document.querySelector("#BTCUSD_PERCENT").innerText;
      window.ReactNativeWebView.postMessage(JSON.stringify({
        dolarTl: dolarTl,
        dolarPercent: dolarPercent,
        eurTl: eurTl,
        eurPercent: eurPercent,
        gold: gold,
        goldPercent: goldPercent,
        onsGold: onsGold,
        onsGoldPercent: onsGoldPercent,
        btc: btc,
        btcPercent: btcPercent
      }));
    })();
  `;

  const getData = async () => {
    setDataLoading(true);
    try {
      if (text !== "") {
        const lastData = await axios(
          `https://www.tefas.gov.tr/FonAnaliz.aspx?FonKod=${text}`
        );
        const $ = cheerio.load(lastData.data);
        const lastPrice = $(".top-list li").first().find("span").text();
        const name = $("#MainContent_FormViewMainIndicators_LabelFund").text();
        setPrice(lastPrice);
        setPriceName(name);
        if (lastPrice === "0") {
          Alert.alert("Fon Bulunamadı");
          setDataLoading(false);
        } else {
          setVisible(true);
          setDataLoading(false);
        }
      }
    } catch (error) {
      console.log(error.message);
      setDataLoading(false);
    }
  };

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    setDolarTl({ price: data.dolarTl, percent: data.dolarPercent });
    setEurTl({ price: data.eurTl, percent: data.eurPercent });
    setGold({ price: data.gold, percent: data.goldPercent });
    setOnsGold({
      price: data.onsGold,
      percent: data.onsGoldPercent,
    });
    setBtc({ price: data.btc, percent: data.btcPercent });
    setFetching(false);
  };

  const fetchData = () => {
    setFetching(true);
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(runJavaScript);

    }
  };
  const getStorageData = async () => {
    const data = await AsyncStorage.getItem("data");
    const lastData = JSON.parse(data);
    setStorageData(lastData);
  };

  useEffect(() => {
    getStorageData();
  }, [storageData]);

  useEffect(() => {
    fetchData();
    
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);


  

  const removeDataFromStorage = async (key) => {
    const tempData = storageData;
    delete tempData[key];
    await AsyncStorage.setItem("data", JSON.stringify(tempData));
    setStorageData(tempData);
  };

  return (
    
      <View style={HomePageStyle.mainContainer}>
      
      <View style={HomePageStyle.container}>
        <DataContainer
          dataName={"DOLAR/TL"}
          data={dolarTl.price || "Veri yok"}
          percent = {dolarTl.percent}
        />
        <DataContainer dataName={"EURO/TL"} data={eurTl.price || "Veri yok"}percent = {eurTl.percent} />
        <DataContainer
          dataName={"GRAM ALTIN"}
          data={gold.price || "Veri yok"}
          percent = {gold.percent}
        />
        <DataContainer
          dataName={"ALTIN ONS"}
          data={onsGold.price || "Veri yok"}
          percent = {onsGold.percent}
        />
        <DataContainer dataName={"BITCOIN"} data={btc.price || "Veri yok"} percent = {btc.percent}/>
        <View style={HomePageStyle.webViewContainer}>
          {fetching && (
            <WebView
              ref={webViewRef}
              source={{ uri: "https://dolar.tlkur.com/" }}
              onMessage={handleMessage}
              javaScriptEnabled={true}
              style={HomePageStyle.webView}
            />
          )}
        </View>
      </View>
      {/* <View style={HomePageStyle.inputContainer}>
        <TextInput
          placeholderTextColor={"white"}
          placeholder="Fon Kodunu Giriniz.."
          onChangeText={(text) => setText(text.toUpperCase())}
          value={text}
          style={HomePageStyle.input}
          keyboardType="default"
        ></TextInput>

        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          <View style={HomePageStyle.centeredView}>
            <View style={HomePageStyle.modalView}>
              <Pressable
                onPress={() => setVisible(false)}
                style={{ position: "absolute", right: 7, top: 3 }}
              >
                <Icon name="close"></Icon>
              </Pressable>
              <Text style={HomePageStyle.modalText}>{priceName}</Text>
              <Text style={HomePageStyle.modalText}>Son Fiyat : {price}</Text>
              <Button onPress={saveData} loading={favoriteLoading}>
                <Text style={HomePageStyle.textStyle}>Favorilere Ekle</Text>
                <Icon name="star" color="white" />
              </Button>
            </View>
          </View>
        </Modal>

        <Button
          onPress={getData}
          color={"primary"}
          radius={"lg"}
          type="solid"
          loading={dataLoading}
        >
          Ara
        </Button>
      </View>
      <View style={HomePageStyle.favorites}>
        <Text style={{ fontSize: 20, marginVertical: 20, color: "white" }}>
          Favorilerim
        </Text>
        <View style={{ width: "100%", borderRadius: 20 }}>
          {storageData !== undefined &&
            Object.entries(storageData).map(([key, value], index) => (
              <View style={HomePageStyle.listItem} key={key}>
                <ListItem
                  key={key}
                  bottomDivider
                  containerStyle={{ backgroundColor: "#FFF5EE" }}
                >
                  <ListItem.Content
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Pressable
                      onPress={() => removeDataFromStorage(key)}
                      style={{ position: "absolute", right: -10, top: -10 }}
                    >
                      <Icon name="close"></Icon>
                    </Pressable>
                    <View style={{ width: "95%" }}>
                      <ListItem.Title>{key}</ListItem.Title>
                      <ListItem.Subtitle>Son Fiyat : {value}</ListItem.Subtitle>
                    </View>
                  </ListItem.Content>
                </ListItem>
              </View>
            ))}
        </View>
      </View> */}
    </View>
     
   
  );
};

export default HomePage;

