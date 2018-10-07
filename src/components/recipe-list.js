import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, ButtonGroup } from "react-native-elements";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#aaa",
    padding: 10
  },
  selected: {
    backgroundColor: "#476d70"
  }
});

const RecipeList = ({ recipes, handlePick, currRecipe }) => {
  const btns = recipes.map(r => (
    <Button
      raised
      buttonStyle={[styles.button, currRecipe.recipe === r.recipe && styles.selected]}
      titleStyle={{ fontSize: 16 }}
      key={JSON.stringify(r)}
      onPress={() => handlePick(r)}
      title={r.recipe.replace(/-/g, " ")}
    />
  ));
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 4 }}>
      <ButtonGroup buttons={btns} />
    </ScrollView>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlePick: PropTypes.func.isRequired,
  currRecipe: PropTypes.shape({
    recipe: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    directions: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default RecipeList;
