let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Products array with image URLs
const products = [
  { id: 1, name: 'Teal Diamond Ring', price: 2100, image: '/images/ring/R1.jpg' },
  { id: 2, name: 'Snow Diamond Ring', price: 1950, image: '/images/ring/R2.jpg' },
  { id: 3, name: 'Lori Diamond Ring', price: 1800, image: '/images/ring/R3.jpg' },
  { id: 4, name: 'Laven Diamond Ring', price: 2250, image: '/images/ring/R4.jpg' },
  { id: 5, name: 'Pearly', price: 980, image: '/images/earing/E1.jpg' },
  { id: 6, name: 'Green Diamond', price: 1500, image: '/images/earing/E2.jpg' },
  { id: 7, name: 'Over Pearly', price: 300, image: '/images/earing/E3.jpg' },
  { id: 8, name: 'Golden Ear', price: 950, image: '/images/earing/E4.jpg' },
  { id: 9, name: 'Butterfly Pearly', price: 1500, image: '/images/necklace/N1.jpg' },
  { id: 10, name: 'Green Elmasy', price: 2900, image: '/images/necklace/N2.jpg' },
  { id: 11, name: 'Pearly Heart', price: 1500, image: './images/necklace/N3.jpg' },
  { id: 12, name: 'Laven Pearly', price: 900, image: '/images/necklace/N4.jpg' },
];

// Handle mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
  });
}

// Function to create and show the alert
function showAlert(productName) {
  const alertDiv = document.createElement('div');
  alertDiv.role = 'alert';
  alertDiv.className = 'rounded-xl border border-gray-100 bg-white p-4 fixed top-5 right-5 z-50 shadow-lg';

  alertDiv.innerHTML = `
    <div class="flex items-start gap-4">
      <span class="text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </span>

      <div class="flex-1">
        <strong class="block font-medium text-gray-900">Added to cart</strong>
        <p class="mt-1 text-sm text-gray-700">${productName} has been added to your cart.</p>
      </div>

      <button class="text-gray-500 transition hover:text-gray-600" onclick="this.closest('div').remove()">
        <span class="sr-only">Dismiss popup</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  `;

  // Append the alert to the body
  document.body.appendChild(alertDiv);

  // Optionally, set a timeout to remove the alert after a few seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 5000); // Alert disappears after 5 seconds
}

// Modify your addToCart function to call showAlert
function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  if (!product) {
    alert("Product not found.");
    return;
  }

  const existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1; // Increase quantity if already in cart
  } else {
    cart.push({ ...product, quantity: 1 }); // Add product with quantity
  }

  localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to local storage
  showAlert(product.name); // Show the custom alert with the product name
  updateCartDisplay(); // Update cart display
}



// Modify the updateCartDisplay function to reflect the changes
function updateCartDisplay() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  const checkoutButton = document.getElementById('checkout-button');
  const cartCountElement = document.getElementById('cart-count');
  const emptyCartImage = document.getElementById('empty-cart-image');

  if (!cartItemsDiv || !cartCountElement || !totalElement) {
    console.warn("Cart elements not found in HTML.");
    return;
  }

  cartItemsDiv.innerHTML = ''; // Clear previous cart items
  let total = 0;

  cart.forEach(product => {
    const item = document.createElement('li');
    item.className = 'flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-4';

    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-16 h-16 rounded object-cover" />

      <div class="flex-1">
        <h3 class="text-sm text-gray-900">${product.name}</h3>
        <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
          <div><dt class="inline">Price:</dt><dd class="inline">${product.price} $</dd></div>
          <div><dt class="inline">Quantity:</dt><dd class="inline">${product.quantity}</dd></div>
        </dl>
      </div>

      <div class="flex items-center justify-end gap-2">
        <input 
          type="number" 
          value="${product.quantity}" 
          min="1" 
          class="w-12 h-8 rounded text-center text-xs border-gray-200 bg-gray-50"
          onchange="updateQuantity(${product.id}, this.value)" 
        />
        
        <button class="text-gray-600 hover:text-red-600 transition" onclick="removeFromCart(${product.id})">
          <span class="sr-only">Remove item</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
          </svg>
        </button>
      </div>
    `;

    cartItemsDiv.appendChild(item);
    total += product.price * product.quantity;
  });

  totalElement.innerText = `Total: ${total} $`;
  cartCountElement.innerText = cart.reduce((sum, product) => sum + product.quantity, 0);

  if (checkoutButton) {
    checkoutButton.disabled = cart.length === 0;
  }
   // If the cart is empty, display the empty cart message and image
   if (cart.length === 0) {
    cartItemsDiv.innerHTML = `
      <div class="flex justify-center items-center">
        <img id="empty-cart-image" src="/images/cart.jpg" alt="Your cart is empty" class="w-1/2 max-w-sm mx-auto"/>
        <p class="text-center text-2xl text-gray-700 mt-4">Your cart is currently empty. Add items to your cart!</p>
      </div>
    `;
    totalElement.innerText = 'Total: 0 $';
    cartCountElement.innerText = '0';
    if (checkoutButton) {
      checkoutButton.disabled = true;  // Disable checkout if cart is empty
    }
    return;
  }
}


// Function to update product quantity
function updateQuantity(productId, newQuantity) {
  const product = cart.find(item => item.id === productId);
  if (product) {
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      product.quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
    }
  }
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Function to checkout
function checkout() {
  if (cart.length === 0) return;

  const productDetails = cart.map(product => `${product.name} - ${product.price * product.quantity} $`).join(', ');
  const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shippingPrice = 50;
  const grandTotal = total + shippingPrice;

  const message = `Hello! Thank you for choosing Elmasya. Here are the details of your order:\n\n${productDetails}.\n\nTotal Amount: ${total} $\nShipping Cost: ${shippingPrice} $\nGrand Total: ${grandTotal} $.\n\nPlease confirm your order, and we will contact you shortly for delivery details.`;

  const phoneNumber = '+212762752337';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, '_blank');
}

// Call this function on page load to display cart items
document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', checkout);
  }
});


// script.js

document.getElementById('menu-button').addEventListener('click', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');  // Toggle the 'hidden' class
});



document.addEventListener("DOMContentLoaded", function() {
  // Select the CTA section
  const ctaSection = document.getElementById("cta-section");

  // Show the CTA section after 3 seconds
  setTimeout(() => {
    ctaSection.style.display = "flex";
    
    // Hide the CTA section after an additional 3 seconds
    setTimeout(() => {
      ctaSection.style.display = "none";
    }, 5000);
    
  }, 3000);
});








