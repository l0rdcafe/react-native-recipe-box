import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import recipes from "./recipes";
import currRecipe from "./current-recipe";
import modal from "./modal";

export default combineReducers({ recipes, currRecipe, modal, form });
