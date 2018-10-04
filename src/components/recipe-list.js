import React from "react";
import { Picker } from "react-native";
import PropTypes from "prop-types";

const RecipeList = ({ recipes, currRecipe, handlePick }) => (
  <Picker
    style={{ margin: 0 }}
    selectedValue={JSON.stringify(currRecipe)}
    onValueChange={val => handlePick(JSON.parse(val))}
  >
    {recipes.map(r => (
      <Picker.Item key={JSON.stringify(r)} label={r.recipe.replace(/-/g, " ")} value={JSON.stringify(r)} />
    ))}
  </Picker>
);

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  currRecipe: PropTypes.shape({
    recipe: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    directions: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  handlePick: PropTypes.func.isRequired
};

export default RecipeList;
