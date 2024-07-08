const DB_actions = require('../DB_access/cartDB_handler');
const converts = require('../modules/converts');

const CartServices = {
    createCartItem: async (cartData) => {
        const cartItem = await DB_actions.createCartItem(cartData);
        return cartItem;
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
    getCartById: async (itemId) => {
        const cart = await DB_actions.getCartById(itemId);
        return cart;;
    },
    updateCartItem: async (updatedCartData) => {
        const cartItem = await DB_actions.updateCartItem(updatedCartData);
        return cartItem;
    },

    deleteCartItem: async (id) => {
        await DB_actions.deleteCartItem(id);
    }
};

module.exports = CartServices;
