// @flow
import * as React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import IconWithTitle from './components/IconWithTitle'
const { width, height } = Dimensions.get('window');

export class OCLoginPluginComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Create an account to personalize your Olympic Channel experience</Text>
          <View style={styles.imagesContainer}>
            <IconWithTitle title="Newsletter" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/newsletter.png" />
            <IconWithTitle title="Favorites" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/favorites.png" />
            <IconWithTitle title="Continue Watching" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/play.png" />
            <IconWithTitle title="Sync-Accross Devices" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/devices.png" />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Sign In / Register</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    width,
    height,
    backgroundColor: "#E2E2E2",
    alignItems: 'center',
    justifyContent: 'center'
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100
  },
  imagesContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  imgInfo: {
    justifyContent: 'center',
  },
  imgTitle: {
    fontFamily: "sans-serif",
    fontSize: '24px',
    fontWeight: 'bold',
    color: "#525A5C",
    marginTop: 50,
  },
  title: {
    color: "#525A5C",
    fontFamily: "sans-serif",
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: 110
  },
  buttonContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 500,
    height: 80,
    backgroundColor: "#D8D8D8",
    borderWidth: 1,
    borderColor: '#979797',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  buttonTitle: {
    color: "#525A5C",
    fontFamily: "sans-serif",
    fontSize: '24px',
    fontWeight: 'bold'
  }
};