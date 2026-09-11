/* =========================================
   GEM BY FAM
   JAVASCRIPT
========================================= */


/* =========================================
   SEARCH BOX
========================================= */

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const closeSearch = document.getElementById("closeSearch");


if (searchBtn && searchBox && searchInput) {

    searchBtn.addEventListener("click", function () {
        searchBox.classList.add("show");
        searchInput.focus();
    });

}


if (closeSearch && searchBox && searchInput) {

    closeSearch.addEventListener("click", function () {
        searchBox.classList.remove("show");
        searchInput.value = "";

        // Show all products again
        const products = document.querySelectorAll(
            ".product-card, .new-card"
        );

        products.forEach(function (product) {
            product.style.display = "";
        });
    });

}


/* =========================================
   CART
========================================= */

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

        const productName =
            button.getAttribute("data-name");

        if (!productName) return;

        cart.push(productName);

        if (cartCount) {
            cartCount.textContent = cart.length;
        }

        updateCart();

    });

});


/* SHOW CART */

if (cartBtn && cartModal) {

    cartBtn.addEventListener("click", function () {

        cartModal.classList.add("show");

        updateCart();

    });

}


/* CLOSE CART */

if (closeCart && cartModal) {

    closeCart.addEventListener("click", function () {

        cartModal.classList.remove("show");

    });

}


/* UPDATE CART */

function updateCart() {

    if (!cartItems) return;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        return;
    }

    cartItems.innerHTML = "";

    cart.forEach(function (item, index) {

        const product = document.createElement("div");
        product.className = "cart-item";

        product.innerHTML = `
            <span>${index + 1}. ${item}</span>
            <button class="remove-cart" data-index="${index}">
                ✕ Remove
            </button>
        `;

        cartItems.appendChild(product);

    });


    /* REMOVE PRODUCT */

    const removeButtons =
        document.querySelectorAll(".remove-cart");

    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(button.getAttribute("data-index"));

            cart.splice(index, 1);

            if (cartCount) {
                cartCount.textContent = cart.length;
            }

            updateCart();

        });

    });

}


/* =========================================
   IMAGE VIEW / POPUP
   PRODUCT + NEW ARRIVALS + REVIEWS
========================================= */

const allImages = document.querySelectorAll(
    ".product-image img, .new-image img, .review-card img"
);


allImages.forEach(function (image) {

    image.addEventListener("click", function () {

        const popup = document.createElement("div");

        popup.className = "image-popup";

        popup.innerHTML = `
            <button class="close-image">✕</button>
            <img src="${image.src}" alt="${image.alt}">
        `;

        document.body.appendChild(popup);


        const closeImage =
            popup.querySelector(".close-image");


        if (closeImage) {

            closeImage.addEventListener("click", function () {
                popup.remove();
            });

        }


        popup.addEventListener("click", function (e) {

            if (e.target === popup) {
                popup.remove();
            }

        });

    });

});


/* =========================================
   HERO BANNER SLIDER
========================================= */

const slides =
    document.querySelectorAll(".hero-slide");

const dots =
    document.querySelectorAll(".dot");

let currentSlide = 0;


function showSlide(index) {

    if (slides.length === 0) return;

    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function (dot) {
        dot.classList.remove("active-dot");
    });


    if (slides[index]) {
        slides[index].classList.add("active");
    }

    if (dots[index]) {
        dots[index].classList.add("active-dot");
    }

}


function nextSlide() {

    if (slides.length === 0) return;

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

}


if (slides.length > 0) {

    showSlide(0);

    setInterval(nextSlide, 3000);

}


dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        currentSlide = index;

        showSlide(currentSlide);

    });

});


/* =========================================
   PRODUCT SEARCH
   INSTANT SEARCH
========================================= */

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value.toLowerCase().trim();


        const products = document.querySelectorAll(
            ".product-card, .new-card"
        );


        products.forEach(function (product) {

            const title =
                product.querySelector("h3");


            if (!title) return;


            const productName =
                title.textContent
                    .toLowerCase()
                    .trim();


            if (
                searchText === "" ||
                productName.includes(searchText)
            ) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}


/* =========================================
   NEW ARRIVALS ARROWS
========================================= */

const newArrivalsContainer =
    document.getElementById("newArrivalsContainer");

const newLeft =
    document.getElementById("newLeft");

const newRight =
    document.getElementById("newRight");


if (
    newArrivalsContainer &&
    newLeft &&
    newRight
) {


    newRight.addEventListener("click", function () {

        newArrivalsContainer.scrollLeft += 250;

    });


    newLeft.addEventListener("click", function () {

        newArrivalsContainer.scrollLeft -= 250;

    });

}
/* =========================================
   PRODUCT SEARCH - INSTANT + AUTO SHOW
========================================= */

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = this.value.toLowerCase().trim();

        const products = document.querySelectorAll(
            ".product-card, .new-card"
        );

        let firstMatch = null;

        products.forEach(function (product) {

            const title = product.querySelector("h3");

            if (!title) return;

            const productName =
                title.textContent.toLowerCase().trim();

            if (
                searchText === "" ||
                productName.includes(searchText)
            ) {
                product.style.display = "";

                if (searchText !== "" && firstMatch === null) {
                    firstMatch = product;
                }

            } else {
                product.style.display = "none";
            }

        });

        /* Search result ko automatically screen par lao */
        if (firstMatch && searchText !== "") {

            const top =
                firstMatch.getBoundingClientRect().top +
                window.scrollY -
                120;

            window.scrollTo({
                top: top,
                behavior: "smooth"
            });

        }

    });

}