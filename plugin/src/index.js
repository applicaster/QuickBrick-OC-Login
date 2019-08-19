// @flow
import * as React from "react";
import * as R from "ramda";
import { View, Text, ActivityIndicator, TextInput } from "react-native";

import { sessionStorage } from "@applicaster/zapp-react-native-bridge/ZappStorage/SessionStorage";
import { FocusableGroup } from "@applicaster/zapp-react-native-ui-components/Components/FocusableGroup";

import { Button } from "./Button";

type Props = {
  configuration: {},
  payload: {},
  callback: ({ success: boolean, error: ?{}, payload: ?{} }) => void
};

type State = {
  loading: boolean,
  textInput: string,
  statusMessage: string
};

const NAMESPACE = "my-demo-login";
const parseIfNeeded = R.tryCatch(JSON.parse, R.flip(R.identity));

export class MyLoginPluginComponent extends React.Component<Props, State> {
  state = { loading: true, textInput: "", statusMessage: "" };

  componentDidMount() {
    this.timeout = setTimeout(this.checkLoginStatus, 1);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  checkLoginStatus = async () => {
    try {
      const token = await sessionStorage.getItem("token", NAMESPACE);

      if (this.tokenIsValid(parseIfNeeded(token))) {
        this.success();
      } else {
        this.setState({
          loading: false,
          statusMessage: "token not found or invalid"
        });
      }
    } catch (e) {
      this.setState({ loading: false, statusMessage: e.message });
    }
  };

  renderSpinner() {
    return <ActivityIndicator />;
  }

  renderLoginForm() {
    const { textInput, statusMessage } = this.state;
    const groupId = "login-form";

    return (
      <View style={styles.loginFrame}>
        <Text style={styles.text}>Please login</Text>
        {!!statusMessage && (
          <Text style={styles.statusMessage}>{statusMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          value={textInput}
          onChange={this.handleTextInputChange}
        />
        <FocusableGroup id={groupId}>
          <Button label="Login" groupId={groupId} onPress={this.login} />
          <Button label="Cancel" groupId={groupId} onPress={this.cancel} />
        </FocusableGroup>
      </View>
    );
  }

  tokenIsValid = token => {
    const validToken =
      R.path(["configuration", "expected_token"], this.props) || "VALID_TOKEN";

    console.log({ validToken });
    return token === validToken;
  };

  login = async () => {
    this.setState({ loading: true, statusMessage: "" });

    const { textInput } = this.state;

    try {
      if (this.tokenIsValid(textInput)) {
        const status = await sessionStorage.setItem(
          "token",
          textInput,
          NAMESPACE
        );

        if (!status) {
          this.setState({
            loading: false,
            statusMessage: "could not persist toke"
          });
          return;
        }

        this.success();
      } else {
        this.setState({
          loading: false,
          statusMessage: "token is invalid - try again"
        });
      }
    } catch (e) {
      this.fail(e);
    }
  };

  success = () => {
    const { callback } = this.props;
    callback({ success: true });
  };

  fail = error => {
    const { callback } = this.props;
    callback({ success: false, error });
  };

  cancel = () => {
    const { callback } = this.props;
    callback({ success: false });
  };

  handleTextInputChange = ({ nativeEvent }) => {
    const { text } = nativeEvent;
    this.setState({ textInput: text });
  };

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        {loading ? this.renderSpinner() : this.renderLoginForm()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkgray"
  },
  loginFrame: {
    width: 450,
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    padding: 24,
    fontSize: 18
  },
  textInput: {
    height: 60,
    width: 200,
    margin: 24,
    borderColor: "gray",
    borderWidth: 1
  },
  statusMessage: {
    color: "red",
    fontWeight: "bold",
    padding: 24,
    fontSize: 18
  }
};