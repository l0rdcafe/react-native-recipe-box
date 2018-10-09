import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import { Font } from "expo";
import { Header, Text, Button } from "react-native-elements";
import PropTypes from "prop-types";

class Topbar extends React.Component {
  state = { loaded: false };
  componentDidMount() {
    this.loadFont();
  }
  loadFont = async () => {
    await Font.loadAsync({
      Gabriola: require("../../assets/Gabriola.ttf")
    });
    this.setState({ loaded: true });
  };
  render() {
    const { handleAdd } = this.props;
    const { loaded } = this.state;
    return (
      <Fragment>
        <Header
          outerContainerStyles={{ paddingBottom: 10, height: 70 }}
          leftComponent={
            <Text h4 style={[{ color: "#fff" }, loaded && { fontFamily: "Gabriola", fontSize: 40, paddingTop: 8 }]}>
              Recipe Box
            </Text>
          }
          rightComponent={
            <Button
              backgroundColor="#eee"
              title="+"
              rounded
              onPress={() => handleAdd(true, "add")}
              textStyle={{
                color: "#000",
                fontSize: 24,
                height: 40,
                width: 40,
                position: "relative",
                left: 13,
                top: 4
              }}
              buttonStyle={{ width: "100%", height: "100%", position: "relative", left: 14 }}
              containerViewStyle={{ width: 40, height: 40 }}
            />
          }
        />
        <StatusBar barStyle="light-content" />
      </Fragment>
    );
  }
}

Topbar.propTypes = { handleAdd: PropTypes.func.isRequired };

export default Topbar;
