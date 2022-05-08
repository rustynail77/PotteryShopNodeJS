function add() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    fetch('http://localhost:5001/api/product',{
        method: 'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({name,price})
    })
    .then(res=>res.json())
    .then(product=>{
        console.log(product);
    })
    .catch(err=>{
        console.log(err);
    })
}

function deletep() {
    const id = document.getElementById('id').value;
    fetch(`http://localhost:5001/api/product/${id}`,{
        method:'DELETE'
    })
    .then(res=>res.json())
    .then(product=>{
        console.log('deleted',product);
    })
    .catch(err=>{
        console.log(err);
    })
    }

function changep() {
    const cid = document.getElementById('cid').value;
    const cname = document.getElementById('cname').value;
    const cprice = document.getElementById('cprice').value;

    fetch(`http://localhost:5001/api/cproduct/${cid}`,{
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cname,cprice})
    })
    .then(res=>res.json())
    .then(product=>{
        console.log('changed ',product);
    })
    .catch(err=>{
        console.log(err);
    })
}
