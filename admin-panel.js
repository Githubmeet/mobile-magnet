// Array to store product data
let products = [];

// Retrieve products from localStorage on page load
window.addEventListener('load', () => {
  const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
  products = storedProducts;
  renderProductTable();
});

// Function to add a new product
function addProduct(event) {
  event.preventDefault();

  const productName = document.getElementById('productName').value.trim();
  const productDescription = document.getElementById('productDescription').value.trim();
  const productPrice = document.getElementById('productPrice').value;
  const productImage = document.getElementById('productImage').files[0];

  if (!productName || !productDescription || !productPrice || !productImage) {
    alert('Please fill in all fields');
    return;
  }

  const product = {
    id: Date.now().toString(), // Generate a unique ID
    name: productName,
    description: productDescription,
    price: productPrice,
    image: URL.createObjectURL(productImage)
  };

  products.push(product);

  // Clear the form inputs
  document.getElementById('productForm').reset();

  // Render the product table
  renderProductTable();

  // Store the products in localStorage
  localStorage.setItem('products', JSON.stringify(products));
}

// Function to render the product table
function renderProductTable() {
  const tableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = product.name;
    row.appendChild(nameCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = product.description;
    row.appendChild(descriptionCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = `$${product.price}`;
    row.appendChild(priceCell);

    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.src = product.image;
    image.style.maxWidth = '100px';
    imageCell.appendChild(image);
    row.appendChild(imageCell);

    const actionsCell = document.createElement('td');
    const updateButton = document.createElement('button');
    updateButton.innerHTML = '<i class="fas fa-edit"></i>';
    updateButton.onclick = editProduct.bind(null, i);
    actionsCell.appendChild(updateButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = deleteProduct.bind(null, i);
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  }

  // Enable/disable update and delete buttons
  const updateProductBtn = document.getElementById('updateProductBtn');
  const deleteProductBtn = document.getElementById('deleteProductBtn');
  updateProductBtn.disabled = products.length === 0;
  deleteProductBtn.disabled = products.length === 0;
}

// Function to edit a product
function editProduct(index) {
  const product = products[index];

  const productNameInput = document.getElementById('productName');
  const productDescriptionInput = document.getElementById('productDescription');
  const productPriceInput = document.getElementById('productPrice');
  const productImageInput = document.getElementById('productImage');

  productNameInput.value = product.name;
  productDescriptionInput.value = product.description;
  productPriceInput.value = product.price;
  productImageInput.value = ''; // Clear the file input

  const updateProductBtn = document.getElementById('updateProductBtn');
  const deleteProductBtn = document.getElementById('deleteProductBtn');
  updateProductBtn.disabled = false;
  deleteProductBtn.disabled = false;

  updateProductBtn.onclick = () => updateProduct(index);
  deleteProductBtn.onclick = () => deleteProduct(index);
}

// Function to update a product
function updateProduct(index) {
  const productName = document.getElementById('productName').value.trim();
  const productDescription = document.getElementById('productDescription').value.trim();
  const productPrice = document.getElementById('productPrice').value;
  const productImage = document.getElementById('productImage').files[0];

  if (!productName || !productDescription || !productPrice || !productImage) {
    alert('Please fill in all fields');
    return;
  }

  const updatedProduct = {
    ...products[index],
    name: productName,
    description: productDescription,
    price: productPrice,
    image: URL.createObjectURL(productImage)
  };

  products[index] = updatedProduct;

  // Clear the form inputs
  document.getElementById('productForm').reset();

  // Render the product table
  renderProductTable();

  // Store the updated products in localStorage
  localStorage.setItem('products', JSON.stringify(products));
}

// Function to delete a product
function deleteProduct(index) {
  const confirmDelete = confirm('Are you sure you want to delete this product?');
  if (confirmDelete) {
    products.splice(index, 1);
    renderProductTable();

    // Store the updated products in localStorage
    localStorage.setItem('products', JSON.stringify(products));
  }
}

// Add event listener for the form submit
const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', addProduct);