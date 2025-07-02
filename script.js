// Smooth scroll for anchor links
if (document.querySelectorAll('a[href^="#"]').length) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Scroll-to-top button
const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = function() {
  if (scrollBtn) scrollBtn.style.display = (window.scrollY > 200) ? 'block' : 'none';
};
if (scrollBtn) {
  scrollBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

// Order form confirmation
const orderForm = document.querySelector('.order-form');
if (orderForm) {
  orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your order! We will contact you soon.');
    this.reset();
  });
}

// Shopping Cart Functionality
let cart = [];

function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartModal() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} x ${item.qty} - Rs. ${item.price * item.qty} <button class='remove-item' data-idx='${idx}'>Remove</button>`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = `Total: Rs. ${total}`;
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', function() {
    const name = this.getAttribute('data-name');
    const price = parseInt(this.getAttribute('data-price'));
    const found = cart.find(item => item.name === name);
    if (found) {
      found.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    updateCartCount();
    updateCartModal();
  });
});

document.getElementById('cartBtn').onclick = function() {
  document.getElementById('cartModal').style.display = 'block';
  updateCartModal();
};
document.getElementById('closeCart').onclick = function() {
  document.getElementById('cartModal').style.display = 'none';
};
document.getElementById('cartItems').onclick = function(e) {
  if (e.target.classList.contains('remove-item')) {
    const idx = parseInt(e.target.getAttribute('data-idx'));
    cart.splice(idx, 1);
    updateCartCount();
    updateCartModal();
  }
};
document.getElementById('checkoutBtn').onclick = function() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Thank you for your purchase!');
  cart = [];
  updateCartCount();
  updateCartModal();
  document.getElementById('cartModal').style.display = 'none';
}; 