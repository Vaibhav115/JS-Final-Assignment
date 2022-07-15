var clothing = $('#clothingCards');
var accessories = $('#accessoriesCards')


function renderCard(data) {
    for(i=0; i < data.length; i ++){
        currentProduct = data[i];

        cardTemplate = `
        <div class="card" id="${currentProduct.id}">
           <a href="./product.html?product_id=${i}">
              <div class='img'>
                <img src="${currentProduct.preview}">
              </div>
              <div class="details">
                <h3 class="name">${currentProduct.name}</h3>
                <h4 class="brand">${currentProduct.brand}</h4>
                <h5 class ="price">${currentProduct.price}</h5>
              </div>
            </a>
        </div>`;

        if(currentProduct.isAccessory === false){
            clothing.append(cardTemplate);
        } else{
            accessories.append(cardTemplate);
        }
    }
}
$('#cart-count').text(localStorage.getItem('count'));



$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function (res) {
    renderCard(res)
})

