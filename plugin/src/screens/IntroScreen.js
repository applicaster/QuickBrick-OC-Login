import * as React from "react";
import { View, Text } from "react-native";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import IconWithTitle from '../components/IconWithTitle'
import Button from "../components/Button";
import Layout from "../components/Layout";

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.skipPrehook = this.skipPrehook.bind(this);
  }

  async skipPrehook() {
    await localStorage.setItem(
      this.props.skip,
      true,
      this.props.namespace
    )
      .then(() => {
        this.props.closeHook({ success: true })
      })
      .catch(err => console.log(err))
  }
 
  render() {
    return (
      <Layout>
        <View style={styles.container}>
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
              <Button label="Maybe Later" groupId={'sign-in-button'} onPress={() => this.skipPrehook()} />
            </FocusableGroup>
          </View>
        </View>
      </Layout>
    );
  }
}

const styles = {
  container: {
    width: 1100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconsContainer: {
    width: 1100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 90,
  },
  title: {
    color: "#525A5C",
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 30
  },
  subTitle: {
    color: "#525A5C",
    fontSize: 32,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
};

IntroScreen.displayName = 'IntroScreen';
export default IntroScreen;