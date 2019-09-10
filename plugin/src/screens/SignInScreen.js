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
          <Text style={styles.title}>Two ways to Register/Sign in into your Olympic Channel Account</Text>
          <View style={styles.columnsContainer}>
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
  title: {
    color: "#525A5C",
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 110
  },
  columnsContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
};

IntroScreen.displayName = 'IntroScreen';
export default IntroScreen;