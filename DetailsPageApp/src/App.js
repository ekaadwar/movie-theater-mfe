import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import DetailsContent from "./components/DetailsContent/DetailsContent.jsx";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/details/:id" component={DetailsContent} />
        <Redirect to="/details/1" />
      </Switch>
    </div>
  );
};

export default App;
