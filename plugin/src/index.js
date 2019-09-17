// @flow
import * as React from "react";
import IntroScreen from './screens/IntroScreen'
import SignInScreen from './screens/SignInScreen';
import { sessionStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/SessionStorage";

const NAMESPACE = "quick-brick-oc-login-plugin";
const TOKEN = 'oc_access_token';

export class OCLoginPluginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'INTRO'
    };

    this.renderScreen = this.renderScreen.bind(this);
    this.goToScreen = this.goToScreen.bind(this);
    this.checkTokenStatus = this.checkTokenStatus.bind(this);
  }

  componentWillMount() {
    this.checkTokenStatus();
  }

  async checkTokenStatus() {
    const accessToken = await sessionStorage.getItem(TOKEN, NAMESPACE).catch(err => console.log(err));
    if (accessToken) {
      this.props.callback({ success: true })
    }
  }

  goToScreen(screen) {
    this.setState({
      screen
    })
  }

  renderScreen(screen) {
    switch (screen) {
      case 'INTRO': {
        return <IntroScreen goToScreen={this.goToScreen} closeHook={this.props.callback} />;
      }
      case 'SIGNIN': {
        return <SignInScreen
          goToScreen={this.goToScreen}
          closeHook={this.props.callback}
          namespace={NAMESPACE}
          token={TOKEN}
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
