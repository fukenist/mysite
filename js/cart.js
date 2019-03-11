var cart = {}; //корзина



$.getJSON("json/lucky.json", function (data) {
   var lucky = data;//все товары в массиве
   console.log(lucky);
   checkCart();
   showCart();
   
  

   function showCart(){
       if($.isEmptyObject(cart)) {
           var out = 'Корзина пуста. Купи что-нить, а?'
           $('#my-cart').html(out);
       }
       else {
        var out ="";
        for (var key in cart) {//здесь ошибка - кеев много у меня, а у него один
           out += '<div class="cart-item d-flex justify-content-between text-capitalize">'
           out += '<img src="' + lucky[key].img + '" width="48" height="48" class="img-fluid rounded-circle" alt="">'
           out += '<div class="item-text ml-5">'
           out += '<p class="" id="cart-item-title" class="font-weight-bold mb-3">"'+lucky[key].name+'"</p>'
           out += '<span>Р</span>'
           out += '<span id="cart-item-price" class="cart-item-price mb-0">"' + lucky[key].price + '"</span>'
           out += '</div>'
           out += '<button class="minus" data-attr="' + key + '">-</button>'
           out +=  cart[key];
           out += '<button class="plus" data-attr="' + key + '">+</button>'
           out +=  cart[key] * lucky[key].price;
           out += '<a href="" id="cart-item-remove" class="cart-item-remove">'
           out += '<i class="fas fa-trash ml-5"></i>'
           out += '</a>'
           out += '</div>'
           
        }
        $('#my-cart').html(out);
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('#cart-item-remove').on('click', deleteGoods);
        
       }
   }
   function plusGoods(){
       var id = $(this).attr('data-attr');
       cart[id]++;
       saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
   }
   function minusGoods(){
       var id = $(this).attr('data-attr');
       if (cart[id] > 1) {
           cart[id]--;
       }
       else {
           delete cart[id];
       }
       saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
   }
   function  deleteGoods(){
       var id = $(this).attr('data-attr');
       delete cart[id];
       saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
   }

});

function checkCart(){
    if (localStorage.getItem('cart') !== null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    
}



function saveCartToLS(){
    localStorage.setItem('cart', JSON.stringify(cart));
}