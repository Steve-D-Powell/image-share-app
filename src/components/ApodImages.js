const ApodImages = ({ index, imageObj }) => {
  const imageId = imageObj.id === undefined ? index : imageObj.id;
  const imageSrc =
    imageObj.img_src === undefined ? imageObj.url : imageObj.img_src;
  const fullName =
    imageObj.camera === undefined ? imageObj.title : imageObj.camera.full_name;
  const imageDate =
    imageObj.earth_date === undefined ? imageObj.date : imageObj.earth_date;

  const Img = (props) => {
    return (
      <img
        className={`grid-item grid-item-${index}`}
        src={imageSrc}
        alt={`${fullName}-${imageDate}`}
      />
    );
  };

  const Video = (props) => {
    return (
      <img
        className={`grid-item grid-item-${index}`}
        src="../images/video-placeholder.jpeg"
      />
    );
  };

  const Media = (props) => {
    if (imageObj.media_type == "image") {
      return <Img />;
    } else {
      return <Video />;
    }
  };

  return (
    <div className="gallery-image-container">
      <a
        href={imageSrc}
        className="gallery-image"
        data-image-id={imageId}
        data-image-src={imageSrc}
        data-image-alt={`${fullName}-${imageDate}`}
        data-image-title={fullName}
        data-image-date={imageDate}
        srl_video_thumbnail="../images/video-placeholder.jpeg"
        srl_video_caption={imageObj.explanation}
        href={imageSrc}
      >
        <Media />
        <div className="image-info-container">
          <p>{fullName}</p>
          <p>Earth Date: {imageDate}</p>
        </div>
      </a>
    </div>
  );
};

export default GalleryImage;
