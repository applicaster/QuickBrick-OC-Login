import * as React from "react";
import { View, Text, Dimensions } from "react-native";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import IconWithTitle from '../components/IconWithTitle'
import Button from "../components/Button";

const { width, height } = Dimensions.get('window');

class IntroScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Create an account to personalize your Olympic Channel experience</Text>
          <View style={styles.iconsContainer}>
            <IconWithTitle title="Newsletter" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/newsletter.png" />
            <IconWithTitle title="Favorites" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/favorites.png" />
            <IconWithTitle title="Continue Watching" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/play.png" />
            <IconWithTitle title="Sync-Accross Devices" imgUrl="https://assets-production.applicaster.com/static/olympic-channel/images/devices.png" />
          </View>
          <View style={styles.buttonContainer}>
            <FocusableGroup id={'sign-in-button'}>
              <Button label="Sign In / Register" groupId={'sign-in-button'} onPress={() => this.props.goToScreen("SIGNIN")} />
            </FocusableGroup>
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
  iconsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  title: {
    color: "#525A5C",
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 110
  },
  buttonContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
};

IntroScreen.displayName = 'IntroScreen';
export default IntroScreen;