import FAVICON_SOURCES from "../assets/favicon_sources.json"

const handleSelectChange = (event) => {
  const value = event.target.value;
  const src = FAVICON_SOURCES.find((source) => source.value === value);
  if (src) {
    browser.storage.local.set({ "faviconSource": src.url });
  }
}

const getOption = (source, isSelected) => {
  const option = document.createElement("option");
  option.setAttribute("value", source.value)
  if (isSelected) {
    option.setAttribute("selected", "selected")
  }
  option.innerHTML = source.label;
  return option;
}

const initSelect = (sourceURL) => {
  const select = document.querySelector("#icon-src-select");
  select.addEventListener("change", handleSelectChange)
  FAVICON_SOURCES.forEach(source => {
    select.appendChild(getOption(source, source.url == sourceURL));
  });
}

const handleToggleChange = (event) => {
  const checked = event.target.checked;
  browser.storage.local.set({ "anonViewFavicon": checked });
}

const initToggle = (isChecked) => {
  const toggle = document.querySelector("#hide-anon-toggle");
  if (isChecked) {
    toggle.setAttribute("checked", "checked");
  }
  toggle.addEventListener("change", handleToggleChange);
}

const updateUI = (storedSource) => {
  const sourceURL = storedSource.faviconSource;
  const hideAnonView = storedSource.anonViewFavicon;
  initSelect(sourceURL);
  initToggle(hideAnonView);
};

const onError = (e) => {
  console.error(e);
}

// update UI with settings in storage
const gettingStoredSource = browser.storage.local.get({
  faviconSource: FAVICON_SOURCES[0].url,
  anonViewFavicon: false
});
gettingStoredSource.then(updateUI, onError);
