import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import "./App.scss";
import HomeContent from "./components/HomeContent/HomeContent.jsx";

const DetailsPage = React.lazy(() => import("vueDetails/mount"));

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
        <Suspense fallback={<div>Loading movie card...</div>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/details/:id" component={DetailsPage} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
