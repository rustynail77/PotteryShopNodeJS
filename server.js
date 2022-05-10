const express = require('express');
const dotenv = require('dotenv');
const {getAllItems, 
    getDisplayedItems,
    getFeaturedItems,
    getSingleItem, 
    searchItem, 
    createItem,
    deleteItem,
    changeItem,
    getCartItems
} = require('./modules/products.js');

const app = express();
dotenv.config(); //initializing the dotenv package
app.set('view engine','ejs');

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})

app.use('/',express.static(__dirname+'/views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/',(req,res)=>{
    getFeaturedItems()
    .then(products=>{
        res.render('pages/index', {data:products})
    })
    .catch(err => {
        console.log(err);
        res.json({message:err.message});
    }) 
})

app.get('/about',(req,res)=>{
    res.render('pages/about')
})

app.get('/shop',(req,res)=>{
    getDisplayedItems()
    .then(products=>{
        res.render('pages/shop', {data:products})
    })
    .catch(err => {
        console.log(err);
        res.json({message:err.message});
    }) 
})

app.get('/navbar.js', (req, res) => {
    res.sendFile(__dirname+'/views/partials/navbar.js')
})

app.get('/functions.js', (req, res) => {
    res.sendFile(__dirname+'/views/pages/functions.js')
})

app.get('/cart-page.js', (req, res) => {
    res.sendFile(__dirname+'/views/pages/cart-page.js')
})

app.get('/assets/:img', (req, res) => {
    res.sendFile(__dirname+'/views/assets/'+req.params.img)
})

app.get('/shop/assets/:img', (req, res) => {
    res.sendFile(__dirname+'/views/assets/'+req.params.img)
})

app.get('/styles/style.css', (req, res) => {
    res.sendFile(__dirname+'/views/styles/style.css')
})


app.get('/single_item',(req,res)=>{
    getSingleItem(req.query.q)
    .then(product=>{
        res.render('pages/single_item',{item:product[0]});
    })
    .catch(err => {
        console.log(err);
        res.json({message:err.message});
    })
})

app.post('/cart',(req,res)=>{
    let cart = req.body.cartItems;
    if (cart.length!==0) {
        console.log('cart =',cart);
        getCartItems(cart)
        .then(products=>
            res.json(products)
        )
        .catch(err => {
            console.log(err);
            res.json({message:err.message});
        })
    } else {
        res.render('pages/empty-cart');
    }
})

app.get('/cart',(req,res)=>{
    res.render('pages/cart');  
})

app.get('/empty-cart',(req,res)=>{
    res.render('pages/empty-cart');  
})

// app.post('/cart',(req,res)=>{
//     let cartStr = req.body.hidden;
//     if (cartStr!=='') {
//         let cart = cartStr.split(',').map((item)=>parseInt(item,10));
//         console.log('cart =',cart);
//         getCartItems(cart)
//         .then(cart=>{
//             res.render('pages/cart',{items:cart});
//         })
//     } else {
//         res.render('pages/empty-cart')
//     }
// })



// // search - my url for searching will be /api/search?q=bla - some string I want to find in product name
// app.get('/api/search',(req,res)=>{
//     searchProduct(req.query.q)
//     .then(data=>{
//         res.json(data);
//     })
//     .catch(err => {
//         console.log(err);
//         res.json({message:err.message});
//     })
// })

// // insert/create new products
// app.post('/api/product', (req,res)=>{
//     createProduct(req.body)
//     .then(data=>{
//         res.json(data);
//     })
//     .catch(err => {
//         console.log(err);
//         res.json({message:err.message});
//     })
// })

// // delete a product
// app.delete('/api/product/:id',(req,res)=>{
//     deleteProduct(req.params.id)
//     .then(data=>{
//         res.json(data);
//     })
//     .catch(err => {
//         console.log(err);
//         res.json({message:err.message});
//     })
// })

// app.put('/api/cproduct/:id',(req,res)=>{
//     console.log(req.body);
//     changeProduct(req.params.id, req.body.cname, req.body.cprice)
//     .then(data=>{
//         res.json(data);
//     })
//     .catch(err => {
//         console.log(err);
//         res.json({message:err.message});
//     })
// })