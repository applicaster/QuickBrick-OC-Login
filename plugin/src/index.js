// @flow
import * as React from "react";
import IntroScreen from './screens/IntroScreen'
import SignInScreen from './screens/SignInScreen';

export class OCLoginPluginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'INTRO'
    };

    this.renderScreen = this.renderScreen.bind(this);
    this.goToScreen = this.goToScreen.bind(this);
  }

  goToScreen(screen) {
    this.setState({
      screen
    })
  }

  renderScreen(screen) {
    switch (screen) {
      case 'INTRO': {
        return <IntroScreen goToScreen={this.goToScreen}/>;
      }
      case 'SIGNIN': {
        return <SignInScreen goToScreen={this.goToScreen}/>
      }
    }
  }
  render() {
    return (
      this.renderScreen(this.state.screen)
    );
  }
}
