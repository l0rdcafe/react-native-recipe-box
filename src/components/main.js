import React from "react";
import { StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipes, removeRecipe, addRecipe, saveRecipe } from "../actions/recipes";
import { toggleModal } from "../actions/modal";
import { setRecipe } from "../actions/current-recipe";
import Topbar from "./topbar";
import RecipeList from "./recipe-list";
import RecipeView from "./recipe-view";
import Modal from "./modal";
import recipeList from "../data/recipes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

class Main extends React.Component {
  async componentDidMount() {
    try {
      const recipes = await AsyncStorage.getItem("RECIPES");

      if (!recipes) {
        await AsyncStorage.setItem("RECIPES", JSON.stringify(recipeList));
        this.props.getRecipes(recipeList);
      } else if (JSON.parse(recipes).length === 0) {
        this.props.getRecipes(recipeList);
        this.props.setRecipe(recipeList[0]);
      } else {
        const parsedRecipes = JSON.parse(recipes);
        this.props.getRecipes(parsedRecipes);
        this.props.setRecipe(parsedRecipes[0]);
      }
    } catch (e) {
      console.error(e);
    }
  }
  deleteRecipe = async name => {
    const { recipes } = this.props;
    const index = recipes.findIndex(r => r.recipe === name);
    const newRecipeList = recipes.filter(r => r.recipe !== name);
    this.props.removeRecipe(index);
    let newRecipe;

    if (recipes.length > 1) {
      if (index !== 0) {
        newRecipe = newRecipeList[index - 1];
      } else {
        [newRecipe] = newRecipeList;
      }
    } else {
      newRecipe = {
        recipe: "No Recipe Found",
        ingredients: ["Please add a new recipe"],
        directions: ["Press the add button in the header to add a new recipe"]
      };
    }
    this.props.setRecipe(newRecipe);

    try {
      await AsyncStorage.removeItem("RECIPES");
      await AsyncStorage.setItem("RECIPES", JSON.stringify(newRecipeList));
    } catch (e) {
      console.error(e);
    }
  };
  handleModal = (isOpen, type) => {
    if (type === "add") {
      this.props.setRecipe({});
    }

    if (!isOpen && !this.props.currRecipe.recipe) {
      this.props.setRecipe(this.props.recipes[0]);
    }

    this.props.toggleModal(isOpen);
  };
  handleSubmit = async type => {
    const recipe = this.props.form.values.recipe.replace(/\s+/g, "-");
    const ingredients = this.props.form.values.ingredients.split(" \\ ");
    const directions = this.props.form.values.directions.split(" \\\n\n");
    const newRecipe = { recipe, ingredients, directions };
    let newRecipeList;

    if (type === "add") {
      this.props.addRecipe(newRecipe);
      newRecipeList = [...this.props.recipes, newRecipe];
    } else {
      const index = this.props.recipes.findIndex(r => r.recipe === this.props.currRecipe.recipe);
      newRecipeList = [...this.props.recipes.slice(0, index), newRecipe, ...this.props.recipes.slice(index + 1)];
      this.props.saveRecipe(newRecipe, index);
    }

    this.handleModal(false);
    this.props.setRecipe(newRecipe);

    try {
      await AsyncStorage.removeItem("RECIPES");
      await AsyncStorage.setItem("RECIPES", JSON.stringify(newRecipeList));
    } catch (e) {
      console.error(e);
    }
  };
  render() {
    const { recipes, currRecipe, setRecipe: setCurrRecipe, modal } = this.props;
    return (
      <ScrollView style={styles.container}>
        <Topbar handleAdd={this.handleModal} />
        <RecipeList recipes={recipes} currRecipe={currRecipe} handlePick={setCurrRecipe} />
        <RecipeView recipe={currRecipe} handleDelete={this.deleteRecipe} toggleModal={this.handleModal} />
        <Modal isOpen={modal} handleClose={this.handleModal} currRecipe={currRecipe} handleSubmit={this.handleSubmit} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  currRecipe: state.currRecipe,
  modal: state.modal,
  form: state.form.recipeModal
});

const mapDispatchToProps = dispatch => ({
  getRecipes: recipes => dispatch(getRecipes(recipes)),
  toggleModal: isOpen => dispatch(toggleModal(isOpen)),
  setRecipe: recipe => dispatch(setRecipe(recipe)),
  removeRecipe: i => dispatch(removeRecipe(i)),
  addRecipe: recipe => dispatch(addRecipe(recipe)),
  saveRecipe: (recipe, i) => dispatch(saveRecipe(recipe, i))
});

Main.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  getRecipes: PropTypes.func.isRequired,
  setRecipe: PropTypes.func.isRequired,
  removeRecipe: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  saveRecipe: PropTypes.func.isRequired,
  currRecipe: PropTypes.shape({
    recipe: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    directions: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  modal: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    values: PropTypes.object
  })
};

Main.defaultProps = { form: {} };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
