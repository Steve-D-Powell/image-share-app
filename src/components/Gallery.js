import "../css/Gallery.css";
import GalleryImage from "./GaleryImage";
import { useState, useEffect, useReducer } from "react";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Select from "./Select";
import { SRLWrapper } from "simple-react-lightbox-pro";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

const Gallery = ({ galleryUrls }) => {
  console.log("Gallery Rendered");
  const params = useParams();
  const chosenGallery = galleryUrls[params.gallery.replace("-", "_")];
  const [galleryUrl, setGalleryUrl] = useState(chosenGallery);
  const [isLoaded, setIsLoaded] = useState(false);
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
      name: "10 Images",
      value: "10",
    },
    {
      name: "20 Images",
      value: "20",
    },
    {
      name: "30 Images",
      value: "30",
    },
    {
      name: "40 Images",
      value: "40",
    },
    {
      name: "50 Images",
      value: "50",
    },
  ];

  useEffect(() => {}, []);

  useEffect(() => {
    if (!isLoaded) {
      console.log("Updated the Gallery");
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      async function getTotalImages() {
        try {
          const response = await fetch(galleryUrl);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return await response.json();
        } catch (err) {
          console.log(err);
        }
      }
      getTotalImages().then((data) => {
        if (data !== undefined) {
          let allImages = data.photos ? data.photos : data;
          const startImg = (paginateState.page - 1) * paginateState.size;
          const endImg = startImg + paginateState.size;
          const currentImages = allImages.slice(startImg, endImg);

          setGalleryState({
            images: allImages,
            current: currentImages,
            total: allImages.length,
          });
          setIsLoaded(true);
        }
      });
    }
  }, [galleryUrl, isLoaded, paginateState, chosenGallery]);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        document.querySelector(".gallery-container").classList.remove("hide");
        document
          .querySelector(".gallery-pagination-controls--container")
          .classList.remove("hide");
      }, 500);
    } else {
      document.querySelector(".gallery-container").classList.add("hide");
      document
        .querySelector(".gallery-pagination-controls--container")
        .classList.add("hide");
    }
  }, [isLoaded]);

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

  const checkGalleryUrl = () => {
    if (galleryUrl !== chosenGallery) {
      setGalleryUrl(chosenGallery);
      setIsLoaded(false);
    }
  };
  checkGalleryUrl();

  if (galleryState.current === "unloaded") {
    return <div>No Images Found</div>;
  }

  return (
    <>
      <Select onChange={selectNumImages} values={numberofImages} />
      {isLoaded ? <Loading isLoading={"hide"} /> : <Loading isLoading={""} />}
      <div className="gallery-container grid-container hide">
        <SRLWrapper>
          {galleryState.current.map((image, index) => (
            <GalleryImage key={index} index={index} imageObj={image} />
          ))}
        </SRLWrapper>
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
