class Product {
  constructor(name, price, descriptionShort, descriptionFull, image) {
    this.name = name;
    this.price = price;
    this.descriptionShort = descriptionShort;
    this.descriptionFull = descriptionFull;
    this.image = image;
  }
}
class CartItem {
  constructor(product, amount) {
    this.product = product;
    this.amount = amount;
  }
}
const products = [
  new Product(
    "Little&Bigger Klösträd",
    899.99,
    "Klösträd i flera nivåer, med en mysig sovplats högst upp. 95 cm högt.",
    "Detta klösträdet är enkelt och stilrent, och får plats i de flesta hem! Klösträdet har flera platåer i olika höjd som katten kan sitta och speja ifrån, och högst upp finns en mysig sovplats! Från översta delen hänger en boll som kissen kan busa med! Storlek: 95 x 50 x 50 cm",
    "images/products/product1.webp"
  ),
  new Product(
    "Trixie Parla Klöspelare",
    229.99,
    "Stabil klöspelare för busiga katter! Pelaren är 62 cm hög och lindad med sisalrep.",
    "Denna snygga, stilrena och praktiska klöspelare är 62 cm hög och passar utmärkt för alla mini-tigrar som vill vässa sina klor! Den stabila bottenplattan är täckt av mjuk, grå plysch och själva pelaren är lindad med naturligt sisalrep. Storlek: 62cm hög.",
    "images/products/product2.webp"
  ),
  new Product(
    "Basic Bärväska",
    399.99,
    "Basic Bärväska är en lätt och smidig väska för transport av ditt djur!",
    "Med sidor av transparent mesh som gör att ditt djur kan se ut och får därför en känsla av ökad kontroll. Tillverkad av slitstarkt och vattentätt tyg och har avtagbart axelband och kraftigt handtag. Väskan är lämplig att använda till hundar, katter eller smådjur som väger ca 4 till 5 kg. Den går även enkelt att fälla ihop för praktisk förvaring. Storlek 45 x 27 x 26 cm (L x B x H), vikt 950 gram.",
    "images/products/product3.webp"
  ),
  new Product(
    "Kick Fish",
    99.99,
    "Stor verklighetstrogen sprattlande leksaksfisk som du enkelt laddar via USB!",
    "Framtidens kattleksaker är här! Denna stora verklighetstrogna fisken innehåller kattmynta och sprattlar när katten rör vid den - kan det bli mer spännande för lekfulla kissar? Vi tror inte det! Little&Bigger Kick Fish Sprattlande Fisk laddas enkelt via USB och kommer i två olika färger. Välj mellan blå och gul.",
    "images/products/product4.webp"
  ),
  new Product(
    "Torkad Kattmynta 4 g",
    49.99,
    "Denna från Yeowww! är helt organisk och odlad utan kemikalier och bekämpningsmedel.",
    "Kattmynta kommer från bladen från Nepeta Cataria-plantan och är en ren och ofarlig naturprodukt. Denna från Yeowww! är dessutom helt organiskt odlad, utan varken kemikalier eller bekämpningsmedel. De flesta katter reagerar på kattmynta, men det finns undantag. Har din leksak från Yeowww! gått sönder? Yeowww-leksakerna är riktigt tåliga, men det finns starka katter därute. Om leksaken går sönder, kan du fylla den med ny kattmynta från och sy ihop den igen. Lätt som en plätt!",
    "images/products/product5.webp"
  ),
  new Product(
    "Furminator",
    279.99,
    "Tar enkelt och effektivt bort löst hår och underull utan att skada pälsen! Anpassad för katter med lång päls.",
    "Den kraftfulla Furminatorn minskar mängden av löst hår som annars gärna fastnar på möbler, gardiner eller på dina kläder. Furminatorn avlägsnar mycket effektivt löst hår och underull utan att skada pälsen eller den känsliga huden. Det ergonomiska gummihandtaget och den praktiska funktionen som enkelt avlägsnar den avborstade pälsen från skäret gör Furminatorn enkel och praktisk att använda.",
    "images/products/product6.webp"
  ),
];

const shopTemplate = document.getElementById("product-col-template");
let productCount = 0;

if (shopTemplate) {
  setupShop();
  setupCart();
  getCartProductCount();
}

