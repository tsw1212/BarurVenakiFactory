const DB_actions = require('../DB_access/cartDB_handler');
const converts = require('../modules/converts');

const CartServices = {
    createCartItem: async (cartData) => {
        const cartItem = await DB_actions.createCartItem(cartData);
        const { imgUrl, ...cartItemWithoutImg } = cartItem;
        const img = await converts.convertUrlToImageFile(cartItem.imgUrl);
        return { ...cartItemWithoutImg, img: img };
    },

    getAllCarts: async () => {
        const carts = await DB_actions.getAllCarts();
        const updatedCarts = await Promise.all(carts.map(async (cart) => {
            const { imgUrl, ...cartWithoutImg } = cart;
            const img = await converts.convertUrlToImageFile(cart.imgUrl);
            return { ...cartWithoutImg, img: img };
        }));
        return updatedCarts;
    },

    getCartByUserId: async (userId) => {
        const carts = await DB_actions.getCartByUserId(userId);
        const updatedCarts = await Promise.all(carts.map(async (cart) => {
            const { imgUrl, ...cartWithoutImg } = cart;
            const img = await converts.convertUrlToImageFile(cart.imgUrl);
            return { ...cartWithoutImg, img: img };
        }));
        return updatedCarts;
    },

    updateCartItem: async (updatedCartData) => {
        const cartItem = await DB_actions.updateCartItem(updatedCartData);
        const { imgUrl, ...cartItemWithoutImg } = cartItem;
        const img = await converts.convertUrlToImageFile(cartItem.imgUrl);
        return { ...cartItemWithoutImg, img: img };
    },

    deleteCartItem: async (userId, productId) => {
        await DB_actions.deleteCartItem(userId, productId);
    }
};

module.exports = CartServices;
