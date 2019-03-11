
//fu
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

//const cart = document.getElementById('cart');

const cartNav = document.getElementById('cartNav')



cartNav.addEventListener('click', function(){
  event.preventDefault();
  $('#cart').toggleClass('d-none');
})
})();







 
 
 



