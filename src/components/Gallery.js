import "../css/Gallery.css";
import GalleryImage from "./GaleryImage";
import { useState, useEffect } from "react";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Select from "./Select";

const Gallery = ({ galleryUrl, checkGalleryLoading, changeGalleryUrl }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);

  useEffect(() => {
    console.log("Updated the Gallery");
    console.log("URL", galleryUrl);
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
        let images = data.photos ? data.photos : data;
        console.log("images", images);

        setTotalImages(images.length);
        setGalleryImages(images);
        setCurrentImages(images.slice(0, 10));
      }
    });
  }, [galleryUrl]);

  useEffect(() => {
    console.log("Reloaded the Gallery");

    const updateImages = () => {
      const startImg = (currentPage - 1) * sizePerPage;
      const endImg = startImg + sizePerPage;

      setCurrentImages(galleryImages.slice(startImg, endImg));
      console.log("Finished Reloading");
    };
    updateImages();
  }, [currentPage, sizePerPage, galleryImages]);

  useEffect(() => {
    if (galleryImages.length > 0) {
      checkGalleryLoading();
    }
  }, [galleryImages, checkGalleryLoading]);

  const selectNumImages = (num) => {
    setSizePerPage(parseInt(num));
  };

  const changeCurrentPage = (numPage) => {
    setCurrentPage(numPage);
  };

  if (currentImages === "unloaded") {
    return <div>No Images Found</div>;
  }

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

  const galleryUrls = [
    {
      name: "Mars Rover",
      value:
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=KnTfeP68Y6KMuMuhCMWSxjlYXsqjgoCWUo8chunG",
    },
    {
      name: "APOD - 2021",
      value:
        "https://api.nasa.gov/planetary/apod?api_key=KnTfeP68Y6KMuMuhCMWSxjlYXsqjgoCWUo8chunG&start_date=2021-09-01",
    },
  ];

  const selectImgUrl = (url) => {
    setGalleryImages([]);
    changeGalleryUrl(url);
  };

  return (
    <>
      <Select onChange={selectNumImages} values={numberofImages} />
      <Select onChange={selectImgUrl} values={galleryUrls} />
      <div className="grid-container">
        {currentImages.map((image, index) => (
          <GalleryImage key={index} index={index} imageObj={image} />
        ))}
      </div>
      <div className="pagination-controls--container">
        <Pagination
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
          totalSize={totalImages}
          sizePerPage={sizePerPage}
          theme="dark"
        />
      </div>
    </>
  );
};

export default Gallery;
