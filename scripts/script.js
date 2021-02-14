// Script.js
myStorage = window.localStorage;
let arr = [];

window.addEventListener('DOMContentLoaded', () => {
  if(myStorage.length == 0) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        myStorage.setItem("cart_size", String(0));
        myStorage.setItem("stored_items", String(data.length));
        myStorage.setItem("history", JSON.stringify(arr));
        for(let i = 0; i < data.length; i++) { // iterate through list of jsons
          let item = data[i];
          myStorage.setItem(String(i), JSON.stringify(item));

          let custom = document.createElement('product-item');
          for(x in item) { // add each item of json
            if(String(x) == "title") {
              custom.imgInfo = String(item[x]);
              custom.productTitle = String(item[x]);
            }
            else if(String(x) == "price") {
              custom.productPrice = String(item[x]);
            }
            else if(String(x) == "image") {
              custom.imgSrc = String(item[x]);
            }
          }

          // add customElement to document
          document.getElementById("product-list").append(custom);
          custom.shadowRoot.getElementById("cart").addEventListener("click", function(event) {
            changeCart(i, custom);
          });
        }
      });
  }
  else {
    document.getElementById("cart-count").innerHTML = myStorage.getItem("cart_size");
    let hist = JSON.parse(myStorage.getItem("history"));
    //console.log(hist);

    for(let i = 0; i < Number(myStorage.getItem("stored_items")); i++) {
      let obj = JSON.parse(myStorage.getItem(String(i)));
      let custom = document.createElement('product-item');
      let id = "";
      for(x in obj) { // add each item of json
        if(String(x) == "title") {
          custom.imgInfo = String(obj[x]);
          custom.productTitle = String(obj[x]);
        }
        else if(String(x) == "price") {
          custom.productPrice = String(obj[x]);
        }
        else if(String(x) == "image") {
          custom.imgSrc = String(obj[x]);
        }
      }
      if(hist[i] == "1") {
        custom.shadowRoot.getElementById("cart").innerHTML = "Remove from Cart";
      }
      else if(hist[i] == "0") {
        custom.shadowRoot.getElementById("cart").innerHTML = "Add to Cart";
      }

      // add customElement to document
      document.getElementById("product-list").append(custom);
      custom.shadowRoot.getElementById("cart").addEventListener("click", function(event) {
        changeCart(i, custom);
      });
    }
  }
});

function changeCart(ID, product) {
  if(product.shadowRoot.getElementById("cart").innerHTML == "Add to Cart") {
    product.shadowRoot.getElementById("cart").innerHTML = "Remove from Cart";
    let curr = document.getElementById("cart-count").innerHTML;
    document.getElementById("cart-count").innerHTML = String(Number(curr) + 1);
    arr[ID] = "1";
  }
  else {
    product.shadowRoot.getElementById("cart").innerHTML = "Add to Cart";
    let curr = document.getElementById("cart-count").innerHTML;
    document.getElementById("cart-count").innerHTML = String(Number(curr) - 1);
    arr[ID] = "0";
  }
  //console.log(arr);
  myStorage.setItem("cart_size", document.getElementById("cart-count").innerHTML);
  myStorage.setItem("history", JSON.stringify(arr));
}