// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `
    <style>
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    </style>
    <li class="product">
      <img id="img-info" class="img-info" src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
      <p id="title" class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
      <p id="price" class="price">$109.95</p>
      <button id="cart" class="cart" onclick="alert('Added to Cart!')">Add to Cart</button>
    </li>
    `;

  }
  set imgInfo(alt) {
    this.shadowRoot.getElementById("img-info").alt = alt;
  }
  set productTitle(title) {
    this.shadowRoot.getElementById("title").innerHTML = title;
  }
  set productPrice(price) {
    this.shadowRoot.getElementById("price").innerHTML = "$" + price;
  }
  set imgSrc(src) {
    this.shadowRoot.getElementById("img-info").src = src;
  }
}

customElements.define('product-item', ProductItem);