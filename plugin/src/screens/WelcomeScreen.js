import * as React from "react";
import { View, Text } from "react-native";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import IconWithTitle from '../components/IconWithTitle'
import Button from "../components/Button";
import Layout from "../components/Layout";

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <View style={styles.container}>
          <Text style={styles.text}>Hi <Text style={styles.userName}>{this.props.userName}!</Text></Text>
          <Text style={styles.text}>To update your account please visit <Text style={styles.url}>www.olympicchannel.com/my-profile</Text></Text>
          <View style={styles.buttonContainer}>
            <FocusableGroup id={'sign-in-button'} style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button 
                label="Sign Out" 
                groupId={'sign-out-button'} 
                onPress={() => this.props.goToScreen("INTRO")} 
                style={styles.signOutBtn}
              />
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
    alignItems: 'flex-start',
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
  text: {
    color: "#525A5C",
    fontSize: 32,
    marginBottom: 20,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 60,
    color: "#525A5C",
  },
  url: {
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 60,
    color: '#1779AE'
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
  signOutBtn: {
    alignSelf: 'center'
  }
};

WelcomeScreen.displayName = 'WelcomeScreen';
export default WelcomeScreen;