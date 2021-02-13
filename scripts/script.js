// Script.js
myStorage = window.localStorage;
document.getElementById("cart-count").innerHTML = myStorage.getItem("cart-size");
//myStorage.clear();

window.addEventListener('DOMContentLoaded', () => {
  if(myStorage.length == 0) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        for(let i = 0; i < data.length; i++) { // iterate through list of jsons
          let item = data[i];
          
          let img_info = "";
          let title = "";
          let price = "";
          let img_src = "";
          for(x in item) { // add each item of json
            myStorage.setItem(String(x), String(item[x]));
            if(String(x) == "title") {
              img_info = String(item[x]);
              title = String(item[x]);
            }
            else if(String(x) == "price") {
              price = String(item[x]);
            }
            else if(String(x) == "image") {
              img_src = String(item[x]);
            }
          }

          // add customElement to document
          let custom = document.createElement('product-item');

          custom.imgInfo = img_info;
          custom.productTitle = title;
          custom.productPrice = price;
          custom.imgSrc = img_src;
        
          document.getElementById("product-list").append(custom);
          custom.shadowRoot.getElementById("cart").addEventListener("click", changeCart);
        }
      });
  }
  else {
    for(let i = 0; i < myStorage.length; i++){
      console.log(myStorage.key(i));
    }
  }
});
function changeCart() {
  if(this.innerHTML == "Add to Cart") {
    this.innerHTML = "Remove from Cart";
    let curr = document.getElementById("cart-count").innerHTML;
    document.getElementById("cart-count").innerHTML = Number(curr) + 1;
  }
  else {
    this.innerHTML = "Add to Cart";
    let curr = document.getElementById("cart-count").innerHTML;
    document.getElementById("cart-count").innerHTML = Number(curr) - 1;
  }
  myStorage.setItem("cart_size", document.getElementById("cart-count").innerHTML);
}