
const selectionPage = document.getElementById("selectionPage");
const simulatorPage = document.getElementById("simulatorPage");
const selectSonyButton = document.getElementById("selectSony");
const selectCanonButton = document.getElementById("selectCanon");
const backButton = document.getElementById("backButton");
const brandLabel = document.getElementById("brandLabel");

const video = document.getElementById("video");
const demoImage = document.getElementById("demoImage");
const startOverlay = document.getElementById("startOverlay");
const startCameraButton = document.getElementById("startCameraButton");
const cameraErrorText = document.getElementById("cameraErrorText");
const errorButtons = document.getElementById("errorButtons");
const tryAgainButton = document.getElementById("tryAgainButton");
const demoModeButton = document.getElementById("demoModeButton");
const statusText = document.getElementById("statusText");
const flashOverlay = document.getElementById("flashOverlay");

const zoomSlider = document.getElementById("zoomSlider");
const zoomText = document.getElementById("zoomText");
const brightnessSlider = document.getElementById("brightnessSlider");

const filterButtons = document.querySelectorAll(".filterButton");
const autoFocusButton = document.getElementById("autoFocusButton");
const focusBox = document.getElementById("focusBox");
const focusStatusText = document.getElementById("focusStatusText");

const takePhotoButton = document.getElementById("takePhotoButton");
const photoCanvas = document.getElementById("photoCanvas");
const gallery = document.getElementById("gallery");
const galleryEmptyText = document.getElementById("galleryEmptyText");

const isoText = document.getElementById("isoText");
const apertureText = document.getElementById("apertureText");
const shutterText = document.getElementById("shutterText");
const isoButtons = document.querySelectorAll("#isoButtons .settingButton");
const apertureButtons = document.querySelectorAll("#apertureButtons .settingButton");
const shutterButtons = document.querySelectorAll("#shutterButtons .settingButton");



let currentZoom = 1;
let currentBrightness = 100;
let currentFilter = "normal";
let currentIso = "200";
let currentAperture = "f/2.8";
let currentShutter = "1/125";


let photoList = [];
let photoCounter = 0;

selectSonyButton.addEventListener("click", function () {
  brandLabel.textContent = "SONY";
  openSimulator();
});


selectCanonButton.addEventListener("click", function () {
  brandLabel.textContent = "CANON";
  openSimulator();
});

function openSimulator() {
  selectionPage.classList.add("hidden");
  simulatorPage.classList.remove("hidden");
}

backButton.addEventListener("click", function () {
  simulatorPage.classList.add("hidden");
  selectionPage.classList.remove("hidden");
});

startCameraButton.addEventListener("click", function () {
  startCamera();
});

tryAgainButton.addEventListener("click", function () {
  cameraErrorText.classList.add("hidden");
  errorButtons.classList.add("hidden");
  startCameraButton.classList.remove("hidden");
  startCamera();
});

demoModeButton.addEventListener("click", function () {
  useDemoMode();
});

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      // Success! Show the video and connect it to the webcam stream
      video.srcObject = stream;
      video.classList.remove("hidden");
      demoImage.classList.add("hidden");
      startOverlay.classList.add("hidden");

      statusText.textContent = "● LIVE";
      statusText.className = "statusLive";
    })
    .catch(function () {
      startCameraButton.classList.add("hidden");
      cameraErrorText.classList.remove("hidden");
      errorButtons.classList.remove("hidden");
    });
}

function useDemoMode() {
  demoImage.src = "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800";
  demoImage.classList.remove("hidden");
  video.classList.add("hidden");
  startOverlay.classList.add("hidden");

  statusText.textContent = "● LIVE (DEMO)";
  statusText.className = "statusLive";
}

zoomSlider.addEventListener("input", function () {
  changeZoom();
});

function changeZoom() {
  currentZoom = zoomSlider.value;
  zoomText.textContent = parseFloat(currentZoom).toFixed(1) + "x";
  updateVideoLook();
}


brightnessSlider.addEventListener("input", function () {
  currentBrightness = brightnessSlider.value;
  updateVideoLook();
});


for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    changeFilter(filterButtons[i]);
  });
}

function changeFilter(clickedButton) {
  currentFilter = clickedButton.getAttribute("data-filter");
  highlightSelected(filterButtons, clickedButton);
  updateVideoLook();
}

function updateVideoLook() {
  let filterValue = "brightness(" + currentBrightness + "%)";

  if (currentFilter === "bw") {
    filterValue += " grayscale(100%)";
  } else if (currentFilter === "vintage") {
    filterValue += " sepia(60%) contrast(90%)";
  } else if (currentFilter === "warm") {
    filterValue += " saturate(150%) hue-rotate(-10deg)";
  } else if (currentFilter === "cool") {
    filterValue += " saturate(120%) hue-rotate(20deg)";
  } else if (currentFilter === "bright") {
    filterValue += " brightness(130%) saturate(120%)";
  }

  video.style.filter = filterValue;
  demoImage.style.filter = filterValue;

  video.style.transform = "scale(" + currentZoom + ")";
  demoImage.style.transform = "scale(" + currentZoom + ")";
}



