import { StyleSheet } from "react-native";


export const HomePageStyle = StyleSheet.create({
  gradientContainer: {
    backgroundColor: "seagreen",
    display: "flex",
    flex: 1,
    height : "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: 60,
  },
  mainContainer: {
    backgroundColor : "seagreen",
    display: "flex",
    flex: 1,
    height : "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: 60,
  },
  container: {
    display: "flex",
    width: "90%",
    height : "100%",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  inputContainer: {
    marginTop: 20,
    width: "90%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: 150,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  webViewContainer: {
    position: "absolute",
    width: 0,
    height: 0,
    top: -9999,
    left: -9999,
  },
  listItem: {
    width: "100%",
  },
  favorites: {
    display: "flex",
    alignItems: "center",
    width: "90%",
  },
  webView: {
    flex: 1,
  },
  button: {
    color: "white",
    height: 20,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: 200,
    height: 40,
    color: "white",
    padding: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    paddingTop: 10,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
  },
});
