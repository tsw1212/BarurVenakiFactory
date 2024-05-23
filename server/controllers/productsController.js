const DB_actions = require('../DB_access/productsDB_handler');
const converts = require('../modules/converts');

const ProductsController = {
    createProduct: async (product) => {
        return await DB_actions.createProduct(product);
    },

    getAllProducts: async () => {
        const products= await DB_actions.getAllProducts();
        const updatedProducts = products.map(async (product) => {
            const { imageUrl, ...productWithoutImg } = product;
            const img = await converts.convertUrlToImageFile(imageUrl);
            return { ...productWithoutImg, img:img };
        });
        return updatedProducts;
    },
    getAllShortListProducts: async () => {
        const products= await DB_actions.getAllShortListProducts();
        const updatedProducts = products.map(async (product) => {
            const { imageUrl, ...productWithoutImg } = product;
            const img = await converts.convertUrlToImageFile(imageUrl);
            return { ...productWithoutImg, img:img };
        });
        return updatedProducts;
    },

    getProductById: async (id) => {
        const product = await DB_actions.getProductById(id);
        const { imgUrl, ...productWithoutImg } = product;
        const img = await converts.convertUrlToImageFile(imgUrl);
        return { ...productWithoutImg, img: img };
    },

    updateProduct: async (updatedProductData) => {
        return await DB_actions.updateProduct(updatedProductData);
    },

    deleteProduct: async (id) => {
        await DB_actions.deleteProduct(id);
    },
};

module.exports = ProductsController;
