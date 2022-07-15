    var productCard = $('#product')
    // console.log(productCard)

    const searchString = window.location.search; // gives value after question mark
    const params = new URLSearchParams(searchString)


    var urlId = params.get('product_id'); // able to get id from url

    function renderProduct(productData , urlId) {
        currentProduct = productData;
        // console.log(currentProduct)

        var productTemplate = `
        <div class="left-column">
          <img src = '${currentProduct[urlId].preview}' id=productImg>
        </div>
        <div class="right-column">
          <div class= "product-description">
             <h1 id='name'>${currentProduct[urlId].name}</h1>
             <h4 id='brand'>${currentProduct[urlId].brand}</h4>
             <h3>Price:Rs <span id='price'>${currentProduct[urlId].price}</span><h3>
             <div class='description>
               <h3> Description</h3>
               <p id='description'>${currentProduct[urlId].description}</p>
             </div>
             <div class = 'product-preview'>
             <h3>Product Preview</h3>
             <div class="previewImg">
             </div>
        </div>
        </div>
        <div class ='btn'>
        <button id='add-to-cart'>Add to Cart</button>
        </div>`
        productCard.append(productTemplate);

        var previewImgDiv = $('.previewImg');
        // console.log(previewImgDiv)

        for(i=0; i < currentProduct[urlId].photos.length; i++){
            var previewImgRender = `<img id="img${i}" src="${currentProduct[urlId].photos[i]}">`
            previewImgDiv.append(previewImgRender);
        }

        var addToCart = $('#add-to-cart');

        if(localStorage.getItem('count') === null) {
            localStorage.setItem('count', 0);
        } else {
            var cartValue = localStorage.getItem('count');
            localStorage.setItem('count' , cartValue);
        }

        function cartCount () {
            if(localStorage.getItem('count') === null) {
                cartValue = 0;
            } else {
                cartInitialValue = JSON.parse(window.localStorage.getItem('count'));
                $('#cart-count').text(cartInitialValue);
            }
            var cartCurrentValue = cartInitialValue + 1;
            window.localStorage.setItem('count', cartCurrentValue);
            $('#cart-count').text(cartCurrentValue)
        }

        $('#cart-count').text(localStorage.getItem('count'));


        function addDataToList(productData) {

            if(window.localStorage.getItem('product-list') === null) {
                myCartData = [];
            }
            else {
                myCartData = JSON.parse(window.localStorage.getItem('product-list'))
            }

            if(myCartData.length === 0){
                var myObj = {
                    id: productData[urlId].id,
                    title: productData[urlId].name,
                    count: 1,
                    price: productData[urlId].price,
                    preview: productData[urlId].preview
                };
                myCartData.push(myObj);
            }
            else if (myCartData.length !=0) {
                var w = 0;

                for(var i = 0; i < myCartData .length; i++){
                    if (myCartData[i].id == productData[urlId].id) {
                        myCartData[i].count = parseInt(myCartData[i].count) + 1;
                        w += 1;
                    }
                }

                if (w==0) {
                    var myObj = {
                        id:productData[urlId].id,
                        title: productData[urlId].name,
                        count: 1,
                        price: productData[urlId].price,
                        preview: productData[urlId].preview
                    };
                    myCartData.push(myObj);
                }
            }

            window.localStorage.setItem('product-list', JSON.stringify(myCartData));
        }


        function cartHandler () {
            cartCount();
            addDataToList(productData);
        }

        addToCart.on("click" , cartHandler)

        var activePreview = document.getElementById('img0')
        activePreview.classList.add('active');

        function clickHandler (num) {

            var x = document.querySelectorAll('.previewImg img')
            console.log(image)

            
            for( j = 0; j < currentProduct[urlId].photos.length; j ++) {
                if(x[j].classList.contains('active')){
                    x[j].classList.remove('active')
                } else {
                    x[j].classList.add('active')
                }
            }
        }

        var productImage = document.getElementById('productImg');
        // console.log(productImage)

        var photo1 = document.getElementById('img0');
        var photo2 = document.getElementById('img1');
        var photo3 = document.getElementById('img2');
        var photo4 = document.getElementById('img3');
        var photo5 = document.getElementById('img4');

        photo1.addEventListener('click', function (){
            productImage.src = photo1.src;
            clickHandler[0]
        })

        photo2.addEventListener('click', function (){
            productImage.src = photo2.src;
            clickHandler[1]
        })

        photo3.addEventListener('click', function (){
            productImage.src = photo3.src;
            clickHandler[2]
        })

        photo4.addEventListener('click', function (){
            productImage.src = photo4.src;
            clickHandler[3]
        })

        photo5.addEventListener('click', function (){
            productImage.src = photo5.src;
            clickHandler[4]
        })

    }

$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function(res) {
    renderProduct(res, urlId)
})

 