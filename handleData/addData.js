window.addEventListener("DOMContentLoaded", async function () {
  console.log("ready!");

  db = firebase.firestore();

  // Products = [{
  //   "title": "Tonal Stitch Button-Through Sweater Polo",
  //   "brand": "Abbercrombie and Fitch",
  //   "category": "casual",
  //   "color": ["white"],
  //   "badges": ["Sale", "New Arrival"],
  //   "timestamp": "2023-03-06 10:30AM",
  //   "content": `The Tonal Stitch Button-Through Sweater Polo is a stylish and versatile piece that effortlessly combines the classic polo design with the comfort and warmth of a sweater. Crafted with meticulous attention to detail, this polo features tonal stitching throughout, adding a subtle and sophisticated touch to its overall aesthetic. The button-through front adds a refined element, allowing for adjustable coverage and styling options. Made from high-quality materials, the sweater polo offers a luxurious feel against the skin while ensuring durability and long-lasting wear. Its versatile nature makes it a perfect choice for both casual and semi-formal occasions, whether you pair it with jeans for a laid-back look or dress it up with tailored trousers. With its impeccable craftsmanship and timeless design, the Tonal Stitch Button-Through Sweater Polo is a wardrobe staple that effortlessly blends comfort and style.`,
  //   "images": [
  //     "./assets/products/20/TonalStitchButton-ThroughSweaterPolo1.jpg",
  //     "./assets/products/20/TonalStitchButton-ThroughSweaterPolo2.jpg",
  //     "./assets/products/20/TonalStitchButton-ThroughSweaterPolo3.jpg",
  //     "./assets/products/20/TonalStitchButton-ThroughSweaterPolo4.jpg",
  //   ],
  //   "stars": 3,
  //   "reviews": [
  //     {
  //       "author": "Avery Brown",
  //       "timestamp": "2 months ago",
  //       "rating": 4,
  //       "comment": "Satisfied with the purchase. Good overall."
  //     },
  //     {
  //       "author": "John Thompson",
  //       "timestamp": "today",
  //       "rating": 5,
  //       "comment": "Impressed with the quality and performance."
  //     },
  //     {
  //       "author": "Samantha Smith",
  //       "timestamp": "one week ago",
  //       "rating": 3,
  //       "comment": "Average product. Could be better."
  //     },
  //     {
  //       "author": "Daniel Martinez",
  //       "timestamp": "2 days ago",
  //       "rating": 4,
  //       "comment": "Sturdy construction. Performs well."
  //     },
  //   ]
  // }]

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

/*


*/
