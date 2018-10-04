import { TOGGLE_MODAL } from "../actions/modal";

const modal = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return action.isOpen;
    default:
      return state;
  }
};

export default modal;
