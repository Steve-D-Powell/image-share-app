import "../css/Gallery.css";
import GalleryImage from "./GaleryImage";
import { useState, useEffect, useReducer } from "react";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Select from "./Select";
import { SRLWrapper } from "simple-react-lightbox-pro";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const Gallery = ({ galleryUrls, updateFaveState, faveGallery, faveIds }) => {
  console.log("Gallery Rendered");
  const params = useParams();
  const chosenGallery = galleryUrls[params.gallery.replace("-", "_")];
  const [galleryUrl, setGalleryUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    setGalleryState({
      images: [],
      current: [],
      total: 0,
    });
  }, [chosenGallery]);

  useEffect(() => {
    console.log("API useEffect Ran");
    const galleryUpdate = (allImages) => {
      const startImg = (paginateState.page - 1) * paginateState.size;
      const endImg = startImg + paginateState.size;
      const currentImages = allImages.slice(startImg, endImg);

      setGalleryState({
        images: allImages,
        current: currentImages,
        total: allImages.length,
      });
    };

    if (!isLoaded) {
      setIsLoaded(true);
      console.log("Fetching", galleryUrl);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      if (params.gallery === "loved" && faveGallery.length) {
        galleryUpdate(faveGallery);
      } else if (galleryUrl !== "") {
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
            galleryUpdate(data.photos ? data.photos : data);
          }
        });
      }
    }
  }, [
    galleryUrl,
    isLoaded,
    paginateState,
    galleryState,
    faveGallery,
    params.gallery,
  ]);

  useEffect(() => {
    if (galleryState.total > 0) {
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
  }, [galleryState]);

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

  const likeImageClickHandler = (event) => {
    const imageEl = event.target.closest(".gallery-image");

    const image = {
      id: imageEl.dataset.mediaId,
      src: imageEl.dataset.mediaSrc,
      title: imageEl.dataset.mediaTitle,
      date: imageEl.dataset.mediaDate,
      media_type: imageEl.dataset.mediaType,
    };

    if (event.target.checked) {
      updateFaveState([...faveGallery, image], [...faveIds, image.id]);
    } else {
      if (galleryState.total === 1) {
        setGalleryState({ total: 0 });
      }
      setIsLoaded(false);
      updateFaveState(
        faveGallery.filter((currentImg) => currentImg.id !== image.id),
        faveIds.filter((id) => id !== image.id)
      );
    }
  };

  const checkGalleryUrl = () => {
    if (galleryUrl !== chosenGallery) {
      setGalleryUrl(chosenGallery);
      setIsLoaded(false);
    }
  };
  checkGalleryUrl();

  const readyToRender = () => {
    if (isLoaded) {
      return (
        <SRLWrapper>
          {galleryState.current.map((image, index) => (
            <GalleryImage
              key={index}
              likeImageClickHandler={likeImageClickHandler}
              imageObj={image}
              highqtyImage={hqImage}
              faveIds={faveIds}
              galleryName={params.gallery}
            />
          ))}
        </SRLWrapper>
      );
    }
  };

  const checkIfEmpty = () => {
    if (galleryState.total === 0) {
      if (params.gallery === "loved") {
        return (
          <div>
            <span>Nothing to see here...</span>
          </div>
        );
      } else {
        return <Loading isLoading={""} />;
      }
    } else {
      return <Loading isLoading={"hide"} />;
    }
  };

  return (
    <>
      <Select onChange={selectNumImages} values={numberofImages} />
      <label htmlFor="High-quality-images">
        High Quality Images if available (Loads slower)
        <input
          type="checkbox"
          id="High-quality-images"
          className="HD-selector"
          onChange={highQualityImages}
        />
      </label>
      {checkIfEmpty()}
      <div className="gallery-container grid-container hide">
        {readyToRender()}
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
