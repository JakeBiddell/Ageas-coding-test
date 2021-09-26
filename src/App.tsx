import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import MembersPage from "./Pages/MembersPage";
import { store } from "./Slices";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <MembersPage />
        </header>
      </div>
    </Provider>
  );
}

export default App;
