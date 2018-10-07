import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import { Header, Text, Button } from "react-native-elements";
import PropTypes from "prop-types";

const Topbar = ({ handleAdd }) => (
  <Fragment>
    <Header
      outerContainerStyles={{ paddingBottom: 10, height: 70 }}
      leftComponent={
        <Text h4 style={{ color: "#fff" }}>
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

Topbar.propTypes = { handleAdd: PropTypes.func.isRequired };

export default Topbar;
