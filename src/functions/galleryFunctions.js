const handleError = () => {
  document.querySelector(".error-image").classList.remove("hide");
  document.querySelector(".gallery-container.grid-container").style.display =
    "flex";
  document
    .querySelector(".gallery-container.grid-container")
    .classList.add("gallery-has-error");
  document.querySelector(
    ".gallery-container.grid-container"
  ).style.justifyContent = "center";
  document.querySelector(".gallery-loading-container").style.display = "none";
};

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
      handleError();
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    handleError();
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

export function galleryIsLoaded() {
  const loadingNode = document.querySelector(".gallery-loading-container");

  if (loadingNode) {
    loadingNode.addEventListener("transitionend", () => {
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
  setTimeout(() => {
    document.querySelector(".rocket-icon").classList.remove("hidden");
  }, 1000);
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

export function galleryFetched(
  galleryName,
  images,
  paginateState,
  setGalleryState
) {
  const startImg = (paginateState.page - 1) * paginateState.size;
  const endImg = startImg + paginateState.size;
  const currentImages = images.slice(startImg, endImg);

  setGalleryState({
    images: images,
    current: currentImages,
    total: images.length,
  });
  if (images.length > 0 || galleryName === "loved") {
    galleryIsLoaded();
  } else {
    galleryNotLoaded();
  }
}
