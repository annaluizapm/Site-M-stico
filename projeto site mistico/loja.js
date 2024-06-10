document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".button");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });

    const cartContainer = document.getElementById("cart-container");
    cartContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            removeCartItem(event);
        } else if (event.target.classList.contains("decrease-btn")) {
            updateQuantity(event, -1);
        } else if (event.target.classList.contains("increase-btn")) {
            updateQuantity(event, 1);
        }
    });

    updateCart();
});

function addToCart(event) {
    const button = event.target;
    const product = button.closest(".card");
    const productId = product.id;
    const productTitle = product.querySelector(".product-title").innerText;
    const productPrice = product.querySelector("span").innerText;

    const cartItem = {
        id: productId,
        title: productTitle,
        price: productPrice,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex === -1) {
        cart.push(cartItem);
    } else {
        cart[productIndex].quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function removeCartItem(event) {
    const button = event.target;
    const productId = button.parentElement.dataset.id;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter(item => item.id !== productId);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCart();
}

function updateQuantity(event, change) {
    const button = event.target;
    const productId = button.parentElement.dataset.id;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart[productIndex].quantity += change;
        if (cart[productIndex].quantity < 1) {
            cart[productIndex].quantity = 1;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ''; // Limpa o conteúdo atual do carrinho

    let total = 0;

    // Recupera os itens do carrinho do armazenamento local
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Adiciona os itens do carrinho à página
    cartItems.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.dataset.id = item.id;
        cartItemElement.innerHTML = `
            <span>${item.title}</span>
            <span>${item.price}</span>
            <button class="decrease-btn">-</button>
            <span>${item.quantity}</span>
            <button class="increase-btn">+</button>
            <button class="remove-btn">Remover</button>
        `;
        cartContainer.appendChild(cartItemElement);

        // Calcula o total
        total += parseFloat(item.price.replace("R$ ", "").replace(",", ".")) * item.quantity;
    });

    // Atualiza o resumo do pedido
    const subtotalElement = document.querySelector(".cart-summary span:nth-of-type(1)");
    const totalElement = document.querySelector(".cart-summary span:nth-of-type(3)");
    subtotalElement.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;
    totalElement.innerText = `R$ ${(total + 10).toFixed(2).replace(".", ",")}`; // Total + R$ 10 de frete
}
