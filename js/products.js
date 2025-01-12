// API endpoint
const apiUrl = "https://v2.api.noroff.dev/rainy-days";

// Select the products container
const productsContainer = document.querySelector(".products_container");

// Show loading indicator initially
const loadingIndicator = document.getElementById("loading-indicator");
loadingIndicator.style.display = "block";

// Fetch all products from the API
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  })
  .then((data) => {
    const products = data.data; // Extract product array
    renderProducts(products); // Render products to the page
    loadingIndicator.style.display = "none"; // Hide loading indicator
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    loadingIndicator.style.display = "none"; // Hide loading indicator
    productsContainer.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
  });

// Function to render products
function renderProducts(products) {
  productsContainer.innerHTML = ""; // Clear existing content

  products.forEach((product) => {
    // Create product card
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // Create image
    const productImage = document.createElement("img");
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productImage.classList.add("product-img");

    // Create title
    const productTitle = document.createElement("h3");
    productTitle.textContent = product.title;

    // Create price
    const productPrice = document.createElement("p");
    if (product.onSale) {
      productPrice.innerHTML = `<span class="product-discountedPrice">${product.discountedPrice} kr</span> <s>${product.price} kr</s>`;
    } else {
      productPrice.textContent = `${product.price} kr`;
    }

    // Create "View Details" button
    const viewDetailsButton = document.createElement("a");
    viewDetailsButton.href = `product.html?id=${product.id}`;
    viewDetailsButton.textContent = "View Details";
    viewDetailsButton.classList.add("viewdetails");

    // Append elements to product card
    productDiv.appendChild(productImage);
    productDiv.appendChild(productTitle);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(viewDetailsButton);

    // Append product card to container
    productsContainer.appendChild(productDiv);
  });
}
