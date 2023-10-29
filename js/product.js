// Get the product ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Select HTML elements to update
const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productDiscountedPrice = document.getElementById("productDiscountedPrice");
const productRegularPrice = document.getElementById("productRegularPrice");
const productDetails = document.getElementById("productDetails");
const productFeatures = document.getElementById("productFeatures");
const productColor = document.getElementById("productColor");
const productSizes = document.getElementById("productSizes");

// Create the "Add to Bag" button element
const addToBagButton = document.createElement("button");
addToBagButton.textContent = "Add to Bag";
addToBagButton.classList.add("addtobag-button", "button"); // Add CSS classes for styling

// Add a click event listener to the button
addToBagButton.addEventListener("click", () => {
  // Retrieve the product information from the page

  const productInfo = {
    id: productId,
    name: productName.textContent,
    price: productRegularPrice.textContent,
    discountedPrice:productDiscountedPrice.textContent,
    image: productImage.src,
  };

  // Check if there is an existing cart in local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add the selected product to the cart
  cart.push(productInfo);

  // Update the cart in local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Increment the count in local storage
  let itemCount = localStorage.getItem("itemCount");
  itemCount = itemCount ? parseInt(itemCount) + 1 : 1;
  localStorage.setItem("itemCount", itemCount);

  // Feedback to the user
  const confirmationMessage = `Product added to your bag!`;
  alert(confirmationMessage);
});

// Append the button to the product page
document.querySelector(".product-info-container").appendChild(addToBagButton);

// Fetch product details using the product ID
fetch(`https://api.noroff.dev/api/v1/rainy-days/${productId}`)
  .then((response) => response.json())
  .then((product) => {
    // Update the HTML elements with the retrieved data
    productImage.src = product.image;
    productImage.alt = product.title;
    productName.textContent = product.vendor;
    productDescription.textContent = product.title;
    productDiscountedPrice.textContent = `${product.discountedPrice} kr`;
    productColor.textContent = product.baseColor;

    // Check if there are available sizes
    const sizes = product.sizes;
    sizes.forEach((size) => {
      const sizeButton = document.createElement("button");
      sizeButton.textContent = size;
      sizeButton.classList.add("size-button");

      // Add a click event listener to the size button
      sizeButton.addEventListener("click", () => {
        // Handle size selection, e.g., change the style of the selected size
        // You can also use this to store the selected size for adding to the cart
        // For this example, let's just add a border to the selected size
        if (selectedSize) {
          selectedSize.classList.remove("selected-size");
        }
        sizeButton.classList.add("selected-size");
        selectedSize = sizeButton;
      });

      // Append the size button to the size options container
      productSizes.appendChild(sizeButton);
    });

    if (product.onSale) {
        productDiscountedPrice.textContent = `${product.discountedPrice} kr`;
        productRegularPrice.textContent = `${product.price} kr`;
      } else {
        productRegularPrice.style.display = `${product.price} kr`;
      }

    productDetails.textContent = product.description;
  })
  .catch((error) => {
    console.error("Error fetching product data:", error);
  });
