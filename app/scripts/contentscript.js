import FAVICON_SOURCES from "../assets/favicon_sources.json"

const getFaviconElement = (hostname, faviconBaseURL) => {
  const faviconUrl = faviconBaseURL.replace("%DOMAIN%", hostname);
  const img = document.createElement("img");
  img.setAttribute("src", faviconUrl);
  img.height = 18;
  img.width = 18;
  return img;
}

const insertFavicons = (storedSource) => {
  const sourceURL = storedSource.faviconSource ?? FAVICON_SOURCES[0].url;
  const resultContainers = document.querySelectorAll("div.result > div.upper");
  resultContainers.forEach((container) => {
    const url = container.querySelector("a[role=link]").getAttribute("href");
    const hostname = new URL(url).hostname;
    const imgElement = getFaviconElement(hostname, sourceURL);

    // replace anonymous view icon with favicon image
    const anonymousViewIcon = container.querySelector("img");
    anonymousViewIcon.insertAdjacentElement("beforebegin", imgElement);
    anonymousViewIcon.remove();
  });
};

const onError = (e) => {
  console.error(e);
}

const gettingStoredSource = browser.storage.local.get("faviconSource");
gettingStoredSource.then(insertFavicons, onError);

