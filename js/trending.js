window.addEventListener("DOMContentLoaded", async function () {

   const newsImages = [
  "https://source.unsplash.com/68csPWTnafo",
   "https://source.unsplash.com/HY1fq4ZtLTE",
   "https://source.unsplash.com/kfSjyxAWhEc",
   "https://source.unsplash.com/f7xoQpzl-Mo",
   "https://source.unsplash.com/dWhsNvhfC8c",
   "https://source.unsplash.com/68csPWTnafo",
   "https://source.unsplash.com/HY1fq4ZtLTE",
   "https://source.unsplash.com/kfSjyxAWhEc",
   "https://source.unsplash.com/f7xoQpzl-Mo",
   "https://source.unsplash.com/dWhsNvhfC8c",
   "https://source.unsplash.com/68csPWTnafo",
   "https://source.unsplash.com/HY1fq4ZtLTE",
   "https://source.unsplash.com/kfSjyxAWhEc",
   "https://source.unsplash.com/f7xoQpzl-Mo",
   "https://source.unsplash.com/dWhsNvhfC8c",
   "https://source.unsplash.com/68csPWTnafo",
   "https://source.unsplash.com/HY1fq4ZtLTE",
   "https://source.unsplash.com/kfSjyxAWhEc",
   "https://source.unsplash.com/f7xoQpzl-Mo",
   "https://source.unsplash.com/dWhsNvhfC8c",
   "https://source.unsplash.com/68csPWTnafo",
   "https://source.unsplash.com/HY1fq4ZtLTE",
   "https://source.unsplash.com/kfSjyxAWhEc",
   "https://source.unsplash.com/f7xoQpzl-Mo",
   "https://source.unsplash.com/dWhsNvhfC8c",
   "https://source.unsplash.com/68csPWTnafo",
   "https://source.unsplash.com/HY1fq4ZtLTE",
   "https://source.unsplash.com/kfSjyxAWhEc",
   "https://source.unsplash.com/f7xoQpzl-Mo",
   "https://source.unsplash.com/dWhsNvhfC8c",
   "https://source.unsplash.com/68csPWTnafo",
   "https://source.unsplash.com/HY1fq4ZtLTE",
   "https://source.unsplash.com/kfSjyxAWhEc",
   "https://source.unsplash.com/f7xoQpzl-Mo",
   "https://source.unsplash.com/dWhsNvhfC8c",
  ]

  getNews();

  async function getNews() {
    const url = 'https://fashion-industry-news-data-collection.p.rapidapi.com/?q=%22fashion%20week%22&lang="en"';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '67f2e8a736mshd6ec5d0bfcc47f1p1df50bjsn0dc6bb81d805',
        'X-RapidAPI-Host': 'fashion-industry-news-data-collection.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const data = JSON.parse(result).response.data;
      const englishContent = data.filter(article => article.language == 'en');
      await displayNews(englishContent);
  
    } catch (error) {
      console.error(error);
    }
  }

  async function displayNews(news) {

    console.log(news);

    await news.forEach((item, index) => {
      addSlideToCarousel(item.title, item.url, newsImages[index]);
    });

  };

  async function addSlideToCarousel(title, url, imageUrl) {
    const carouselInner = document.querySelector("#newsCarousel .carousel-inner");
    const carouselIndicators = document.querySelector("#newsCarousel .carousel-indicators");

    // Create carousel item
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");

    carouselItem.innerHTML = `
      <img class="d-block w-100 object-fit-cover" height="500px" src=${imageUrl} alt="..." />
      <div class="bg-white bg-opacity-50 rounded-3 carousel-caption">
        <h5 class="mb-4 text-dark">${title}</h5>
        <button href=${url} type="button" class="btn btn-outline-dark">Read More</button>
      </div>`

    // Append the carousel item to the carousel inner
    carouselInner.appendChild(carouselItem);

    // Create carousel indicator
    const carouselIndicator = document.createElement("button");
    carouselIndicator.setAttribute("type", "button");
    carouselIndicator.setAttribute("data-bs-target", "#newsCarousel");
    carouselIndicator.setAttribute("data-bs-slide-to", carouselInner.childElementCount - 1);

    // Add active class to the first indicator
    if (carouselInner.childElementCount === 2) {
      carouselIndicator.classList.add("active");
    }

    // Append the indicator to the carousel indicators
    carouselIndicators.appendChild(carouselIndicator);
  }

});