const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

const db = knex({
    client:'pg',
    connection:{
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        // ssl: {rejectUnauthorized: false}
    }
})

const getAllItems = () => {
    return db('items')
    .select('prod_id','prod_name','feat_img','img_gallery','description','disc_price','orig_price','display','quantity','featured')
    .orderBy('prod_id');
}

const getDisplayedItems = () => {
    return db('items')
    .select('prod_id','prod_name','feat_img','img_gallery','description','disc_price','orig_price','display','quantity','featured')
    .where({display:'true'})
    .orderBy('prod_id');
}

const getFeaturedItems = () => {
    return db('items')
    .select('prod_id','prod_name','feat_img','img_gallery','description','disc_price','orig_price','display','quantity','featured')
    .where({featured:'true'})
    .orderBy('prod_id');
}

const getSingleItem = (product_id) => {
    return db('items')
    .select('prod_id','prod_name','feat_img','img_gallery','description','disc_price','orig_price','display','quantity','featured')
    .where({prod_id:product_id});
}

const searchItem = (srchText) => {
    return db('items')
    .select('prod_id','prod_name','feat_img','img_gallery','description','disc_price','orig_price','display','quantity','featured')
    .whereILike('prod_name',`%${srchText}%`)
    .orWhereILike('description',`%${srchText}%`);
}

const createItem = (item) => {
    return db('items')
    .insert(item)
    .returning('*')
}

const deleteItem = (product_id) => {
    return db('items')
    .del()
    .where({prod_id:product_id})
    .returning('*')
}

const changeItem = (item) => {
    return db('items')
    .where({prod_id:item.code})
    .update({
        prod_name:item.name,
        feat_img:item.featImg,
        img_gallery:item.imgGallery,
        description:item.description,
        disc_price:item.discPrice,
        orig_price:item.origPrice,
        display:item.display,
        quantity:item.quantity,
        featured:item.featured
    })
    .returning('*')
}

const getCartItems = (idArray) => {
    return db('items')
    .select('prod_id','prod_name','feat_img','img_gallery','description','disc_price','orig_price','display','quantity','featured')
    .whereIn('prod_id',idArray)
}

module.exports = {
    getAllItems,
    getDisplayedItems,
    getFeaturedItems,
    getSingleItem,
    searchItem,
    createItem,
    deleteItem,
    changeItem,
    getCartItems
}