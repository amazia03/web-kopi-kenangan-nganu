document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "robusta knd nganu", img: "1.jpg", price: 1000000 },
      { id: 2, name: "arabika gsng nganu", img: "2.jpg", price: 800000 },
      { id: 3, name: "robusta tmg nganu", img: "3.jpg", price: 7500000 },
      { id: 4, name: "robusta prk nganu", img: "4.jpg", price: 860000 },
      { id: 5, name: "robusta wnsb nganu", img: "5.jpg", price: 88888 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada /cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // bila barang sudah ada di card  apakah barang sudah beda atau sama denagn ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada,tambah quantity dan totalnnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang  mau di remove berdasrkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari satu
      if (cartItem.quantity > 1) {
        // telusuri satu satu
        this.items = this.items.map((item) => {
          // jika barang yang bukan di click
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa satu
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.lenght != 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika data check out diclick
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open("http://wa.me/6285876983793?text=" + encodeURI(message));
});

// format pesan whatsapp
const formatMessage = (obj) => {
  return `data customer
    nama:${obj.name}
    email:${obj.email}
    No hp:${obj.phone}
    data pesanan
    ${JSON.parse(obj.items).map(
      (item) => `${item.name} (${item.quantity} * ${rupiah(item.total)})\n`
    )}
    TOTAL:${rupiah(obj.total)}
    TERIMA KASIH.`;
};
// conversi kerupih
const rupiah = (Number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number);
};
