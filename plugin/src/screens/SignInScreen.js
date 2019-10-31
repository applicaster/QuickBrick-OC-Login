import * as React from "react";
import axios from "axios";
import { View, Text, ActivityIndicator } from "react-native";
import { getAppData } from "@applicaster/zapp-react-native-bridge/QuickBrick";
import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
import { trackEvent, identifyUser} from "../analytics/segment/index";
import Layout from "../components/Layout"
import QRCode from "../components/QRCode"

const HEARBEAT_INTERVAL = 5000;

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devicePinCode: '',
      loading: true
    };

    this.getSignInStatus = this.getSignInStatus.bind(this);
  }

  componentDidMount() {
    trackEvent(this.props.segmentKey, "Waiting Page")

    axios.post('https://dwettnsyyj.execute-api.eu-west-1.amazonaws.com/Prod/registration/api/Device/CreateDevice',
      {
        "deviceId": getAppData().uuid
      },
      {
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
      this.setState({
        devicePinCode: response.data.devicePinCode,
        loading: false
      }, () => this.heartbeat = setInterval(() => {
        this.getSignInStatus()
      }, HEARBEAT_INTERVAL));
    }).catch(err => console.log(err))
  }

  componentWillUnmount() {
    clearInterval(this.heartbeat)
  }

  getSignInStatus() {
    axios.get(`https://dwettnsyyj.execute-api.eu-west-1.amazonaws.com/Prod/registration/api/Device/GetDeviceByPin/${this.state.devicePinCode}`,
      {
        headers: {
          "accept": "application/json"
        }
      }
    ).then(async response => {
      if (response.data.access_token) {
        const {
          access_token,
          firstname
        } = response.data;

        identifyUser(this.props.segmentKey, access_token, firstname, this.state.devicePinCode)

        await localStorage.setItem(
          this.props.token,
          access_token,
          this.props.namespace
        )

        await localStorage.setItem(
          this.props.userName,
          firstname,
          this.props.namespace
        )

        if (this.props.isPrehook) {
          trackEvent(this.props.segmentKey, "Login Succesful")
          this.props.closeHook({ success: true })
        } else {
          this.props.goToScreen('WELCOME')
        }

      }
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <Layout isPrehook={this.props.isPrehook}>
        <View style={styles.container}>
          <Text style={styles.title}>
            SIGN IN INTO YOUR OLYMPIC CHANNEL ACCOUNT
          </Text>
          <View style={styles.columnsContainer}>
            <View style={styles.leftColumn}>
              <Text style={styles.text} adjustsFontSizeToFit>
                Go to:
              </Text>
              <Text style={{ ...styles.text, ...styles.url }} adjustsFontSizeToFit>
                account.olympicchannel.com
              </Text>
              <Text style={{ ...styles.text, marginBottom: 30 }} adjustsFontSizeToFit>
                Enter the activation code below
              </Text>
              {
                this.state.loading
                  ? <View style={styles.pinCodeSpinner}>
                    <ActivityIndicator size="small" color="#525A5C" />
                  </View>
                  : <Text style={styles.pinCode} adjustsFontSizeToFit>{this.state.devicePinCode}</Text>
              }
            </View>
            <View style={styles.rightColumn}>
              {
                this.state.loading
                  ? <View style={styles.loadContainer}>
                    <ActivityIndicator size="large" color="#525A5C" />
                  </View>
                  : <QRCode url={`https://dwettnsyyj.execute-api.eu-west-1.amazonaws.com/Prod?devicePinCode=${this.state.devicePinCode}`} />
              }
            </View>
          </View>
          <View style={styles.bottomText}>
            <Text style={styles.text}>
              If you need support, please visit <Text style={{ ...styles.text, color: '#525A5C', marginLeft: 32 }}> http://olympicchannel.com/signin/support</Text>
            </Text>
          </View>
        </View>
      </Layout>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: "#525A5C",
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 110
  },
  text: {
    color: "#525A5C",
    fontSize: 32,
    marginBottom: 20,
  },
  url: {
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 60,
    color: '#525A5C'
  },
  columnsContainer: {
    width: 1110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30
  },
  bottomText: {
    width: 1110,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRightColor: '#979797',
    borderRightWidth: 2,
    minHeight: 330
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderLeftColor: '#979797',
    borderLeftWidth: 2,
    minHeight: 330
  },
  loadContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinCode: {
    fontSize: 72,
    color: "#525A5C",
    fontWeight: 'bold'
  },
  pinCodeSpinner: {
    width: 500,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

SignInScreen.displayName = 'SignInScreen';
export default SignInScreen;