autoFocusButton.addEventListener("click", function () {
  focusBox.classList.remove("hidden");
  focusStatusText.textContent = "FOCUSING...";

  setTimeout(function () {
    focusStatusText.textContent = "FOCUS LOCKED";
  }, 900);

  setTimeout(function () {
    focusBox.classList.add("hidden");
    focusStatusText.textContent = "";
  }, 2200);
});


takePhotoButton.addEventListener("click", function () {
  takePhoto();
});

const topShutterButton = document.getElementById("topShutterButton");
topShutterButton.addEventListener("click", function () {
  takePhoto();
});

function takePhoto() {
  // Show the flash effect
  flashOverlay.classList.add("flashActive");
  setTimeout(function () {
    flashOverlay.classList.remove("flashActive");
  }, 200);

  statusText.textContent = "● CAPTURING";
  statusText.className = "statusCapturing";

  setTimeout(function () {
    statusText.textContent = "● LIVE";
    statusText.className = "statusLive";
  }, 400);

  let source = video;
  if (video.classList.contains("hidden")) {
    source = demoImage;
  }
  photoCanvas.width = 400;
  photoCanvas.height = 300;
  const context = photoCanvas.getContext("2d");
  context.drawImage(source, 0, 0, photoCanvas.width, photoCanvas.height);

  const imageLink = photoCanvas.toDataURL("image/png");

  photoCounter = photoCounter + 1;
  photoList.push({ id: photoCounter, link: imageLink });
  renderGallery();
}

function renderGallery() {
  gallery.innerHTML = "";

  if (photoList.length === 0) {
    galleryEmptyText.classList.remove("hidden");
  } else {
    galleryEmptyText.classList.add("hidden");
  }

  for (let i = 0; i < photoList.length; i++) {
    const photo = photoList[i];

    const card = document.createElement("div");
    card.className = "photoCard";

    const img = document.createElement("img");
    img.src = photo.link;
    card.appendChild(img);

    const buttonRow = document.createElement("div");
    buttonRow.className = "photoButtons";

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "DOWNLOAD";
    downloadButton.addEventListener("click", function () {
      downloadPhoto(photo);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.addEventListener("click", function () {
      deletePhoto(photo.id);
    });

    buttonRow.appendChild(downloadButton);
    buttonRow.appendChild(deleteButton);
    card.appendChild(buttonRow);
    gallery.appendChild(card);
  }
}

function downloadPhoto(photo) {
  const link = document.createElement("a");
  link.href = photo.link;
  link.download = "photo-" + photo.id + ".png";
  link.click();
}

function deletePhoto(photoId) {
  photoList = photoList.filter(function (photo) {
    return photo.id !== photoId;
  });
  renderGallery();
}


for (let i = 0; i < isoButtons.length; i++) {
  isoButtons[i].addEventListener("click", function () {
    currentIso = isoButtons[i].getAttribute("data-iso");
    isoText.textContent = "ISO " + currentIso;
    highlightSelected(isoButtons, isoButtons[i]);
  });
}

for (let i = 0; i < apertureButtons.length; i++) {
  apertureButtons[i].addEventListener("click", function () {
    currentAperture = apertureButtons[i].getAttribute("data-aperture");
    apertureText.textContent = currentAperture;
    highlightSelected(apertureButtons, apertureButtons[i]);
  });
}

for (let i = 0; i < shutterButtons.length; i++) {
  shutterButtons[i].addEventListener("click", function () {
    currentShutter = shutterButtons[i].getAttribute("data-shutter");
    shutterText.textContent = currentShutter;
    highlightSelected(shutterButtons, shutterButtons[i]);
  });
}

function highlightSelected(buttonGroup, clickedButton) {
  for (let i = 0; i < buttonGroup.length; i++) {
    buttonGroup[i].classList.remove("selectedOption");
  }
  clickedButton.classList.add("selectedOption");
}


document.getElementById("checkChallenge1").addEventListener("click", function () {
  const resultBox = document.getElementById("result1");
  if (currentIso === "400") {
    resultBox.textContent = "✓ Challenge Complete!";
    resultBox.style.color = "#6fcf68";
  } else {
    resultBox.textContent = "Try again!";
    resultBox.style.color = "#e8734a";
  }
});
document.getElementById("checkChallenge2").addEventListener("click", function () {
  const resultBox = document.getElementById("result2");
  if (currentAperture === "f/2.8") {
    resultBox.textContent = "✓ Challenge Complete!";
    resultBox.style.color = "#6fcf68";
  } else {
    resultBox.textContent = "Try again!";
    resultBox.style.color = "#e8734a";
  }
});

document.getElementById("checkChallenge3").addEventListener("click", function () {
  const resultBox = document.getElementById("result3");
  if (currentShutter === "1/250") {
    resultBox.textContent = "✓ Challenge Complete!";
    resultBox.style.color = "#6fcf68";
  } else {
    resultBox.textContent = "Try again!";
    resultBox.style.color = "#e8734a";
  }
});
document.getElementById("checkChallenge4").addEventListener("click", function () {
  const resultBox = document.getElementById("result4");
  if (parseFloat(currentZoom).toFixed(1) === "2.0") {
    resultBox.textContent = "✓ Challenge Complete!";
    resultBox.style.color = "#6fcf68";
  } else {
    resultBox.textContent = "Try again!";
    resultBox.style.color = "#e8734a";
  }
});
