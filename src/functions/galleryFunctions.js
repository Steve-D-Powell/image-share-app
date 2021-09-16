export async function client(endpoint, { body, ...customConfig } = {}) {
  const config = {
    method: "GET",
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...customConfig.headers,
    },
  };

  try {
    const response = await fetch(endpoint, config);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

export function galleryIsLoaded() {
  const loadingNode = document.querySelector(".gallery-loading-container");

  setTimeout(() => {
    if (loadingNode) {
      document
        .querySelector(".gallery-loading-container")
        .classList.add("hide");
    }
    document.querySelector(".gallery-container").classList.remove("hide");
    document
      .querySelector(".gallery-pagination-controls--container")
      .classList.remove("hide");
  }, 500);
}

export function galleryNotLoaded() {
  const loadingNode = document.querySelector(".gallery-loading-container");

  if (loadingNode) {
    document
      .querySelector(".gallery-loading-container")
      .classList.remove("hide");
  }
  document.querySelector(".gallery-container").classList.add("hide");
  document
    .querySelector(".gallery-pagination-controls--container")
    .classList.add("hide");
}

export function galleryFetched(images, paginateState, setGalleryState) {
  const startImg = (paginateState.page - 1) * paginateState.size;
  const endImg = startImg + paginateState.size;
  const currentImages = images.slice(startImg, endImg);

  setGalleryState({
    images: images,
    current: currentImages,
    total: images.length,
  });
  if (images.length > 0) {
    galleryIsLoaded();
  } else {
    galleryNotLoaded();
  }
}
