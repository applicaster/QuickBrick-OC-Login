import * as React from "react";
import { View, Text, Dimensions, Image } from "react-native";

class IconWithTitle extends React.Component {
  render() {
    const {
      imgUrl,
      size = 140,
      title
    } = this.props
    return (
      <View style={styles.container}>
        <Image
          style={{ width: size, height: size }}
          resizeMode="contain"
          source={{ uri: imgUrl }}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#525A5C",
    marginTop: 50,
  }
};

IconWithTitle.displayName = 'IconWithTitle';
export default IconWithTitle;