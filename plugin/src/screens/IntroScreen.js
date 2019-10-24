import * as React from "react";
import { View, Text } from "react-native";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import { trackEvent } from "../analytics/segment/index";
import Button from "../components/Button";
import Layout from "../components/Layout";

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.skipPrehook = this.skipPrehook.bind(this);
  }

  componentDidMount() {
    trackEvent("Entry");
  }

  async skipPrehook() {
    await localStorage.setItem(
      this.props.skip,
      true,
      this.props.namespace
    )
      .then(() => {
        trackEvent("Entry", {buttonPressed: "Maybe Later"})
        this.props.closeHook({ success: true })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Layout isPrehook={this.props.isPrehook}>
        <View style={styles.container}>
          <Text style={this.props.isPrehook ? styles.title : styles.subTitle}>
            {this.props.isPrehook ? 'WELCOME TO THE OLYMPIC CHANNEL' : 'Create an account to personalize your Olympic Channel experience'}
          </Text>
          <View style={styles.buttonContainer}>
            <FocusableGroup id={'sign-in-button'} style={styles.focusContainer}>
              <Button 
                label="Sign In / Register" 
                groupId={'sign-in-button'} 
                onPress={() => this.props.goToScreen("SIGNIN")} 
                preferredFocus={true}
              />
              {
                this.props.isPrehook &&
                <Button label="Maybe Later" groupId={'sign-in-button'} onPress={() => this.skipPrehook()} />
              }
            </FocusableGroup>
          </View>
        </View>
      </Layout>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100
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
    marginBottom: 300
  },
  subTitle: {
    color: "#525A5C",
    fontSize: 32,
  },
  altSubTitle: {
    color: "#525A5C",
    fontSize: 32,
    marginBottom: 300
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  focusContainer: {
    justifyContent: 'center', 
    alignItems: 'center'
  }
};

IntroScreen.displayName = 'IntroScreen';
export default IntroScreen;