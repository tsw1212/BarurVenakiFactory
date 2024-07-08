const productOrderServices = require("../../services/productOrderServices");
const validation = require('../../modules/validation');

const productOrderController = {
    updateProductOrder: async (req, res) => {
        try {
            let updatedProductOrder = req.body;
            if (!validation.validateProductOrderInput(updatedProductOrder)) {
                res.status(400).json({ error: 'invalid input' });
            } else {
                await productOrderServices.updateProductOrder(updatedProductOrder);
                res.status(200).json('product order was updated successfully');
            }
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    }
}

module.exports = productOrderController;