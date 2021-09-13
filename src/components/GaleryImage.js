const GalleryImage = ({ index, imageObj }) => {
  const imageId = imageObj.id === undefined ? index : imageObj.id;
  const imageSrc =
    imageObj.img_src === undefined ? imageObj.url : imageObj.img_src;
  const fullName =
    imageObj.camera === undefined ? imageObj.title : imageObj.camera.full_name;
  const imageDate =
    imageObj.earth_date === undefined ? imageObj.date : imageObj.earth_date;

  const Img = (props) => {
    return (
      <a href={imageSrc}>
        <img
          className={`grid-item grid-item-${index}`}
          src={imageSrc}
          alt={`${fullName}-${imageDate}`}
        />
      </a>
    );
  };

  const Video = (props) => {
    return (
      <a
        href={imageSrc}
        srl_video_thumbnail="/images/video-placeholder.jpeg"
        srl_video_caption={imageObj.explanation}
        srl_video_scale="50"
      >
        <img
          className={`grid-item grid-item-${index}`}
          src="/images/video-placeholder.jpeg"
          alt={`${fullName}-${imageDate}`}
        />
      </a>
    );
  };

  const Media = (props) => {
    if (imageObj.media_type === "video") {
      return <Video />;
    } else {
      return <Img />;
    }
  };

  return (
    <div className="gallery-image-container">
      <div
        className="gallery-image"
        data-media-id={imageId}
        data-media-src={imageSrc}
        data-media-alt={`${fullName}-${imageDate}`}
        data-media-title={fullName}
        data-media-date={imageDate}
      >
        <Media />
        <div className="image-info-container">
          <p>{fullName}</p>
          <p>Earth Date: {imageDate}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
