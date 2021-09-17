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
  if (loadingNode) {
    loadingNode.addEventListener("transitionend", () => {
      console.log("After");
      loadingNode.style.display = "none";
    });
  }
  setTimeout(() => {
    if (loadingNode) {
      loadingNode.classList.add("ghost");
    }
    document.querySelector(".gallery-images-wrapper").classList.remove("hide");
    document
      .querySelector(".gallery-pagination-controls--container")
      .classList.remove("hide");
  }, 1500);
}

export function galleryNotLoaded() {
  const loadingNode = document.querySelector(".gallery-loading-container");

  if (loadingNode) {
    loadingNode.style.display = "block";
    loadingNode.classList.remove("ghost");
  }
  document.querySelector(".gallery-images-wrapper").classList.add("hide");
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
