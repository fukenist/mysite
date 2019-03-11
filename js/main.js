


var cart = {};

function init() {
    $.getJSON("json/lucky.json", goodsOut);
    
}


function goodsOut(data) {
    var out = '';
    
    for (var key in data) {
        out +=`<div id="oneItem" class="col-6 col-sm-4 col-lg-3 mx-auto my-3 store-item ${data[key].category}" data-category=${data[key].category} data-quantity=${data[key].quantity} data-item=${data[key].name}>`
        out +=`<div class="card single-item">`
        out +=`<div class="img-container">`
        out +=`<img src= ${data[key].img} class="card-img-top store-img" alt="">`
        out +=`<span class="store-item-icon">`
        out +=`<i class="fas fa-shopping-cart add-to-cart" data-id=${data[key].id}></i>`
        out +=`</span>`
        out +=`</div>`
        out +=`<div class="card-body">`
        out +=`<div class="card-text d-flex justify-content-between text-capitalize">`
        out +=`<h5 id="store-item-name">${data[key].name}</h5>`
        out +=`<h5 class="store-item-value">Р <strong id="store-item-price" class="font-weight-bold">${data[key].price}</strong></h5>`
        out +=`</div>`
        out +=`</div>`
        out +=`</div>`
        out +=`</div>`
    }
    $('#store-items').html(out);
    $('.add-to-cart').on('click', addToCart);
    $('.add-to-cart').on('click', onit);
}

function onit() {
    $.getJSON("json/lucky.json", goodsInBask);
}
//
 function goodsInBask(data) {
    var lucky = data;//все товары в массиве
    console.log(0 == null);
    checkCart();
    showCart();
    
   
 
    function showCart(){
      let sump;
      let sumt;

        if($.isEmptyObject(cart)) {
            var out = 'Корзина пуста. Купи что-нить, а?'
            $('#content').html(out);
            $('#item-count').html(0);
            $('.item-total').html(0);
        }
        else {
          //суммы вещей и их цен сложенные в массиве
        let arrp = [];
        let arrt = [];
        
         var out ="";
         for (var key in cart) {//здесь ошибка - кеев много у меня, а у него один
            //out += '<div class="d-inline-flex">'
            out += '<div class="cart-item text-capitalize row">'
            out += '<div class="col-2">'
            out += '<img src=' + lucky[key].img + ' class="img-fluid rounded-circle" alt="">'
            out += '</div>'
            out += '<div class="col-4 ">'
            out += '<span class="" id="cart-item-title" class="font-weight-bold mb-3">'+lucky[key].name+' '+'</span>'
            out += '<span>Р</span>'
            out += '<span id="cart-item-price" class="cart-item-price mb-0">' + lucky[key].price + '</span>'
            out += '</div>'
            out += '<div class="col-3">'
            out += '<div class="row " style="display:flex; flex-wrap: nowrap">'//чтобы плюсы-минусы не сворачивались
            out += '<span><button class="minus" data-attr=' + key + '>-</button></span>'
            out +=  cart[key];
            out += '<span><button class="plus" data-attr=' + key + '>+</button></span>'
            out +=  '<span class="howMuch">' + cart[key] * lucky[key].price + '</span>'
            out += '</div>'
            out += '</div>'
            out += '<div class="col-3">'
            //out += '<a href="" id="cart-item-remove" data-attr="' + key + '" class="cart-item-remove">'
            out += '<i class="fas fa-trash cart-item-remove" data-attr=' + key + '></i>'
            //out += '</a>'
            out += '</div>'
            out += '</div>'
            //out += '</div>'
            
            arrp.push(cart[key] * lucky[key].price);
            arrt.push(cart[key]);

            sump = arrp.reduce(((acc,num) => acc + num), 0);
            sumt = arrt.reduce(((acc,num) => acc + num), 0);
         }
         $('#content').html(out);
         $('.plus').on('click', plusGoods);
         $('.minus').on('click', minusGoods);
         $('.cart-item-remove').on('click', deleteGoods);
         $('#item-count').html(sumt);
         $('#item-count').html(sumt);
         $('.item-total').html(sump);
        $('#clear-cart').on('click', clearCart);

        console.log(sump)
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
    
    function clearCart() {
      event.preventDefault();
      
      //var out = 'Корзина пуста. Купи что-нить, а?';
      //$('#content').html(out);
      for (var variableKey in cart){
        if (cart.hasOwnProperty(variableKey)){
            delete cart[variableKey];
        }
    }
      checkCart();
      saveCartToLS();
      showCart();
    }
 };
   

 function checkCart(){
     if (localStorage.getItem('cart') !== null) {
         cart = JSON.parse(localStorage.getItem('cart'));
     }
     
 }
 
 
 
 function saveCartToLS(){
     localStorage.setItem('cart', JSON.stringify(cart));
 }
//



function addToCart(){
     //добавляем товар в корзину
     /*var id = event.target.getAttribute('data-id');
     let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
     let fullPath = event.target.parentElement.previousElementSibling.src;
     let pos = fullPath.indexOf("img") + 3;
     let partPath = fullPath.slice(pos);
     
     let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].nextElementSibling.textContent.slice(2);
     let category = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-category');
     let qty = 1;
     
     if (cart[id]==undefined) {
        cart.name = name;
        cart.qty = qty; 
        
        cart.id = id;
        cart.img = `img-cart${partPath}`;
        cart.price = price;
        cart.category = category;
        else {
        cart.qty++;
        
         //если такой товар есть - увеличиваю на единицу
    }
    console.log(cart.id);
    
    showCart();
    saveCart();
       */
      var id = event.target.getAttribute('data-id');
      if (cart[id] == undefined) {
          cart[id] = 1;
      }
      else {
          cart[id]++;
      }
    
    localStorage.setItem('cart', JSON.stringify(cart) );
    
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}






//filter buttons
(function(){
    //select all buttons
    const filterBtn = document.querySelectorAll('.filter-btn');
    filterBtn.forEach(function(btn){
      btn.addEventListener('click',function(event){
        event.preventDefault();
        const value = event.target.dataset.filter;
        const items = document.querySelectorAll('.store-item');
        
        items.forEach(function(item){
          if(value === "all") {
            item.style.display = 'block';
          }
          else {
            if(item.classList.contains(value)) {
              item.style.display = "block";
            }
            else {
              item.style.display = 'none';
            }
          }
        })
      });
    });
    })();
    
    
    //search item
    (function(){
      
     const search = document.getElementById('search-item');
     search.addEventListener('keyup', function(){
       let value = search.value.toLowerCase().trim();
       
       const items = document.querySelectorAll('.store-item');
       items.forEach(function(item){
         let type = item.dataset.item;
       
         let length = value.length;
         let match = type.slice(0,length);
         
         if (value === match) {
           item.style.display ='block';
         }
         else {
           item.style.display = 'none';
         }
       })
     })
    
    })();
    
    //cart
    (function(){
    const cartInfo = document.getElementById('cart-info');
    //const cart = document.getElementById('cart');
    
    

    cartInfo.addEventListener('click', function(){
      $("#cart").toggleClass('d-none');
    //cart.classList.toggle('show-cart');
    
    })
    
    })();




$(document).ready(function () {
    checkCart();
    init();
    onit();
    
    /*loadCart();*/
    
});



