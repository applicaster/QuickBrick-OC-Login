import * as React from "react";
import { View, Text } from "react-native";
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";

export default function Button({ label, groupId, onPress }) {
  return (
    <Focusable id={`oc-login-${label}`} groupId={groupId} onPress={onPress}>
      {focused => {
        const buttonStyles = styles[focused ? "focused" : "default"];
        return (
          <View style={buttonStyles.button}>
            <Text style={buttonStyles.buttonText}>{label}</Text>
          </View>
        );
      }}
    </Focusable>
  );
}

const button = {
  width: 1000,
  height: 80,
  backgroundColor: "#0081C8",
  borderWidth: 1,
  borderColor: '#0081C8',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingLeft: 50,
  marginTop: 100
};

const buttonText = {
  color: "#525A5C",
  fontSize: 24,
  fontWeight: 'bold'
};

const styles = {
  focused: {
    button: {
      ...button,
      backgroundColor: "#0081C8"
    },
    buttonText: {
      ...buttonText,
      color: "#ffffff"
    }
  },
  default: {
    button,
    buttonText
  }
};