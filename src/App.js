import "./css/App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import heroImage from "./images/stars.jpg";

function App() {
  const [imageOfTheDay, setImageOfTheDay] = useState({ url: heroImage });
  const [galleryUrl, setGalleryUrl] = useState(
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=KnTfeP68Y6KMuMuhCMWSxjlYXsqjgoCWUo8chunG"
  );
  const [headerIsLoaded, setHeaderIsLoaded] = useState(false);
  const [galleryIsLoaded, setGalleryIsLoaded] = useState(false);

  useEffect(() => {
    console.log("Ran a update in App");
    async function getImageOfTheDay() {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=KnTfeP68Y6KMuMuhCMWSxjlYXsqjgoCWUo8chunG"
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return await response.json();
      } catch (err) {
        console.log(err);
      }
    }
    getImageOfTheDay().then((data) => {
      if (data !== undefined) {
        setImageOfTheDay(data);
        setHeaderIsLoaded(true);
      }
    });
  }, []);

  useEffect(() => {
    if (headerIsLoaded && galleryIsLoaded) {
      setTimeout(() => {
        document
          .querySelector(".loading-screen--container")
          .classList.add("hide");
        document.querySelector("body").style.overflow = "scroll";
      }, 1000);
    }
  }, [headerIsLoaded, galleryIsLoaded]);

  const checkGalleryLoading = () => {
    setGalleryIsLoaded(true);
  };

  const changeGalleryUrl = (url) => {
    setGalleryUrl(url);
  };

  return (
    <div className="App">
      <Header imageOfTheDay={imageOfTheDay} />
      <Gallery
        galleryUrl={galleryUrl}
        checkGalleryLoading={checkGalleryLoading}
        changeGalleryUrl={changeGalleryUrl}
      />
    </div>
  );
}

export default App;
