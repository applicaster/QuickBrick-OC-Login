// @flow
import * as React from "react";
import { View, Text } from "react-native";

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green"
  }
};

export class OCLoginPluginComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: "red"}}>PLUGIN</Text>
      </View>
    );
  }
}
