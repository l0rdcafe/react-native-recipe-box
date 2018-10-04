import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/reducers";
import Main from "./src/components/main";

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
