import "../css/gallery.css";
import ReadyToRender from "./ReadyToRender";
import SlideToggle from "./SlideToggle";
import { useState, useEffect, useReducer } from "react";
import useLocalStorageState from "../hooks/localStorageState";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Select from "./Select";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Navigation from "./Navigation";
import galleryUrls from "../data/galleryUrls";
import {
  client,
  galleryNotLoaded,
  galleryFetched,
} from "../functions/galleryFunctions";
import errorImage from "../images/problemMeme.jpeg";
import sadAstro from "../images/sadAstro.png";

const Gallery = (props) => {
  const [faveGallery, setFaveGallery] = useLocalStorageState(
    [],
    "favorites-gallery"
  );
  const [faveIds, setFaveIds] = useLocalStorageState([], "favorites-ids");

  const params = useParams();
  const chosenGallery = galleryUrls[params.gallery.replace("-", "_")];
  const [galleryUrl, setGalleryUrl] = useState("");
  const [hqImage, setHqImage] = useState(false);

  const [galleryState, setGalleryState] = useReducer(
    (galleryState, newState) => ({ ...galleryState, ...newState }),
    { images: [], current: [], total: 0 }
  );
  const [paginateState, setPaginateState] = useReducer(
    (paginateState, newState) => ({ ...paginateState, ...newState }),
    { page: 1, size: 10 }
  );
  const numberofImages = [
    {
      name: "10",
      value: "10",
    },
    {
      name: "20",
      value: "20",
    },
    {
      name: "30",
      value: "30",
    },
    {
      name: "40",
      value: "40",
    },
    {
      name: "50",
      value: "50",
    },
  ];

  const showLoading = ["mars-rover", "apod", "lucky"];
  const hasHiQualityImages = ["apod", "lucky"];

  useEffect(() => {
    setGalleryState({
      images: [],
      current: [],
      total: 0,
    });
  }, [chosenGallery]);

  useEffect(() => {
    if (galleryUrl !== chosenGallery) {
      setGalleryUrl(chosenGallery);

      if (params.gallery === "loved") {
        galleryNotLoaded();
        galleryFetched(
          params.gallery,
          faveGallery,
          paginateState,
          setGalleryState
        );
      } else if (chosenGallery !== "") {
        galleryNotLoaded();
        client.get(chosenGallery).then((data) => {
          if (data !== undefined) {
            galleryFetched(
              params.gallery,
              data.photos ? data.photos : data,
              paginateState,
              setGalleryState
            );
          }
        });
      }
    }
  }, [galleryUrl, chosenGallery, params.gallery, paginateState, faveGallery]);

  useEffect(() => {
    window.localStorage.setItem("favorites-ids", JSON.stringify(faveIds));
  }, [faveIds]);

  useEffect(() => {
    window.localStorage.setItem(
      "favorites-gallery",
      JSON.stringify(faveGallery)
    );
  }, [faveGallery]);

  const updateImages = (page, size) => {
    const startImg = (page - 1) * size;
    const endImg = startImg + size;

    setGalleryState({ current: galleryState.images.slice(startImg, endImg) });
  };

  const selectNumImages = (size) => {
    setPaginateState({ size: parseInt(size) });
    updateImages(paginateState.page, parseInt(size));
  };

  const changeCurrentPage = (page) => {
    setPaginateState({ page: page });
    updateImages(page, paginateState.size);
  };

  const highQualityImages = (e) => {
    setHqImage(e.target.checked);
  };

  const checkIfEmpty = () => {
    if (galleryState.total === 0 && params.gallery === "loved") {
      return (
        <div className="no-likes-container">
          <span>You havn't liked any images yet...</span>
          <img width="400px" src={sadAstro} alt="Sad Astro" />
        </div>
      );
    }
  };

  const showLoadingAnimation = () => {
    if (showLoading.includes(params.gallery)) {
      return <Loading />;
    }
  };

  const updateFave = (value, action) => {
    if (action === "add") {
      setFaveGallery([...faveGallery, value]);
      setFaveIds([...faveIds, value.id]);
    } else if (action === "remove") {
      setFaveGallery(value.images);
      setFaveIds(value.ids);
    }
  };

  return (
    <>
      <div className="header-container">
        <Navigation links={props.links} />
        <Select onChange={selectNumImages} values={numberofImages} />
        {hasHiQualityImages.includes(params.gallery) && (
          <SlideToggle
            lText="Low"
            rText="High"
            eventHandler={highQualityImages}
          />
        )}
      </div>
      {checkIfEmpty()}
      <div className="gallery-container grid-container">
        {showLoadingAnimation()}
        <div className="error-image hide" style={{ maxWidth: "500px" }}>
          <img src={errorImage} alt="error" style={{ marginBottom: "20px" }} />
          <span>Uh oh... Looks like we couldn't get the images from NASA.</span>
          <br />
          <span> Please try refreshing the page, or trying again later.</span>
        </div>
        <div className="gallery-images-wrapper">
          <ReadyToRender
            galleryUrl={galleryUrl}
            chosenGallery={chosenGallery}
            galleryName={params.gallery}
            hqImage={hqImage}
            updateFave={updateFave}
            faveGallery={faveGallery}
            faveIds={faveIds}
            currentGallery={galleryState.current}
            setGalleryUrl={setGalleryUrl}
          />
        </div>
      </div>
      <div className="gallery-pagination-controls--container hide">
        <Pagination
          currentPage={paginateState.page}
          changeCurrentPage={changeCurrentPage}
          totalSize={galleryState.total}
          sizePerPage={paginateState.size}
          theme="dark"
        />
      </div>
    </>
  );
};

export default Gallery;
