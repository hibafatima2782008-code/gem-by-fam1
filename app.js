const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const closeSearch = document.getElementById("closeSearch");

searchBtn.addEventListener("click", function () {
    searchBox.classList.add("show");
    searchInput.focus();
});

closeSearch.addEventListener("click", function () {
    searchBox.classList.remove("show");
    searchInput.value = "";
});
/* =========================
   CART
========================= */

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");

const addCartButtons = document.querySelectorAll(".add-cart");


/* ADD TO CART */

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productName = button.getAttribute("data-name");

        cart.push(productName);

        cartCount.textContent = cart.length;

        updateCart();

    });

});


/* SHOW CART */

cartBtn.addEventListener("click", function () {

    cartModal.classList.add("show");

    updateCart();

});


/* CLOSE CART */

closeCart.addEventListener("click", function () {

    cartModal.classList.remove("show");

});


/* UPDATE CART */

function updateCart() {

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        return;
    }

    cartItems.innerHTML = "";

    cart.forEach(function (item, index) {

        const product = document.createElement("p");

        product.textContent = (index + 1) + ". " + item;

        cartItems.appendChild(product);

    });

}
/* =========================
   PRODUCT IMAGE POPUP
========================= */

const productImages = document.querySelectorAll(".product-image img, .review-card img");

productImages.forEach(function (image) {

    image.addEventListener("click", function () {

        const popup = document.createElement("div");

        popup.className = "image-popup";

        popup.innerHTML = `
            <button class="close-image">✕</button>
            <img src="${image.src}" alt="${image.alt}">
        `;

        document.body.appendChild(popup);

        popup.querySelector(".close-image").addEventListener("click", function () {
            popup.remove();
        });

        popup.addEventListener("click", function (e) {
            if (e.target === popup) {
                popup.remove();
            }
        });

    });

});
/* =========================
   HERO BANNER SLIDER
========================= */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function(dot) {
        dot.classList.remove("active-dot");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active-dot");

}

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}


/* Automatically change banner every  seconds */

setInterval(nextSlide, 3000);


/* Dots click */

dots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        currentSlide = index;
        showSlide(currentSlide);

    });

});
/* =========================
   PRODUCT SEARCH
========================= */

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase().trim();

    const products = document.querySelectorAll(".product-card");

    products.forEach(function (product) {

        const productName = product
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (productName.includes(searchText)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });

});
