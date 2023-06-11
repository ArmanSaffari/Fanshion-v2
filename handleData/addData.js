window.addEventListener("DOMContentLoaded", async function () {
  console.log("ready!");

  db = firebase.firestore();

  Products = [{
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
  }]

  async function addProduct(product) {
    
    const id = db.collection('Products').doc().id;
    product.brand = product.brand.toLowerCase();
    if (product.category) {
      product.category = product.category.toLowerCase();
    }

    const docRef = await db.collection("Products").doc(id).set({
      id: id,
      ...product,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    console.log("Document Saved with ID:", docRef.id);
  };

  try {
    Products.forEach(product => {
      addProduct(product);
    });
  } catch (err) {
    console.log("err", err)
  }

});