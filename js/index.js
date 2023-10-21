// Fetch request to the API
fetch('https://api.noroff.dev/api/v1/rainy-days')
  .then(response => response.json())
  .then(data => {
    // Select the container element
    const container = document.querySelector('.scott-container');

    // Filter products where "onsale" is true
    const onSaleProducts = data.filter(product => product.onSale === true);

    // Populate HTML elements for on-sale products
    onSaleProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('scott-product');

      const productImage = document.createElement('img');
      productImage.classList.add('scott-img');
      productImage.src = product.image;
      productImage.alt = 'Sale_Product';
      
      const priceParagraph = document.createElement('p');
      priceParagraph.classList.add('scott-price');
      priceParagraph.textContent = product.price;

      const productLink = document.createElement('a');
      productLink.href = `product.html?id=${product.id}`;
      productLink.textContent = 'View Details';

      productDiv.appendChild(productImage);
      productDiv.appendChild(priceParagraph);
      productDiv.appendChild(productLink);

      container.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
