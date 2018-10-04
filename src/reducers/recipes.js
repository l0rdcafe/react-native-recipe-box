import { GET_RECIPES, REMOVE_RECIPE, ADD_RECIPE, SAVE_RECIPE } from "../actions/recipes";

const recipes = (state = [], action) => {
  switch (action.type) {
    case GET_RECIPES:
      return action.recipes;
    case REMOVE_RECIPE:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    case ADD_RECIPE:
      return [...state, action.recipe];
    case SAVE_RECIPE:
      return [...state.slice(0, action.index), action.recipe, ...state.slice(action.index + 1)];
    default:
      return state;
  }
};

export default recipes;
