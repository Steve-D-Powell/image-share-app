import React from "react";
import "./css/App.css";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import { Route, HashRouter, Switch, Redirect } from "react-router-dom";

function App() {
  const links = [
    {
      link: "/",
      path: "/",
      name: "Home",
      component: <Home />,
      exact: true,
    },
    {
      link: "/gallery/mars-rover",
      path: "/gallery/:gallery",
      name: "Mars Rover",
      component: <Gallery />,
      exact: false,
    },
    {
      link: "/gallery/apod",
      path: "/gallery/:gallery",
      name: "APOD",
      component: <Gallery />,
      exact: false,
    },
    {
      link: "/gallery/lucky",
      path: "/gallery/:gallery",
      name: "Feeling Lucky",
      component: <Gallery />,
      exact: false,
    },
    {
      link: "/gallery/loved",
      path: "/gallery/:gallery",
      name: "Loved Pics",
      component: <Gallery />,
      exact: false,
    },
  ];

  return (
    <div className="App">
      <Header />
      <HashRouter>
        <Navigation links={links} />
        <Switch>
          {links.map((obj, index) => {
            return obj.exact ? (
              <Route key={index} exact path={obj.path}>
                {obj.component}
              </Route>
            ) : (
              <Route key={index} path={obj.path}>
                {obj.component}
              </Route>
            );
          })}
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
