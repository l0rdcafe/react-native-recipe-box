const GET_RECIPES = "GET_RECIPES";
const REMOVE_RECIPE = "REMOVE_RECIPE";
const ADD_RECIPE = "ADD_RECIPE";
const SAVE_RECIPE = "SAVE_RECIPE";

const removeRecipe = index => ({ type: REMOVE_RECIPE, index });
const getRecipes = recipes => ({ type: GET_RECIPES, recipes });
const addRecipe = recipe => ({ type: ADD_RECIPE, recipe });
const saveRecipe = (recipe, index) => ({ type: SAVE_RECIPE, recipe, index });

export { GET_RECIPES, REMOVE_RECIPE, ADD_RECIPE, SAVE_RECIPE, getRecipes, removeRecipe, addRecipe, saveRecipe };
