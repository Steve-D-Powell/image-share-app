import React from "react";
import "../css/Gallery.css";
import GalleryImage from "./GaleryImage";

const Gallery = (props) => {
  const marsImages = props.marsImages;

  if (marsImages === "unloaded") {
    return <div>No Images Found</div>;
  }

  return (
    <div className="grid-container">
      {marsImages.map((image, index) => (
        <GalleryImage
          key={index}
          imageSrc={image.img_src}
          camera={image.camera}
          date={image.earth_date}
        />
      ))}
    </div>
  );
};

export default Gallery;
