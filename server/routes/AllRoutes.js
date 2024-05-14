const express = require('express');
const app = express.Router();
const UsersRoutes = require('./usersRoutes');
const OrdersRoutes = require('./ordersRoute');
const ProductsRoutes = require('./productsRoute');
const EventsRoutes = require('./eventRoutes');
const LoginRoute = require('./LoginRoute');
const LoginController = require('../controllers/LoginController');

app.use('/login', LoginRoute);


// app.use((req, res, next) => {
//     try {
//         if(LoginController.validateToken(req.get('Authentication-Token')))
//             next();
//         else {
//             res.status(404).json({'error': 'invalid token'});
//         }
//     } catch {
//         res.status(500).json({'error': 'internal server error'});
//     }
// })

app.use('/users', UsersRoutes);
app.use('/products', ProductsRoutes);
app.use('/orders', OrdersRoutes);
 app.use('/events',EventsRoutes );
// app.use('/passwords', PasswordsRoutes);



module.exports = app;  

