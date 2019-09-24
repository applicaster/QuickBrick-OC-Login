import React, { Component } from 'react';
import { Dimensions, View, ImageBackground, Image } from "react-native";
import BGImage from "../../static/oc-bg.png"
import OCLogo from "../../static/oc-logo.png"

const { width, height } = Dimensions.get('window');

class Layout extends Component {
  render() {
    return (
      <ImageBackground source={{ uri: "https://assets-production.applicaster.com/static/olympic-channel/images/oc-bg.png"}} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={{ uri: "https://assets-production.applicaster.com/static/olympic-channel/images/oc-logo.png" }}
          />
        </View>
        <View style={styles.subContainer}>
          {this.props.children}
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    width,
    height,
    backgroundColor: "#E2E2E2",
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 240
  },
  subContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logoContainer: {
    paddingLeft: 120,
    paddingTop: 80,
    paddingRight: 120
  },
  logo: {
    width: 353,
    height: 353,
  }
};

Layout.displayName = 'Layout';
export default Layout;