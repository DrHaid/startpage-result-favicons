import FAVICON_SOURCES from "../assets/favicon_sources.json"

const getFaviconElement = (hostname, faviconBaseURL) => {
  const faviconUrl = faviconBaseURL.replace("%DOMAIN%", hostname);
  const img = document.createElement("img");
  img.setAttribute("src", faviconUrl);
  img.height = 18;
  img.width = 18;
  img.style = "margin-right: 5px";
  return img;
}

const insertFavicons = (storedSource) => {
  const sourceURL = storedSource.faviconSource ?? FAVICON_SOURCES[0].url;
  const resultContainers = document.querySelectorAll("div.result > div.upper");
  resultContainers.forEach((container) => {
    const linkElement = container.querySelector("a")
    const url = linkElement.getAttribute("href");
    const hostname = new URL(url).hostname;
    const imgElement = getFaviconElement(hostname, sourceURL);

    linkElement.insertAdjacentElement("beforebegin", imgElement);
  });
};

const onError = (e) => {
  console.error(e);
}

const observer = new MutationObserver(() => {
  const gettingStoredSource = browser.storage.local.get("faviconSource");
  gettingStoredSource.then(insertFavicons, onError);
});

// watch search result container for changes to apply icons
observer.observe(document.querySelector("#main"), {
  childList: true,
});
