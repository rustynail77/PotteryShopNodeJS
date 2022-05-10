function payUp () {
    localStorage.clear();
    alert('Thank you for shopping!');
    location.href="/";
}

function buildCartItems(data) {
    const container = document.getElementById('cart-content');
    let sum = 0;
    data.forEach(item =>{
        sum += item.disc_price;
        let img = document.createElement('img');
        img.src=item.feat_img;
        let h3 = document.createElement('h3');
        h3.innerText = item.prod_name;
        let price = document.createElement('div');
        price.innerText = `Price: ${item.prod_name}`;

        let myDiv = document.createElement('div');
        myDiv.className = "cart-items";
        myDiv.appendChild(img);
        myDiv.appendChild(h3);
        myDiv.appendChild(price);
        
        container.appendChild(myDiv);
    });
    
    let h2 = document.querySelector('#sum');
    h2.innerText = `Your Shopping Cart's total is: ${sum} ILS`;

    container.appendChild(myDiv);

}

(function getCartItems () {
    let cartItems = JSON.parse(localStorage.getItem('theCart'));
    fetch('http://localhost:5001/cart',{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({cartItems})
        })
        .then(res=>res.json())
        .then(data=>buildCartItems(data))
        .catch(err=>{
            console.log(err);
        })
})();
