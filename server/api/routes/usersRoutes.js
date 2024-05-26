const express = require("express");
const app = express.Router();
const usersControllers = require('../controllers/usersController')


app.get('/',usersControllers.getAllUsers );

app.get('/:id',usersControllers.getUserById );

app.get('/:id/orders',usersControllers.getUsersOrders);

app.post('/',usersControllers.createUser );

app.put('/:id',usersControllers.updateUser );

app.delete('/:id', usersControllers.deleteUser);


module.exports = app;

