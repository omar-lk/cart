console.log("ready");
var AjouterAuPanieButtons = document.getElementsByClassName(
  "add-article-button"
);
for (var i = 0; i < AjouterAuPanieButtons.length; i++) {
  var button = AjouterAuPanieButtons[i];
  button.addEventListener("click", ajouteraupanieclick);
}

var quantityInputs = document.getElementsByClassName("panie-quantity-input");
for (var i = 0; i < quantityInputs.length; i++) {
  console.log("boucle");
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

var removeCartItemButtons = document.getElementsByClassName("supprimer");
for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  console.log("quantitéchange");
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

//   document
//     .getElementsByClassName("btn-purchase")[0]
//     .addEventListener("click", purchaseClicked);

function ajouteraupanieclick(event) {
  console.log("panieclick");
  var button = event.target;
  var shopItem = button.parentElement.parentElement;

  var title = shopItem.getElementsByClassName("produit-titre")[0].innerText;

  var price = shopItem.getElementsByClassName("produit-prix")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("produit-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("panie-ligne");
  var cartItems = document.getElementsByClassName("panie-article")[0];
  var cartItemNames = cartItems.getElementsByClassName("panie-article-titre");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
        <div class="panie-article panie-colonne">
            <img class="panie-article-image" src="${imageSrc}" width="100" height="100">
            <span class="panie-article-titre">${title}</span>
        </div>
        <span class="panie-prix panie-colonne">${price}</span>
        <div class="panie-quantite panie-colonne">
            <input class="panie-quantity-input" type="number" value="1">
            <button class="supprimer" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("supprimer")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("panie-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  console.log("update total panie");
  var cartItemContainer = document.getElementsByClassName("panie-article")[0];
  console.log(cartItemContainer);
  var cartRows = cartItemContainer.getElementsByClassName("panie-ligne");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("panie-prix")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "panie-quantity-input"
    )[0];
    console.log(priceElement);
    var price = parseFloat(priceElement.innerText.replace("dh", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("panie-total-prix")[0].innerText =
    "dh" + total;
}
