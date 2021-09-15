/*
The liked stuff may not need to live in the App component. Maybe try moving it to the Gallery component, that way
we can keep the module scoped variable going, and only set to a state variable when the gallery is going to render/re-render
*/

import "./css/App.css";
import { useState } from "react";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import { Route, HashRouter, Switch } from "react-router-dom";

function App() {
  const [faveGallery, setFaveGallery] = useState([]);
  const [faveIds, setFaveIds] = useState([]);
  const galleryUrls = {
    mars_rover:
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=KnTfeP68Y6KMuMuhCMWSxjlYXsqjgoCWUo8chunG",
    apod: "https://api.nasa.gov/planetary/apod?api_key=KnTfeP68Y6KMuMuhCMWSxjlYXsqjgoCWUo8chunG&start_date=2021-01-01",
    lucky:
      "https://api.nasa.gov/planetary/apod?api_key=KnTfeP68Y6KMuMuhCMWSxjlYXsqjgoCWUo8chunG&count=50",
    loved: "",
  };

  const updateFaveState = (gallery, ids) => {
    setFaveGallery(gallery);
    setFaveIds(ids);
  };

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
      component: (
        <Gallery
          galleryUrls={galleryUrls}
          updateFaveState={updateFaveState}
          faveGallery={faveGallery}
          faveIds={faveIds}
        />
      ),
      exact: false,
    },
    {
      link: "/gallery/apod",
      path: "/gallery/:gallery",
      name: "APOD",
      component: (
        <Gallery galleryUrls={galleryUrls} updateFaveState={updateFaveState} />
      ),
      exact: false,
    },
    {
      link: "/gallery/lucky",
      path: "/gallery/:gallery",
      name: "Feeling Lucky",
      component: (
        <Gallery galleryUrls={galleryUrls} updateFaveState={updateFaveState} />
      ),
      exact: false,
    },
    {
      link: "/gallery/loved",
      path: "/gallery/:gallery",
      name: "Loved Pics",
      component: (
        <Gallery galleryUrls={galleryUrls} updateFaveState={updateFaveState} />
      ),
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
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
