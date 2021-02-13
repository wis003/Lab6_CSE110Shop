// Script.js
myStorage = window.localStorage;
myStorage.clear();

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
              console.log(img_info);
            }
            else if(String(x) == "price") {
              price = String(item[x]);
            }
            else if(String(x) == "image") {
              img_src = String(item[x]);
            }
          }

          let custom = document.createElement('product-item');
          custom.getElementsByClassName("img-info").alt = img_info;
          custom.getElementsByClassName("title").innerHTML = title;
          custom.getElementsByClassName("price").innerHTML = price;
          custom.getElementsByClassName("img-info").src = img_src;

          console.log(custom.getElementsByClassName("img-info").alt); // check update

          document.getElementById("product-list").append(custom);
        }
      });
  }
});
document.getElementsByClassName("cart").addEventListener("click", changeCart);

function changeCart(event) {
  if(this.added == false) { // add to cart
    this.added = true;
    this.innerHTML = "Remove from Cart";
    let count = Number(document.getElementById("cart-count").innerHTML);
    document.getElementById("cart-count").innerHTML = count + 1;
  }
  else { // remove from cart
    this.added = false;
    this.innerHTML = "Add to Cart";
    let count = Number(document.getElementById("cart-count").innerHTML);
    document.getElementById("cart-count").innerHTML = count - 1;
  }
  event.preventDefault();
}