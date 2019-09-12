import * as React from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { getAppData } from "@applicaster/zapp-react-native-bridge/QuickBrick";
import axios from "axios";
import Layout from "../components/Layout"
import QRCode from "../components/QRCode"

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devicePinCode: '',
      loading: true
    };
  }

  componentDidMount() {
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
      })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <Layout>
        <React.Fragment>
          <Text style={styles.title}>
            SIGN IN INTO YOUR OLYMPIC CHANNEL ACCOUNT
          </Text>
          <View style={styles.columnsContainer}>
            <View style={styles.leftColumn}>
              <Text style={styles.text} adjustsFontSizeToFit>
                Go to:
              </Text>
              <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 36, marginBottom: 60 }} adjustsFontSizeToFit>
                olympicchannel.com/account
              </Text>
              <Text style={{ ...styles.text, marginBottom: 30 }} adjustsFontSizeToFit>
                Enter the activation code below
              </Text>
              {
                this.state.loading
                  ? <View style={styles.pinCodeSpinner}><ActivityIndicator size="small" color="#525A5C" /></View>
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
        </React.Fragment>
      </Layout>
    );
  }
}

const styles = {
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
  columnsContainer: {
    width: 1110,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30
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
    alignItems: 'center',
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
  pinCodeSpinner:{
    width: 500,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

SignInScreen.displayName = 'SignInScreen';
export default SignInScreen;