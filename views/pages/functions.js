function addToCart (item) {
    let myCart = JSON.parse(localStorage.getItem('theCart')) || [];
    if (myCart.includes(item)) {alert('This item is already in your cart!')}
    else {
        myCart.push(item);
        alert('Item added to cart successfully');
        localStorage.setItem('theCart', JSON.stringify(myCart));
    };
    document.getElementById('hidden').value = myCart;
    console.log(document.getElementById('hidden').value);
}

function clearCart () {
    if (confirm('Are you sure? If you click OK your cart will be empty.')) {
        localStorage.clear();
        document.getElementById('hidden').value = '';
    };
}

function payUp () {
    localStorage.clear();
    alert('Thank you for shopping!');
    location.href="/";
}

function goToSingle(item_id) {
    fetch(`http://localhost:5001/single_item?q=${item_id}`)
    .then(data=>location.href=data.url)
    .catch(err => {
        console.log(err);
    })   
}

// function buyItemsInCart() {
//     let cartItems = JSON.parse(localStorage.getItem('theCart'));
//     fetch('http://localhost:5001/cart',{
//         method: 'POST',
//         headers:{
//             'Content-type':'application/json'
//         },
//         body: JSON.stringify({cartItems})
//     })
//     .then((data) => window.location.href=data.url)
//     .catch(err=>{
//         console.log(err);
//     })
// }
