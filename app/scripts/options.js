import FAVICON_SOURCES from "../assets/favicon_sources.json"

const setAttributes = (el, attrs) => {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
}

const handleRadioChange = (event) => {
  const value = event.target.value;
  const src = FAVICON_SOURCES.find((source) => source.value === value);
  if (src){
    browser.storage.local.set({"faviconSource": src.url});
  }
}

const getRadioButton = (source, isChecked) => {
  const div = document.createElement("div");
  const input = document.createElement("input");
  setAttributes(input, {type: "radio", id: source.value, value: source.value, name: "faviconSource"});
  if (isChecked){
    input.setAttribute("checked", "checked");
  }
  input.addEventListener("change", handleRadioChange);
  div.appendChild(input);
  const label = document.createElement("label");
  setAttributes(label, {for: source.value, title: source.url})
  label.innerHTML = source.label;
  div.appendChild(label);
  return div;  
}

const buildOptionsUI = (storedSource) => {
  const sourceURL = storedSource.faviconSource ?? FAVICON_SOURCES[0].url;
  const container = document.querySelector("#radio-group-container");
  FAVICON_SOURCES.forEach(source => {
    container.appendChild(getRadioButton(source, source.url === sourceURL));
  });
};

const onError = (e) => {
  console.error(e);
}

// update UI with settings in storage
const gettingStoredSource = browser.storage.local.get("faviconSource");
gettingStoredSource.then(buildOptionsUI, onError);