window.addEventListener("DOMContentLoaded", async function () {

async function addSlideToCarousel(imageUrl, title, content) {
  const carouselInner = document.querySelector("#newsCarousel .carousel-inner");
  const carouselIndicators = document.querySelector("#newsCarousel .carousel-indicators");

  // Create carousel item
  const carouselItem = document.createElement("div");
  carouselItem.classList.add("carousel-item");

  // Create image element
  // const image = document.createElement("img");
  // image.classList.add("d-block", "w-100", "object-fit-cover");
  // image.setAttribute("height", "500px");
  // image.src = imageUrl;
  // image.alt = "Slide";

  // Append the image to the carousel item
  // carouselItem.appendChild(image);
  carouselItem.innerHTML = `
    <img class="d-block w-100 object-fit-cover" height="500px" src=${imageUrl} alt="..." />
    <div class="carousel-caption d-none d-md-block">
      <h3>${title}</h3>
      <p>${content}</p>
    </div>`

  // Append the carousel item to the carousel inner
  carouselInner.appendChild(carouselItem);

  // Create carousel indicator
  const carouselIndicator = document.createElement("button");
  carouselIndicator.setAttribute("type", "button");
  carouselIndicator.setAttribute("data-bs-target", "#newsCarousel");
  carouselIndicator.setAttribute("data-bs-slide-to", carouselInner.childElementCount - 1);

  // Add active class to the first indicator
  if (carouselInner.childElementCount === 1) {
    carouselIndicator.classList.add("active");
  }

  // Append the indicator to the carousel indicators
  carouselIndicators.appendChild(carouselIndicator);
}

// Usage:

const imageUrl = "../assets/news/news1.jpg"; // Replace with the actual image URL
addSlideToCarousel(imageUrl, "SECOND", "some description");
// removeFirst()

});