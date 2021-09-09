import React from "react";

const GalleryImage = (props) => {
  return (
    <div>
      <img
        className={`grid-item grid-item-${props.key}`}
        src={props.imageSrc}
      />
      <p>Camera: {props.camera.full_name}</p>
      <p>Date: {props.date}</p>
    </div>
  );
};

export default GalleryImage;
