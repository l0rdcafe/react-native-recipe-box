import React, { Fragment } from "react";
import { StyleSheet, Text } from "react-native";
import { FormInput } from "react-native-elements";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  textarea: {
    height: 70,
    width: "100%"
  },
  error: {
    color: "#c91b26",
    alignSelf: "flex-start",
    marginVertical: 10,
    marginLeft: 20
  }
});

const Textarea = ({ input, meta, ...rest }) => {
  const { name } = input;
  if (name === "recipe") {
    return (
      <Fragment>
        <FormInput
          {...input}
          {...rest}
          value={input.value}
          helperText={!meta.active && meta.touched ? meta.error : ""}
          error={!meta.active && meta.touched && meta.error}
          inputStyle={{ width: "100%" }}
        />
        {meta.error && !meta.active && meta.touched && <Text style={styles.error}>{meta.error}</Text>}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <FormInput
        multiline
        numberOfLines={4}
        {...input}
        {...rest}
        error={!meta.active && meta.touched && meta.error}
        inputStyle={styles.textarea}
        value={input.value}
      />
      {meta.error && !meta.active && meta.touched && <Text style={styles.error}>{meta.error}</Text>}
    </Fragment>
  );
};

Textarea.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    active: PropTypes.bool,
    touched: PropTypes.bool
  })
};

Textarea.defaultProps = {
  input: {},
  meta: {}
};

export default Textarea;
