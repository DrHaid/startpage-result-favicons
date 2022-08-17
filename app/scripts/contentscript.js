import FAVICON_SOURCES from "../assets/favicon_sources.json"

const getFaviconElement = (hostname, faviconBaseURL) => {
  const faviconUrl = faviconBaseURL.replace("%DOMAIN%", hostname);
  const img = document.createElement("img");
  img.setAttribute("src", faviconUrl);
  img.height = 16;
  img.width = 16;
  img.style.marginTop = "4px";
  img.style.marginRight = "4px";
  img.setAttribute("title", "Anonymous View");  // add back Anonymous View tooltip
  return img;
}

const insertFavicons = (storedSource) => {
  const sourceURL = storedSource.faviconSource ?? FAVICON_SOURCES[0].url;
  const resultContainers = document.querySelectorAll(".w-gl__result-url-container");
  resultContainers.forEach((container) => {
    const url = container.querySelector(".w-gl__result-url").getAttribute("href");
    const hostname = new URL(url).hostname;
    const imgElement = getFaviconElement(hostname, sourceURL);

    // replace anonymous view icon with favicon image
    const anonymousViewIcon = container.querySelector(".w-gl__anonymous-view-icon");
    anonymousViewIcon.insertAdjacentElement("beforebegin", imgElement);
    anonymousViewIcon.remove();
  });
};

const onError = (e) => {
  console.error(e);
}

const gettingStoredSource = browser.storage.local.get("faviconSource");
gettingStoredSource.then(insertFavicons, onError)

