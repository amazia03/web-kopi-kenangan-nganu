// toggle class active untuk hambourger menu
const navbarnav = document.querySelector(".navbar-nav");
// ketika hamburger mwnu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarnav.classList.toggle("active");
};

// toggle class active untuk search form
const searchform = document.querySelector(".search-form");
const searchbox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchform.classList.toggle("active");
  searchbox.focus();
  e.preventDefault();
};

// toggle class active untuk shopping cart
const shoppingcart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingcart.classList.toggle("active");
  e.preventDefault();
};
// klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");
document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarnav.contains(e.target)) {
    navbarnav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchform.contains(e.target)) {
    searchform.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingcart.contains(e.target)) {
    shoppingcart.classList.remove("active");
  }
});

// modalbox
const itemdetailmodal = document.querySelector("#item-detail-modal");
const itemdetailbuttons = document.querySelectorAll(".item-detail-button");

itemdetailbuttons.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    itemdetailmodal.style.display = "flex";
  };
});

// click close tombol modal
document.querySelector("#item-detail-modal .close-icon").onclick = (e) => {
  e.preventDefault();
  itemdetailmodal.style.display = "none";
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemdetailmodal) {
    itemdetailmodal.style.display = "none";
  }
};
