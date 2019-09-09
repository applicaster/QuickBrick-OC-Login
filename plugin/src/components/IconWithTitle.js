import * as React from "react";
import { View, Text, Dimensions, Image } from "react-native";

class IconWithTitle extends React.Component {
  render() {
    const {
      imgUrl,
      size = 120,
      title
    } = this.props
    return (
      <View style={styles.imgInfo}>
        <Image
          style={{ width: size, height: size }}
          resizeMode="contain"
          source={{ uri: imgUrl }}
        />
        <Text style={styles.imgTitle}>{title}</Text>
      </View>
    );
  }
}

const styles = {
  imgInfo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgTitle: {
    fontFamily: "sans-serif",
    fontSize: '24px',
    fontWeight: 'bold',
    color: "#525A5C",
    marginTop: 50,
  }
};

IconWithTitle.displayName = 'IconWithTitle';
export default IconWithTitle;