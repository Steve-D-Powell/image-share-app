const GalleryImage = (props) => {
  const imageObj = props.imageObj;
  const imageId = imageObj.id === undefined ? props.index : imageObj.id;
  const imageSrc =
    imageObj.img_src === undefined ? imageObj.url : imageObj.img_src;
  const fullName =
    imageObj.camera === undefined ? imageObj.title : imageObj.camera.full_name;
  const imageDate =
    imageObj.earth_date === undefined ? imageObj.date : imageObj.earth_date;

  return (
    <div className="gallery-image-container">
      <div
        className="gallery-image"
        data-image-id={imageId}
        data-image-src={imageSrc}
        data-image-alt={`${fullName}-${imageDate}`}
        data-image-title={fullName}
        data-image-date={imageDate}
      >
        <img
          className={`grid-item grid-item-${props.index}`}
          src={imageSrc}
          alt={`${fullName}-${imageDate}`}
        />
        <div className="image-info-container">
          <p>{fullName}</p>
          <p>Earth Date: {imageDate}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
