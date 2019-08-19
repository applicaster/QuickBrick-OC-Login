// @flow
import * as React from "react";
import { View, Text } from "react-native";

import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";

type Props = {
  onPress: any => void,
  label: string,
  groupId: string
};

export function Button({ onPress, label, groupId }: Props) {
  return (
    <Focusable id={`form-button-${label}`} groupId={groupId} onPress={onPress}>
      {focused => {
        const buttonStyles = styles[focused ? "focused" : "default"];

        return (
          <View style={buttonStyles.button}>
            <Text style={buttonStyles.text}>{label}</Text>
          </View>
        );
      }}
    </Focusable>
  );
}

const button = {
  margin: 24,
  width: 200,
  height: 60,
  backgroundColor: "rgba(80,80,80, 0.7)",
  borderRadius: 4,
  alignItems: "center",
  justifyContent: "center"
};

const buttonText = {
  color: "#FFF",
  fontSize: 24,
  fontWeight: "bold"
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