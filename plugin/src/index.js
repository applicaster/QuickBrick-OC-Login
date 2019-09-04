// @flow
import * as React from "react";
import { View, Text, ActivityIndicator, TextInput } from "react-native";

export class OCLoginPluginComponent extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: "red"}}>PLUGIN TEST</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkgray"
  },
  loginFrame: {
    width: 450,
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    padding: 24,
    fontSize: 18
  },
  textInput: {
    height: 60,
    width: 200,
    margin: 24,
    borderColor: "gray",
    borderWidth: 1
  },
  statusMessage: {
    color: "red",
    fontWeight: "bold",
    padding: 24,
    fontSize: 18
  }
};