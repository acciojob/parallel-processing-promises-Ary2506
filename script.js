const output = document.getElementById("output");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);

    img.src = url;
  });
}

async function downloadImages(imageUrls) {
  loading.innerHTML = '<div class="spinner"></div>';
  error.textContent = '';
  output.innerHTML = '';

  try {
    const images = await Promise.all(
      imageUrls.map(url => downloadImage(url))
    );

    loading.innerHTML = '';

    images.forEach(img => {
      output.appendChild(img);
    });
  } catch (err) {
    loading.innerHTML = '';
    error.textContent = err;
  }
}