const GalleryImage = ({ likeImage, imageObj, highqtyImage, likedIds }) => {
  let imageTemplate = {};

  if (imageObj.id) {
    imageTemplate.id = imageObj.id;
    imageTemplate.src = imageObj.img_src;
    imageTemplate.title = `Rover Name: ${imageObj.rover.name}`;
    imageTemplate.date = imageObj.earth_date;
  } else {
    const validateHQ =
      highqtyImage && imageObj.hdurl !== "" && imageObj.hdurl !== undefined
        ? imageObj.hdurl
        : imageObj.url;

    imageTemplate.id = `${imageObj.title.replace(/ /g, "-")}-${imageObj.date}`;
    imageTemplate.src = validateHQ;
    imageTemplate.title = imageObj.title;
    imageTemplate.date = imageObj.date;
  }

  const Img = (props) => {
    return (
      <a href={imageTemplate.src}>
        <img
          className="grid-item"
          src={imageTemplate.src}
          alt={`${imageTemplate.title}-${imageTemplate.date}`}
        />
      </a>
    );
  };

  const Video = (props) => {
    return (
      <a
        href={imageTemplate.src}
        srl_video_thumbnail="/images/video-placeholder.jpeg"
        srl_video_caption={imageObj.explanation}
        srl_video_scale="50"
      >
        <img
          className="grid-item"
          src="/images/video-placeholder.jpeg"
          alt={`${imageTemplate.title}-${imageTemplate.date}`}
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

  const LikeHeart = () => {
    let needsChecked = "";
    console.log("Liked Ids in Gallery", likedIds);
    const checkIfLiked = () => {
      if (likedIds.includes(imageTemplate.id)) {
        needsChecked = "checked";
      }
    };
    checkIfLiked();

    return (
      <label className="heart-switch">
        <input type="checkbox" onChange={likeImage} />
        <svg viewBox="0 0 33 23" fill="white">
          <path d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"></path>
        </svg>
      </label>
    );
  };

  return (
    <div className="gallery-image-container">
      <div
        className="gallery-image"
        data-media-id={imageTemplate.id}
        data-media-src={imageTemplate.src}
        data-media-alt={`${imageTemplate.title}-${imageTemplate.date}`}
        data-media-title={imageTemplate.title}
        data-media-date={imageTemplate.date}
      >
        <Media />
        <div className="image-info-container">
          <div className="image-info-container--text">
            <p>{imageTemplate.title}</p>
            <p>Earth Date: {imageTemplate.date}</p>
          </div>
          <div className="image-info-container--like">
            <LikeHeart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
