import LikeHeart from "./LikeHeart";
import {
  createMarsImage,
  createApodImage,
  createDefaultImage,
} from "../functions/createImages";
import placeholder from "../images/video-placeholder.jpeg";

const Img = ({ image }) => {
  return (
    <a href={image.src} tabIndex="-1">
      <img
        className="grid-item"
        src={image.src}
        alt={`${image.title}-${image.date}`}
        tabIndex="0"
      />
    </a>
  );
};

const Video = ({ image }) => {
  return (
    <a
      href={image.src}
      srl_video_thumbnail={placeholder}
      srl_video_caption={image.explanation}
      srl_video_scale="50"
      tabIndex="-1"
    >
      <img
        className="grid-item"
        src={placeholder}
        alt={`${image.title}-${image.date}`}
        tabIndex="0"
      />
    </a>
  );
};

const Media = ({ image }) => {
  if (image.media_type === "video") {
    return <Video image={image} />;
  } else {
    return <Img image={image} />;
  }
};

const GalleryImage = (props) => {
  let imageTemplate = {};

  if (props.galleryName === "mars-rover") {
    imageTemplate = createMarsImage(props.image);
  } else if (props.galleryName === "apod" || props.galleryName === "lucky") {
    imageTemplate = createApodImage(props.image, props.hqImage);
  } else {
    imageTemplate = createDefaultImage(props.image);
  }

  return (
    <div className="gallery-image-container">
      <div
        className="gallery-image"
        data-media-id={imageTemplate.id}
        data-media-src={imageTemplate.src}
        data-media-alt={`${imageTemplate.title}-${imageTemplate.date}`}
        data-media-title={imageTemplate.title}
        data-media-date={imageTemplate.date}
        data-media-type={imageTemplate.media_type}
      >
        <Media image={imageTemplate} />
        <div className="image-info-container">
          <div className="image-info-container--text">
            <p>{imageTemplate.title}</p>
            <p>Earth Date: {imageTemplate.date}</p>
          </div>
          <div className="image-info-container--like">
            <LikeHeart
              liked={props.liked}
              likeImageClickHandler={props.likeImageClickHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
