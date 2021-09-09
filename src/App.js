import "./css/App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import heroImage from "./images/stars.jpg";

function App() {
  const [imageOfTheDay, setImageOfTheDay] = useState({ url: heroImage });
  const [marsImages, setMarsImages] = useState("unloaded");

  useEffect(() => {
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

    async function getMarsRoverImages() {
      try {
        const response = await fetch(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=KnTfeP68Y6KMuMuhCMWSxjlYXsqjgoCWUo8chunG&page=1"
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
      }
    });

    getMarsRoverImages().then((data) => {
      if (data !== undefined) {
        setMarsImages(data.photos);
      }
    });
  }, []);

  return (
    <div className="App">
      <Header imageOfTheDay={imageOfTheDay} />
      <Gallery marsImages={marsImages} />
    </div>
  );
}

export default App;
