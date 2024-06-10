document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".button");
    for (let button of addToCartButtons) {
        button.addEventListener("click", addToCart);
    }
});

function addToCart(event) {
    const button = event.target;
    const productElement = button.parentElement.parentElement;
    const product = {
        id: productElement.id,
        image: productElement.querySelector(".product-image").src,
        title: productElement.querySelector(".product-title").innerText,
        price: productElement.querySelector("span").innerText,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.id === product.id);
    
    if (productIndex === -1) {
        cart.push(product);
    } else {
        cart[productIndex].quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} foi adicionado ao carrinho.`);
}
