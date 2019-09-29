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
    else if (!this.state.isPrehook && (accessToken && accessToken !== 'NOT_SET') && userName) {
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
    switch (screen) {
      case 'LOADING': {
        return <LoadingScreen
          goToScreen={this.goToScreen}
          isPrehook={this.state.isPrehook}
        />;
      }
      case 'INTRO': {
        return <IntroScreen
          goToScreen={this.goToScreen}
          closeHook={this.props.callback}
          namespace={NAMESPACE}
          skip={SKIP}
          isPrehook={this.state.isPrehook}
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
