var cartSection = $('#cart');
console.log(cartSection)

var totalCost = 0;

var myLocalStorageData = JSON.parse(window.localStorage.getItem('product-list'));
console.log(myLocalStorageData);

for (var i = 0; i < myLocalStorageData.length; i++) {
    subTotal = myLocalStorageData[i].count * myLocalStorageData[i].price;
    totalCost = subTotal + totalCost;
}

var checkoutTemplate = `
<h1>Checkout</h1>
<div class="cart-container">
   <div class="left-side">
     <p>Total Items: <span id="number-of-item">${myLocalStorageData.length}</span></p>
     <div class ="cart-items" id="cart-item-container">
     </div>
    </div>
    
    <div class="right-side">
       <div class="total-amount">
         <h2>Total Amount</h2>
         <p>Total Amount: Rs <span id="total-amount">${totalCost}</span></p>
         <a href="./orderconfirm.html">
           <button id="place-order">Place Order</button>
         </a>
        </div>
    </div>
<div> `;

cartSection.append(checkoutTemplate);
var cartItemContainer = $("#cart-item-container");
console.log(cartItemContainer)

for(var j = 0; j < myLocalStorageData.length; j ++){

    var itemTemplate = `
      <div class="item">
         <img src = "${myLocalStorageData[j].preview}"/>
         <div class = "detail">
             <h3>${myLocalStorageData[j].title}</h3>
             <p>x${myLocalStorageData[j].count}</p>
             <p>Amount: ${subTotal}</p>
         </div>
       </div>
`;
  cartItemContainer.append(itemTemplate);
}
$('#cart-count').text(localStorage.getItem('count'));


var placeOrder = document.getElementById('place-order')
console.log(placeOrder)

placeOrder.addEventListener('click', function () {
    myLocalStorageData = window.localStorage.removeItem('product-list');

    cartCount = window.localStorage.setItem('count' , '0');
    var cost = 0;

    for(var i=0; i < myLocalStorageData.length; i ++){
        Counter += myLocalStorageData[i].count;
    }

    totalAmount.innerHTML = cost;
    numberOfItems.innerHTML = Counter;
})