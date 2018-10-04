import React from "react";
import { View, StyleSheet } from "react-native";
import { Field, reduxForm } from "redux-form";
import { FormLabel, Button } from "react-native-elements";
import PropTypes from "prop-types";
import validate from "../utils/validation";
import Textarea from "./form-input";

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  inputs: {
    marginBottom: 10
  },
  label: {
    color: "#476dc5"
  }
});

const Form = ({ handleClose, handleSubmit, currRecipe, type, submitRecipe, invalid, ...rest }) =>
  console.log(rest) || (
    <View style={styles.modal}>
      <View style={styles.inputs}>
        <FormLabel labelStyle={styles.label}>Recipe Title</FormLabel>
        <Field name="recipe" component={Textarea} placeholder="Recipe Name" />
        <FormLabel labelStyle={styles.label}>Ingredients</FormLabel>
        <Field
          name="ingredients"
          placeholder="Separate each ingredient with a '\\': \n\nMilk \\ 2 Eggs \\ 1/3 Cup Sugar"
          component={Textarea}
        />
        <FormLabel labelStyle={styles.label}>Directions</FormLabel>
        <Field
          name="directions"
          placeholder="Separate each step with a '\\': \n\nPreheat over to 350°F \\ Combine ingredients in pie crust \\ Bake until crust is golden brown"
          component={Textarea}
        />
      </View>
      <View style={styles.row}>
        <Button borderRadius={4} title="CANCEL" onPress={() => handleClose(false)} />
        <Button
          borderRadius={4}
          raised
          backgroundColor="#476dc5"
          title={type === "add" ? "ADD" : "SAVE"}
          onPress={() => submitRecipe(type)}
          onSubmit={handleSubmit(submitRecipe)}
          disabled={invalid}
        />
      </View>
    </View>
  );

Form.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  currRecipe: PropTypes.shape({
    recipe: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    directions: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  type: PropTypes.string.isRequired
};

export default reduxForm({
  form: "recipeModal",
  validate
})(Form);
