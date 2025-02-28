document.addEventListener("DOMContentLoaded", () => {
    loadCartFromStorage();
});

// Cart data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart function
function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
}

// Update cart display
function updateCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = 0;
    let cartCount = 0;

    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        cartCount += item.quantity;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="decreaseQuantity(${index})">-</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("total-price").innerText = totalPrice;
    document.getElementById("cart-count").innerText = cartCount;

    // Save cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Clear cart
function clearCart() {
    cart = [];
    updateCart();
}

// Load cart from localStorage
function loadCartFromStorage() {
    updateCart();
}

// Toggle cart visibility
document.getElementById("cart-icon").addEventListener("click", () => {
    document.getElementById("cart").classList.toggle("show");
});
