// @flow
import * as React from "react";
import IntroScreen from './screens/IntroScreen';
import SignInScreen from './screens/SignInScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import { localStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";

const NAMESPACE = "quick-brick-oc-login-plugin";
const TOKEN = 'oc_access_token';
const USERNAME = 'oc_username';
const SKIP = 'skip-prehook'

export class OCLoginPluginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'LOADING',
      isPrehook: Boolean(this.props.callback),
      userName: ''
    };

    this.renderScreen = this.renderScreen.bind(this);
    this.goToScreen = this.goToScreen.bind(this);
    this.checkTokenStatus = this.checkTokenStatus.bind(this);
  }

  componentWillMount() {
    this.checkTokenStatus();
  }

  async checkTokenStatus() {
    const accessToken = await localStorage.getItem(TOKEN, NAMESPACE).catch(err => console.log(err, TOKEN));
    const skipPrehook = await localStorage.getItem(SKIP, NAMESPACE).catch(err => console.log(err, SKIP));
    const userName = await localStorage.getItem(USERNAME, NAMESPACE).catch(err => console.log(err, USERNAME));

    if (this.state.isPrehook && (accessToken || skipPrehook)) {
      this.props.callback({ success: true })
    }
    else if (!this.state.isPrehook && (accessToken && accessToken !== 'NOT_SET')) {
      this.setState({
        screen: 'WELCOME',
        userName,
        accessToken
      })
    }
    else {
      this.setState({
        screen: 'INTRO'
      })
    }
  }

  goToScreen(screen) {
    this.setState({
      screen
    })
  }

  renderScreen(screen) {
    const {
      configuration,
      screenData,
      payload
    } = this.props;

    const getGroupId = () => {
      if (screenData) {
        return screenData.groupId;
      }
      if (payload) {
        return payload.groupId
      }
    }

    const getPluginData = (data) => {
      if (configuration && configuration[data]) {
        return configuration[data];
      }
      if (screenData && screenData.general && screenData.general[data]) {
        return screenData.general[data];
      }
    }

    const segmentKey = getPluginData('segment_key');
    const gygiaCreateDeviceUrl = getPluginData('gygia_create_device_url');
    const gygiaGetDeviceByPinUrl = getPluginData('gygia_get_device_by_pin_url')
    const gygiaQrUrl = getPluginData('gygia_qr_url');
    const gygiaLogoutUrl = getPluginData('gygia_logout_url');

    switch (screen) {
      case 'LOADING': {
        return <LoadingScreen
          goToScreen={this.goToScreen}
          isPrehook={this.state.isPrehook}
          groupId={getGroupId()}
          segmentKey={segmentKey}
        />;
      }
      case 'INTRO': {
        return <IntroScreen
          goToScreen={this.goToScreen}
          closeHook={this.props.callback}
          namespace={NAMESPACE}
          skip={SKIP}
          isPrehook={this.state.isPrehook}
          groupId={getGroupId()}
          segmentKey={segmentKey}
        />;
      }
      case 'WELCOME': {
        return <WelcomeScreen
          goToScreen={this.goToScreen}
          closeHook={this.props.callback}
          userName={this.state.userName}
          name={USERNAME}
          accessToken={this.state.accessToken}
          isPrehook={this.state.isPrehook}
          token={TOKEN}
          namespace={NAMESPACE}
          groupId={getGroupId()}
          segmentKey={segmentKey}
          gygiaLogoutUrl={gygiaLogoutUrl}
        />;
      }
      case 'SIGNIN': {
        return <SignInScreen
          goToScreen={this.goToScreen}
          closeHook={this.props.callback}
          namespace={NAMESPACE}
          userName={USERNAME}
          token={TOKEN}
          isPrehook={this.state.isPrehook}
          groupId={getGroupId()}
          segmentKey={segmentKey}
          gygiaCreateDeviceUrl={gygiaCreateDeviceUrl}
          gygiaGetDeviceByPinUrl={gygiaGetDeviceByPinUrl}
          gygiaQrUrl={gygiaQrUrl}
        />
      }
    }
  }
  render() {
    return (
      this.renderScreen(this.state.screen)
    );
  }
}
