import * as React from "react";
import { View } from "react-native";
import HTMLView from 'react-native-htmlview';
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";
import { trackEvent } from "../analytics/segment/index";
import Button from "../components/Button";
import Layout from "../components/Layout";

class LegalScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    trackEvent(this.props.segmentKey, "Legal Section");
  }

  render() {
    const {
      isPrehook,
      groupId,
      goToScreen
    } = this.props;

    return (
      <Layout isPrehook={isPrehook}>
        <View style={styles.container}>
          <View style={styles.legalSection}>
            <HTMLView
              value={this.props.legalContent}
            />
          </View>
          <View style={styles.buttonContainer}>
            <FocusableGroup id={'legal-button'} style={styles.focusContainer} groupId={groupId}>
              <Button
                label="Ok"
                groupId={'legal-button'}
                onPress={() => goToScreen("INTRO")}
                preferredFocus={true}
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
    alignItems: 'center',
    marginTop: 30
  },
  legalSection: {
    flex: 1
  },
  title: {
    color: "#525A5C",
    fontSize: 42,
    fontWeight: 'bold',
  },
  text: {
    color: "#525A5C",
    fontSize: 20,
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

LegalScreen.displayName = 'LegalScreen';
export default LegalScreen;