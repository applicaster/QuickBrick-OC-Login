import * as React from "react";
import axios from "axios";
import { View, Text } from "react-native";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import Button from "../components/Button";
import Layout from "../components/Layout";

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  async componentDidMount() {
    const {
      name,
      namespace
    } = this.props;

    const userName = await localStorage.getItem(name, namespace).catch(err => console.log(err, name));

    this.setState({
      userName
    })
  }

  handleSignOut() {
    axios.post('https://dwettnsyyj.execute-api.eu-west-1.amazonaws.com/Prod/registration/api/Device/Logout',
      {
        "access_token": this.props.accessToken
      },
      {
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    ).then(async response => {
      if (response.data.succeeded) {
        localStorage.setItem(
          this.props.token,
          'NOT_SET',
          this.props.namespace
        )

        this.props.goToScreen('INTRO') 
      }
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <Layout>
        <View style={styles.container}>
          <Text style={styles.text}>Hi <Text style={styles.userName}>{this.props.userName || this.state.userName}!</Text></Text>
          <Text style={styles.text}>To update your account please visit <Text style={styles.url}>www.olympicchannel.com/my-profile</Text></Text>
          <FocusableGroup id={'sign-in-button'} style={styles.buttonContainer}>
            <Button
              label="Sign Out"
              groupId={'sign-out-button'}
              onPress={() => this.handleSignOut()}
              preferredFocus={true}
            />
          </FocusableGroup>
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
    color: '#525A5C'
  },
  subTitle: {
    color: "#525A5C",
    fontSize: 32,
  },
  buttonContainer: {
    marginTop: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
};

WelcomeScreen.displayName = 'WelcomeScreen';
export default WelcomeScreen;