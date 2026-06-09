const output = document.getElementById("output");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const button = document.getElementById("download-images-button");

const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300"
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.onload = () => resolve(img);

    img.onerror = () => reject(`Failed to load image: ${url}`);

    img.src = url;
  });
}

function downloadImages(urls) {
  loading.innerHTML = '<div class="spinner"></div>';
  error.textContent = "";
  output.innerHTML = "";

  Promise.all(urls.map(downloadImage))
    .then((images) => {
      loading.innerHTML = "";

      images.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      loading.innerHTML = "";
      error.textContent = err;
    });
}

button.addEventListener("click", () => {
  downloadImages(imageUrls);
});