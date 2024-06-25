const DB_actions = require('../DB_access/productsDB_handler');
const converts = require('../modules/converts');

const ProductsServices = {
    createProduct: async (productData) => {
        const product= await  DB_actions.createProduct(productData);
        const { imgUrl, ...productWithoutImg } = product;
        const img = await converts.convertUrlToImageFile(product.imgUrl);
        return { ...productWithoutImg, img: img };
    },

    getAllProducts: async () => {
        const products = await DB_actions.getAllProducts();
        const updatedProducts = await Promise.all(products.map(async (product) => {
            const { imgUrl, ...productWithoutImg } = product;
             const img = await converts.convertUrlToImageFile(product.imgUrl);
            return { ...productWithoutImg, img: img };
        }));
        return updatedProducts;
    },
    getAllShortListProducts: async () => {
        const products = await DB_actions.getAllShortListProducts();
        const updatedProducts = await Promise.all(products.map(async (product) => {
            const { imgUrl, ...productWithoutImg } = product;
            const img = await converts.convertUrlToImageFile(product.imgUrl);
            return { ...productWithoutImg, img: img };
        }));
        return updatedProducts;
    },
    getProductById:async (id)=>{
        const product = await DB_actions.getProductById(id);
        return product; 
    },
    getProductByName: async (name) => {
        const products = await DB_actions.getProductByName(name);
        const updatedProducts = await Promise.all(products.map(async (product) => {
            const { imgUrl, ...productWithoutImg } = product;
            const img = await converts.convertUrlToImageFile(product.imgUrl);
            return { ...productWithoutImg, img: img };
        }));
        return updatedProducts;
    },

     updateProduct: async (updatedProductData) => {
        const product= await  DB_actions.updateProduct(updatedProductData);
            const { imgUrl, ...productWithoutImg } = product;
            const img = await converts.convertUrlToImageFile(product.imgUrl);
            return { ...productWithoutImg, img: img };
 
    },

    deleteProduct: async (id) => {
        await DB_actions.deleteProduct(id);
    },
    getProductByNameAndPackage: async (name, packageType) => {
        const product = await DB_actions.getProductByNameAndPackage(name, packageType);
        return product;
    },
    getNextProductId: async()=>{
        const id = await DB_actions.getNextProductId();
        return id;
    }
};

module.exports = ProductsServices;