function setupCart() {
  const list = document.querySelector(`#cart-body`);
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }
  const cart = getCartItems();
  if (!cart) {
    return;
  }

  for (const cartItem of cart) {
    const tableRowElement = document.createElement("tr");

    const nameElement = document.createElement("td");
    const amountElement = document.createElement("td");
    const priceElement = document.createElement("td");
    const totalPriceElement = document.createElement("td");

    nameElement.innerText = cartItem.product.name;
    amountElement.innerText = cartItem.amount;
    priceElement.innerText = cartItem.product.price;
    totalPriceElement.innerText = (
      cartItem.product.price * cartItem.amount
    ).toFixed(2);

    tableRowElement.append(nameElement);
    tableRowElement.append(amountElement);
    tableRowElement.append(priceElement);
    tableRowElement.append(totalPriceElement);
    tableRowElement.onclick = () => {
      removeFromCartClick(cartItem.product);
    };

    list.append(tableRowElement);
    updateTotalPrice();
  }
}

function removeFromCartClick(product) {
  const cart = JSON.parse(localStorage.getItem(`shoppingCart`));
  index = cart.findIndex((c) => c.product.name === product.name);
  cart[index].amount--;
  if (cart[index].amount === 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  setupCart();
  getCartProductCount();
  updateTotalPrice();
}

function setupShop() {
  const modals = [];
  const list = document.getElementById("product-list-container");

  for (const product of products) {
    productCount++;
    const item = shopTemplate.content.cloneNode(true);
    item.querySelector(`#product-modal-title-id`).innerText = product.name;
    item.querySelector(`#product-card-header`).innerText = product.name;
    item.querySelector(`#product-card-price`).innerText = product.price;
    item.querySelector(`#product-modal-price`).innerText = product.price;
    item.querySelector(`#product-description-short`).innerText =
      product.descriptionShort;
    item.querySelector(`#product-description-full`).innerText =
      product.descriptionFull;
    item.querySelector(`#product-thumbnail`).src = product.image;
    product.descriptionShort;
    item.querySelector(`#product-image`).src = product.image;
    item
      .querySelector(`#product-modal-button`)
      .setAttribute(`data-bs-target`, `#product-modal-id${productCount}`);
    item.querySelector(
      `#product-modal-id`
    ).id = `product-modal-id${productCount}`;
    item.querySelector(
      `#product-modal-title-id`
    ).id = `product-modal-title-id${productCount}`;
    item.querySelector(
      `#product-modal-button`
    ).id = `product-modal-button${productCount}`;
    item.querySelector(`#add-to-cart-button`).onclick = () => {
      addToCartClick(product);
    };
    item.querySelector(`#add-to-cart-button-modal`).onclick = () => {
      addToCartClick(product);
    };
    list.append(item);
    const newModal = new bootstrap.Modal(
      document.getElementById(`product-modal-id${productCount}`)
    );

    modals.push(newModal);
  }
}

function addToCartClick(product) {
  const cartJson = localStorage.getItem(`shoppingCart`);
  const cartItem = new CartItem(product, 1);

  if (cartJson) {
    const cart = JSON.parse(cartJson);

    if (cart.some((c) => c.product.name === product.name)) {
      index = cart.findIndex((c) => c.product.name === product.name);
      cart[index].amount++;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  } else {
    const cart = [];
    cart.push(cartItem);
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }
  getCartProductCount();
  setupCart();
  updateTotalPrice();
}

function getCartProductCount() {
  const cartJson = localStorage.getItem(`shoppingCart`);
  let cartProductCount = 0;
  if (cartJson) {
    const cart = JSON.parse(cartJson);
    for (const cartItem of cart) {
      cartProductCount += cartItem.amount;
    }
  }
  document.querySelector(`#cart-product-count`).innerText = cartProductCount;
  document.querySelector(`#cart-product-count-badge`).innerText =
    cartProductCount;
}
function getCartItems() {
  const cartJson = localStorage.getItem(`shoppingCart`);
  return JSON.parse(cartJson);
}
function updateTotalPrice() {
  const cart = getCartItems();
  let totalPrice = 0;
  for (const cartItem of cart) {
    totalPrice += cartItem.product.price * cartItem.amount;
  }
  totalPrice.toFixed(2);
  document.getElementById("total-price-of-cart").innerText = totalPrice;
}
function confirmOrderClick() {
  const cart = getCartItems();
  if (!cart[0]) {
    window.alert("Your cart is empty. No order has been placed.");
    return;
  }

  while (cart[0]) {
    cart.pop();
  }
  window.alert(
    "Your order has been confirmed. Thank you for shopping with us!"
  );
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  getCartProductCount();
  setupCart();
  updateTotalPrice();
}
