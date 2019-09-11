import * as React from "react";
import { View, Text, Dimensions, ImageBackground, Image } from "react-native";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import IconWithTitle from '../components/IconWithTitle'
import Button from "../components/Button";
import BGImage from "../../static/bg.png"
import OCLogo from "../../static/oc-logo.png"

const { width, height } = Dimensions.get('window');

class IntroScreen extends React.Component {
  render() {
    return (
      <ImageBackground source={BGImage} style={styles.container}>
        <View style={{paddingLeft: '5%'}}>
          <Image
            style={{ width: 325, height: 325, marginTop: -100, paddingLeft: '16%' }}
            resizeMode="contain"
            source={OCLogo}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.title}>WELCOME TO THE OLYMPIC CHANNEL</Text>
          <Text style={styles.subTitle}>Create an account to personalize your Olympic Channel experience</Text>
          <View style={styles.iconsContainer}>
            <IconWithTitle title="Newsletter" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/newsletter.png" />
            <IconWithTitle title="Favorites" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/favorites.png" />
            <IconWithTitle title="Continue Watching" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/continue-watching.png" />
            <IconWithTitle title="Sync-Accross Devices" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/sync-devices.png" />
          </View>
          <View style={styles.buttonContainer}>
            <FocusableGroup id={'sign-in-button'}>
              <Button label="Sign In / Register" groupId={'sign-in-button'} onPress={() => this.props.goToScreen("SIGNIN")} />
              <Button label="Maybe Later" groupId={'sign-in-button'} onPress={() => this.props.goToScreen("SIGNIN")} />
            </FocusableGroup>
          </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 110,
    marginBottom: 110,
  },
  title: {
    color: "#525A5C",
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30
  },
  subTitle: {
    color: "#525A5C",
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 80,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
};

IntroScreen.displayName = 'IntroScreen';
export default IntroScreen;