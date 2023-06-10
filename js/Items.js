window.addEventListener("DOMContentLoaded", async function () {

//1. get the parameter:

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const brand = urlParams.get('brand')
console.log(brand);

//2. send request to firebase to get the content

// db = firebase.firestore();

async function getItmes (brand) {
  let products = [];
  try {
    const querySnapshot = await db.collection("Products").where("brand", "==", "Zara").get();
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      products.push(product);
    });
    return products
  } catch (err) {
    console.error('err: ', err)
  }
};

products = await getItmes (brand);
console.log(products)

product = {
  "id": "123541",
  "title": "Product Title 1",
  "brand": "Zara",
  "category": "Product Category",
  "color": ["bright"],
  "badges": ["Sale", "New Arrival"],
  "timestamp": "2023-06-06 10:30AM",
  "content": "Product description or content goes here.",
  "images": [
    "https://example.com/product-image1.jpg",
    "https://example.com/product-image2.jpg",
    "https://example.com/product-image3.jpg"
  ],
  "stars": 4,
  "reviews": [
    {
      "author": "John Doe",
      "timestamp": "",
      "rating": 4,
      "comment": "Great product!"
    },
    {
      "author": "Jane Smith",
      "timestamp": "",
      "rating": 5,
      "comment": "Highly recommended!"
    }
  ]
}


//3. display content using DOM
/* arman:
  asume that the object named "product" which I defined in section 2 above (line14)
  is the only product data that is received from the firebase,
  please use this javascript file to build html elements for 1 card 
  containing this data instead of having them writen directly in html
  **first we build one card and then we will add more (I will tell u that stage later)
  good luck!
*/ 

});