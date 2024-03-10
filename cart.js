const count = localStorage.getItem('count');
const cart = localStorage.getItem('cart');
const containerOrder = document.getElementById('orders');


window.onload = function reload () {
    if(!cart){
        localStorage.setItem('cart',[])
    }
    showOrders();
    getTotal();
    getTotalQuantity()
}


function showOrders() {
    let parsedCart = loadCart();
    if (parsedCart.length < 1) {
        const img = document.createElement('img');
        img.src = 'emptyCart.png';
        const emptyH1 = document.createElement('h1');
        emptyH1.textContent = 'Your Cart is Empty!';
        containerOrder.appendChild(emptyH1);
        containerOrder.appendChild(img);
    }
    else {
        parsedCart.forEach(product => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.setAttribute('id',product.id+'-item');
            item.innerHTML = `
            <img src="${product.img}" alt="">
            <div class="content">
                <h1>${product.title}</h1>
                <p>${product.desc}</p>
                <h2>Price: $${product.price}</h2>
                <div class="btns">
                    <button id='${product.id}-btnRemove'>Remove</button>
                    <div class="countbtns">
                        <button id='${product.id}-btnminus'>-</button>
                        <span id='${product.id}-quantity' >${product.quantity}</span>
                        <button id='${product.id}-btnplus'>+</button>
                    </div>
                </div>
            </div>`

            containerOrder.appendChild(item);
            document.getElementById(`${product.id}-btnRemove`).addEventListener("click", () => removeFromCart(product.id));
            document.getElementById(`${product.id}-btnminus`).addEventListener("click", () => decreaseQuantitu(product.id));
            document.getElementById(`${product.id}-btnplus`).addEventListener("click", () => increaseQuantity(product.id));
        });
    }
}

function removeFromCart(productId) {
    let parsedCart = loadCart();
    const index = parsedCart.findIndex(i=> i.id===parseInt(productId))
    parsedCart.splice(index, 1);
    saveCart(parsedCart);
    removeProductUI(productId);
    if (parsedCart.length ==0){
        showOrders()
    }
    getTotal();
    getTotalQuantity()
}

function decreaseQuantitu(productId) {
    let parsedCart = loadCart();
    let index = parsedCart.findIndex(i=> i.id===parseInt(productId))
    if(index !== -1 && parsedCart[index].quantity > 1){
        parsedCart[index].quantity--;
        saveCart(parsedCart);
        updateQuantityUI(productId,parsedCart[index].quantity);
    }else if(index !== -1 && parsedCart[index].quantity === 1){
        removeFromCart(productId);
        if (parsedCart.length ==0){
            showOrders()
        }
    }
    getTotal();
    getTotalQuantity();
}



function increaseQuantity(productId) {
    let cart = loadCart();  
    var index = cart.findIndex(function(item) {
      return item.id === productId;
    });
      if (index !== -1) {
      cart[index].quantity++; // Increase quantity
      saveCart(cart);
      updateQuantityUI(productId, cart[index].quantity);
    }
    getTotal();
    getTotalQuantity();
}
  
function reset() {
    containerOrder.innerHTML = '';
}

function loadCart() {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}
  
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantityUI(productId, quantity) {
    let quantityElement = document.getElementById(`${productId}-quantity`);
    if (quantityElement) {
      quantityElement.textContent = quantity;
    }
}

function removeProductUI(productId) {
    var productElement = document.getElementById(productId+'-item');
    if (productElement) {
      productElement.remove();
    }
  }

function getTotal(){
    let total=0;
    let uiTotal = document.getElementById('totalPrice')
    const pairsedCart = loadCart();
    pairsedCart.forEach((item)=>{
        total+= item.price * item.quantity;
    })
    uiTotal.innerText="$ "+total.toFixed(2);

}
function getTotalQuantity(){
    let total=0;
    let uiTotal = document.getElementById('quantity')
    const pairsedCart = loadCart();
    pairsedCart.forEach((item)=>{
        total+= item.quantity;
    })
    uiTotal.innerText=total;
    localStorage.setItem("count", total);
}