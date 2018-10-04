import { SET_RECIPE } from "../actions/current-recipe";

const currRecipe = (state = {}, action) => {
  switch (action.type) {
    case SET_RECIPE:
      return action.recipe;
    default:
      return state;
  }
};

export default currRecipe;
