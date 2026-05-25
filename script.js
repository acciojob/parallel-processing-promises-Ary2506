//your JS code here. If required.

const output = document.getElementById("output");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download one image
function downloadImage(url) {
  return new Promise((resolve, reject) => {

    const img = document.createElement("img");

    img.src = url;

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(`Failed to load image: ${url}`);
    };

  });
}

// Main function
async function downloadImages() {

  // Loading message
  output.innerHTML = "<p>Loading...</p>";

  try {

    // Download all images together
    const downloadedImages = await Promise.all(
      images.map(image => downloadImage(image.url))
    );

    // Clear loading text
    output.innerHTML = "";

    // Show all images
    downloadedImages.forEach(img => {
      output.appendChild(img);
    });

  } catch (error) {

    // Show error message
    output.innerHTML = `<p style="color:red;">${error}</p>`;

  }
}

// Call function
downloadImages();