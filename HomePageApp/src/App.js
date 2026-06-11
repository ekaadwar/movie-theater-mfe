import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import "./App.scss";
import HomeContent from "./components/HomeContent/HomeContent.jsx";

const DetailsPage = React.lazy(() => import("details/DetailsPage"));

const HomePage = () => {
  const history = useHistory();

  return (
    <HomeContent
      movieClicked={(movie) => {
        history.push(`/details/${movie.id}`);
      }}
    />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense>
          <Switch>
            <Router exact path="/" component={HomePage} />
            <Router path="/details/:id" component={DetailsPage} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
