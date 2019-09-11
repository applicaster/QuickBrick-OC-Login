import * as React from "react";
import { View, Text, Dimensions, Image, ActivityIndicator } from "react-native";
import { getAppData } from "@applicaster/zapp-react-native-bridge/QuickBrick";
import axios from "axios";
import Button from "../components/Button";
import QRCode from "../components/QRCode"

const { width, height } = Dimensions.get('window');

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
      console.log(response)
      this.setState({
        devicePinCode: response.data.devicePinCode,
        loading: false
      })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Two ways to Register/Sign in into your Olympic Channel Account</Text>
          <View style={styles.columnsContainer}>
            <View style={styles.leftColumn}>
              <Text style={styles.subTitle}>Visit Website</Text>
              <Text style={{ ...styles.text, marginTop: 30 }} adjustsFontSizeToFit>1. To sign in or create an account visit: olympicchannel.com/account</Text>
              <Text style={{ ...styles.text, marginBottom: 60 }} adjustsFontSizeToFit>2. When prompted, enter the code below:</Text>
              {
                this.state.loading
                  ? <ActivityIndicator size="small" color="#525A5C" />
                  : <Text style={styles.pinCode} adjustsFontSizeToFit>{this.state.devicePinCode}</Text>
              }

            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.subTitle} >Scan QR Code</Text>
              <Text style={{ ...styles.text, marginTop: 30 }}>To scan, use your camera app or a QR code reader on your device</Text>
              {
                this.state.loading
                  ? <View style={styles.loadContainer}>
                    <ActivityIndicator size="large" color="#525A5C" />
                  </View>
                  : <QRCode url={`https://dwettnsyyj.execute-api.eu-west-1.amazonaws.com/Prod?devicePinCode=${this.state.devicePinCode}`} />
              }

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
  },
  title: {
    color: "#525A5C",
    fontSize: 36,
    fontWeight: 'bold',
  },
  subTitle: {
    color: "#525A5C",
    fontSize: 32,
    fontWeight: 'bold',
  },
  text: {
    color: "#525A5C",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  columnsContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: 30
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    borderRightColor: '#D8D8D8',
    borderRightWidth: 1
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    borderLeftColor: '#D8D8D8',
    borderLeftWidth: 1
  },
  loadContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinCode: {
    fontSize: 36,
    color: "#525A5C",
    fontWeight: 'bold'
  }
};

SignInScreen.displayName = 'SignInScreen';
export default SignInScreen;