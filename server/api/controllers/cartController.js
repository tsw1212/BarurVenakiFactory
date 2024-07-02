const express = require("express");
const CartServices = require("../../services/cartServices");
const validation = require('../../modules/validation');

const CartController = {
    getAllCarts: async (req, res) => {
        if (req.securityLevel != 'manager')
         return   res.status(401).json({ error: "unauthorized" });
        try {
            let carts = await CartServices.getAllCarts();
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    },
    getCartByUserId: async (req, res) => {
        if (req.securityLevel != "user" && req.securityLevel != 'manager')
          return  res.status(401).json({ error: "unauthorized" });
        try {
            const { userId } = req.params;
            if(req.securityLevel=='user'&&userId!=req.userId){
                return res.status(401).json({ error: "unauthorized" });
            }
            let cart = await CartServices.getCartByUserId(userId);
            if (!cart) {
                res.status(404).json({ error: "cart not found" });
            } else {
                res.status(200).json(cart);
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    },
    createCartItem: async (req, res) => {
        if (req.securityLevel != "user" && req.securityLevel != 'manager')
          return  res.status(401).json({ error: "unauthorized" });
        try {
            const cartItem = req.body;
            if(req.securityLevel=='user'&&cartItem.userId!=req.userId){
                return res.status(401).json({ error: "unauthorized" });
            }
            if (!validation.validateCartInput(cartItem)) {
                res.status(400).json({ error: 'invalid input' });
            } else {
                const newCartItem = await CartServices.createCartItem(cartItem);
                res.status(200).json(newCartItem);
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    },
    updateCartItem: async (req, res) => {
        if (req.securityLevel != "user" && req.securityLevel != 'manager')
           return res.status(401).json({ error: "unauthorized" });
        try {
            const {id}=req.params;
            let updatedCartData = req.body;
            if(req.securityLevel=='user'&&updatedCartData.userId!=req.userId){
                return res.status(401).json({ error: "unauthorized" });
            }
            if (!validation.validateCartInput(updatedCartData, true)) {
                res.status(400).json({ error: 'invalid input' });
            } else if (await CartServices.getCartById(id) === null) {
                res.status(404).json({ error: "cart not found" });
            } else {
                updatedCartData = await CartServices.updateCartItem(updatedCartData);
                res.status(200).json(updatedCartData);
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    },
    deleteCartItem: async (req, res) => {
        if (req.securityLevel != "user" && req.securityLevel != 'manager')
         return   res.status(401).json({ error: "unauthorized" });
        try {
            const { id } = req.params;
            if (await CartServices.getCartById(id) === null) {
                res.status(404).json({ error: "cart not found" });
            } else {
                await CartServices.deleteCartItem(id);
                res.status(200).json({});
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    }
}

module.exports = CartController;
