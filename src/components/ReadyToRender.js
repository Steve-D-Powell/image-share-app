import GalleryImage from "./GalleryImage";
import { SRLWrapper } from "simple-react-lightbox-pro";

const ReadyToRender = (props) => {
  if (props.chosenGallery === props.galleryUrl) {
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
        props.updateFave(image, "add");
      } else {
        const newFaveImages = props.faveGallery.filter(
          (currentImg) => currentImg.id !== image.id
        );
        const newFaveIds = props.faveIds.filter((id) => id !== image.id);

        if (props.galleryName === "loved") {
          props.setGalleryUrl("Reset");
        }
        props.updateFave({ images: newFaveImages, ids: newFaveIds }, "remove");
      }
    };

    const constructId = (image) => {
      if (props.galleryName === "loved") {
        return image.id;
      } else {
        return props.galleryName !== "mars-rover"
          ? `${image.title.replace(/ /g, "-")}-${image.date}`
          : image.id.toString();
      }
    };

    return (
      <SRLWrapper>
        {props.currentGallery.map((image, index) => (
          <GalleryImage
            key={index}
            liked={props.faveIds.includes(constructId(image))}
            test={image.id}
            image={image}
            hqImage={props.hqImage}
            galleryName={props.galleryName}
            likeImageClickHandler={likeImageClickHandler}
          />
        ))}
      </SRLWrapper>
    );
  } else {
    return null;
  }
};

export default ReadyToRender;
