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
  width: 500,
  height: 80,
  backgroundColor: "#D8D8D8",
  borderWidth: 1,
  borderColor: '#979797',
  justifyContent: 'center',
  alignItems: 'center',
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
      backgroundColor: "rgba(255, 255, 255, 0.8)"
    },
    buttonText: {
      ...buttonText,
      color: "#5F5F5F"
    }
  },
  default: {
    button,
    buttonText
  }
};