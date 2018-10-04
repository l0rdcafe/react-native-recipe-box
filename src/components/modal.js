import React from "react";
import { Modal } from "react-native";
import PropTypes from "prop-types";
import Form from "./form";

const FormModal = ({ isOpen, handleClose, currRecipe, handleSubmit }) => (
  <Modal visible={isOpen} animationType="slide">
    <Form
      handleClose={handleClose}
      submitRecipe={handleSubmit}
      currRecipe={currRecipe}
      type={currRecipe.recipe ? "edit" : "add"}
      initialValues={
        currRecipe.recipe
          ? {
              recipe: currRecipe.recipe.replace(/-/g, " "),
              ingredients: currRecipe.ingredients.join(" \\ "),
              directions: currRecipe.directions.join(" \\\n\n")
            }
          : null
      }
    />
  </Modal>
);

FormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  currRecipe: PropTypes.shape({
    recipe: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    directions: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default FormModal;
