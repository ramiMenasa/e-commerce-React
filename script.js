const containerCards = document.getElementById('containerCards');
let allproducts;
fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(finaleData=>{
        allproducts=finaleData
        console.log(allproducts);
        showProducts(allproducts);
})
function showProducts(products) {
    products.forEach(product => {
        const card = document.createElement('div'); 
        card.classList.add('card');
        const productImg = document.createElement('img');
        productImg.src=product.image;
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.innerHTML = `
         <h3>${product.title}</h3>
         <div class="price">
             <h3>price: ${product.price} $</h3>
             <button id='item-${product.id}-btn'>Add to Cart</button>                    
         </div>
        `;
        card.appendChild(productImg);
        card.appendChild(cardContent);
        containerCards.appendChild(card);
    });
}
function reset() {
    containerCards.innerHTML = '';
}

const searchInput = document.getElementById("search");
searchInput.addEventListener('input',()=>{
    const searchTerm = searchInput.value;
    reset();
    showProducts(allproducts.filter((product)=>{
       return product.title.toLowerCase().includes(searchTerm.toLowerCase())}))       
})