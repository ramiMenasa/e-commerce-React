const containerCards = document.getElementById('containerCards');
let allproducts;
const counte = localStorage.getItem("count");

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(finaleData => {
    allproducts = finaleData
    updateProducts()
    displayCount(counte)
  })
function showProducts(products) {
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');
    const productImg = document.createElement('img');
    productImg.src = product.image;
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
    document.getElementById(`item-${product.id}-btn`).addEventListener("click", ()=> addCart(product));
  });
}
function reset() {
  containerCards.innerHTML = '';
}

const searchInput = document.getElementById("search");
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value;
  reset();
  showProducts(allproducts.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase())
  }))
})

document.getElementById('categoryGroup').addEventListener('change', updateProducts);

document.getElementById('sortGroup').addEventListener('change', updateProducts);

function filterAndSort(selectcategory, sortOrder) {
  let filterProducts;
  if (selectcategory === 'All Categories') {
    filterProducts = allproducts
  }
  else {
    filterProducts = allproducts.filter((product) => {
      return product.category.toLowerCase() === selectcategory.toLowerCase()
    })
  }
  let sortedProducts;
  if (sortOrder == 'ascending') {
    sortedProducts = filterProducts.sort(function (a, b) {
      return a.price - b.price;
    })
  } else if (sortOrder == 'descending') {
    sortedProducts = filterProducts.sort(function (a, b) {
      return b.price - a.price;
    })
  } else {
    sortedProducts = filterProducts
  }
  return (sortedProducts)
}


function updateProducts() {
  let selectedCategory = document.querySelector('input[name="category"]:checked').value;
  const selectedSortOrder = document.querySelector('input[name="sort"]:checked').value;
  const filteredAndSorted = filterAndSort(selectedCategory, selectedSortOrder)
  reset();
  showProducts(filteredAndSorted);
}

function addCart(product){

  const cart =localStorage.getItem("cart");
  if (cart){
    let parsedCart=JSON.parse(cart);
    if (!parsedCart.find((p)=> p.id===product.id)){
      parsedCart.push({id:product.id,title : product.title , price: product.price , desc : product.description , img : product.image, quantity :1});
      localStorage.setItem("cart", JSON.stringify(parsedCart));
    }
    else{
      indexProduct = parsedCart.findIndex((p)=> p.id===product.id) 
      parsedCart[indexProduct].quantity +=1 ;
      localStorage.setItem("cart", JSON.stringify(parsedCart));
    }
  }
  else{
    localStorage.setItem( "cart" , JSON.stringify([{id:product.id, title : product.title , price: product.price , desc : product.description , img : product.image, quantity :1}]) );
  }
  count()
}

function count(){
  const count = localStorage.getItem("count");
  if (count){
    localStorage.setItem('count', Number(count)+1)
  } else {
    localStorage.setItem('count', 1 )
  }
  displayCount(Number(count)+1)
}
function displayCount(count){
  const counterCart = document.getElementById("counter");
  if (count>=0) {
    counterCart.innerText=`${Number(count)}`
  }
}