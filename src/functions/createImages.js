export function createMarsImage(image) {
  return {
    id: image.id.toString(),
    src: image.img_src,
    title: `Rover Name: ${image.rover.name}`,
    date: image.earth_date,
    media_type: image.media_type ? image.media_type : "image",
  };
}

export function createApodImage(image, hqImage) {
  const validateHQ =
    hqImage && image.hdurl !== "" && image.hdurl !== undefined
      ? image.hdurl
      : image.url;

  return {
    id: `${image.title.replace(/ /g, "-")}-${image.date}`,
    src: validateHQ,
    title: image.title,
    date: image.date,
    media_type: image.media_type ? image.media_type : "image",
  };
}

export function createDefaultImage(image) {
  return {
    id: image.id,
    src: image.src,
    title: image.title,
    date: image.title,
    media_type: image.media_type ? image.media_type : "image",
  };
}
