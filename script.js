// Get elements
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

// Image URLs
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download image
function downloadImage(url){

  return new Promise((resolve, reject) => {

    const img = document.createElement("img");

    img.src = url;

    // Success
    img.onload = () => {
      resolve(img);
    };

    // Error
    img.onerror = () => {
      reject(`Failed to load image: ${url}`);
    };

  });

}

// Main function
async function downloadImages(){

  // Show loading spinner
  loading.innerHTML = `
    <div class="spinner"></div>
    <p>Loading Images...</p>
  `;

  // Clear previous messages
  output.innerHTML = "";
  error.innerHTML = "";

  try{

    // Download all images together
    const downloadedImages = await Promise.all(
      images.map(image => downloadImage(image.url))
    );

    // Hide loading
    loading.innerHTML = "";

    // Display images
    downloadedImages.forEach(img => {
      output.appendChild(img);
    });

  }
  catch(err){

    // Hide loading
    loading.innerHTML = "";

    // Show error
    error.innerHTML = err;

  }

}

// Call function
downloadImages();