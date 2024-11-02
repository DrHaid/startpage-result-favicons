import FAVICON_SOURCES from "../assets/favicon_sources.json"

const getFaviconElement = (hostname, faviconBaseURL, anonViewLink) => {
  const faviconUrl = faviconBaseURL.replace("%DOMAIN%", hostname);
  const img = document.createElement("img");
  img.setAttribute("src", faviconUrl);
  img.height = 18;
  img.width = 18;
  img.style.marginRight = "5px";
  img.style.display = "flex";
  img.style.alignItems = "center";
  img.className = "result-favicon";

  let a;
  if (anonViewLink) {
    a = document.createElement("a");
    a.href = anonViewLink;
    a.target = "_blank"
    a.title="Visit in Anonymous View";
    a.appendChild(img)
  }

  return anonViewLink ? a : img;
}

const insertFavicons = (storedSettings) => {
  if (faviconsExist()) {
    return;
  }
  const sourceURL = storedSettings.faviconSource;
  const hideAnonView = storedSettings.anonViewFavicon;
  const resultContainers = document.querySelectorAll("div.result");
  resultContainers.forEach((container) => {
    const linkElement = container.querySelector("div.upper > a")
    if (!linkElement) return;

    const url = linkElement.getAttribute("href");
    const hostname = new URL(url).hostname;
    
    let anonURL;
    if (hideAnonView) {
      const anonViewLinkElement = container.querySelector("div.anonymous-view-link > a");
      anonURL = anonViewLinkElement.getAttribute("href");
      anonViewLinkElement.remove()
    }
    const faviconElement = getFaviconElement(hostname, sourceURL, anonURL);
    linkElement.insertAdjacentElement("beforebegin", faviconElement);
  });
};

const faviconsExist = () => 
  document.querySelectorAll("img.result-favicon").length > 0;

const onError = (e) => {
  console.error(e);
}

const observer = new MutationObserver(() => {
  const gettingStoredSettings = browser.storage.local.get({
    faviconSource: FAVICON_SOURCES[0].url,
    anonViewFavicon: false
  });
  gettingStoredSettings.then(insertFavicons, onError);
});

// watch search result container for changes to apply icons
observer.observe(document.body, {
  childList: true,
  subtree: true
});
