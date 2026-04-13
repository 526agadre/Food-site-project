// 24 Authentic Chinese Dishes
const dishes = [
    { id: 1, name: "Spring Rolls", price: 8.99, image: "https://images.unsplash.com/photo-1544333346-64e4fe18dec7?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Dumplings", price: 12.50, image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Mapo Tofu", price: 14.50, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400" },
    { id: 4, name: "Fried Rice", price: 10.99, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400" },
    { id: 5, name: "Stir-fry Eggplant", price: 13.75, image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=600" },
    { id: 6, name: "Lo Mein", price: 12.50, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400" },
    { id: 7, name: "Peking Duck", price: 38.00, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600" },
    { id: 8, name: "Kung Pao Chicken", price: 22.00, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600" },
    { id: 9, name: "Szechuan Beef", price: 24.50, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400" },
    { id: 10, name: "Wonton Soup", price: 11.00, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600" },
    { id: 11, name: "Hot and Sour Soup", price: 10.50, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600" },
    { id: 12, name: "General Tso's Chicken", price: 21.00, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600" },
    { id: 13, name: "Sweet and Sour Pork", price: 19.50, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600" },
    { id: 14, name: "Scallion Pancake", price: 8.50, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=600" },
    { id: 15, name: "Char Siu", price: 25.00, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600" },
    { id: 16, name: "Xiao Long Bao", price: 15.00, image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=600" },
    { id: 17, name: "Dan Dan Noodles", price: 16.00, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600" },
    { id: 18, name: "Beef with Broccoli", price: 22.50, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600" },
    { id: 19, name: "Shrimp Toast", price: 14.00, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=600" },
    { id: 20, name: "Egg Drop Soup", price: 9.99, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600" },
    { id: 21, name: "Moo Shu Pork", price: 18.00, image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=600" },
    { id: 22, name: "Orange Chicken", price: 20.50, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600" },
    { id: 23, name: "Sesame Chicken", price: 20.00, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600" },
    { id: 24, name: "Chow Mein", price: 17.50, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const menuGrid = document.getElementById('menu-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutError = document.getElementById('checkout-error');
const serverBaseUrl = 'http://localhost:3000';

// Render Menu
function renderMenu() {
    menuGrid.innerHTML = dishes.map(dish => `
        <div class="grid-item">
            <img src="${dish.image}" alt="${dish.name}">
            <div class="dish-info">
                <h3>${dish.name}</h3>
                <p>$${dish.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${dish.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
window.addToCart = (id) => {
    const dish = dishes.find(d => d.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...dish, quantity: 1 });
    }

    updateCart();
    cartSidebar.classList.add('open');
};

// Update Cart
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Change Quantity
window.changeQuantity = (id, delta) => {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += delta;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }
    updateCart();
};

function showCheckoutError(message) {
    if (checkoutError) {
        checkoutError.textContent = message;
    } else {
        console.error('Checkout error:', message);
    }
}

function clearCheckoutError() {
    if (checkoutError) {
        checkoutError.textContent = '';
    }
}

// Toggle Cart Sidebar
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.toggle('open');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Real Checkout Implementation
checkoutBtn.addEventListener('click', async () => {
    clearCheckoutError();

    if (cart.length === 0) {
        showCheckoutError('Your cart is empty. Add items before checking out.');
        return;
    }

    try {
        const response = await fetch(`${serverBaseUrl}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cart })
        });

        const result = await response.json();

        if (!response.ok) {
            const message = result?.error || `Checkout service responded with status ${response.status}.`;
            showCheckoutError(message);
            console.error('Checkout service error:', message);
            return;
        }

        const { checkoutUrl } = result;

        if (!checkoutUrl) {
            showCheckoutError('Checkout URL not returned by server.');
            return;
        }

        const popup = window.open(checkoutUrl, 'StripeCheckout', 'width=500,height=700,toolbar=no,menubar=no,scrollbars=yes');
        if (!popup) {
            window.location.href = checkoutUrl;
        }
    } catch (error) {
        showCheckoutError('Unable to contact the checkout server at http://localhost:3000. Make sure npm start is running and the Node.js server is active.');
        console.error('Checkout error:', error);
    }
});

// Initial Render
renderMenu();
updateCart();
