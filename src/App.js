import React, { useEffect, useState, useMemo } from "react";
import "./css/app.css";
import Gallery from "./components/Gallery";
import Home from "./components/Home";
import MobileNav from "./components/MobileNav";
import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
/*Test*/
function App() {
  const [linkList, setLinkList] = useState([]);
  const links = useMemo(
    () => [
      {
        link: "/",
        path: "/",
        name: "Home",
        component: <Home links={linkList} />,
        exact: true,
        hide: true,
      },
      {
        link: "/gallery/mars-rover",
        path: "/gallery/:gallery",
        name: "Mars Rover Gallery",
        component: <Gallery links={linkList} />,
        exact: false,
        hide: false,
      },
      {
        link: "/gallery/apod",
        path: "/gallery/:gallery",
        name: "Pic of the Day Gallery",
        component: <Gallery links={linkList} />,
        exact: false,
        hide: false,
      },
      {
        link: "/gallery/lucky",
        path: "/gallery/:gallery",
        name: "Feeling Lucky Gallery",
        component: <Gallery links={linkList} />,
        exact: false,
        hide: false,
      },
      {
        link: "/gallery/loved",
        path: "/gallery/:gallery",
        name: "Liked Gallery",
        component: <Gallery links={linkList} />,
        exact: false,
        hide: false,
      },
    ],
    [linkList]
  );

  useEffect(() => {
    setLinkList(links);
  }, []);

  return (
    <div className="App">
      <HashRouter>
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
        <MobileNav links={linkList} />
      </HashRouter>
    </div>
  );
}

export default App;
