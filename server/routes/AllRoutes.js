const express = require('express');
const app = express.Router();
const usersRoutes = require('./usersRoutes');
const ordersRoutes = require('./ordersRoute');
const passwordsRoutes = require('./passwordsRoutes');
const productsRoutes = require('./productsRoute');
const eventsRoutes = require('./eventRoutes');
const loginRoute = require('./LoginRoute');
const tokenActions = require('../modules/token');
const signupRoute=require('../routes/singUpRoute')
app.use('/login', loginRoute);
app.use('/signup',signupRoute );
app.use('/passwords', passwordsRoutes);

app.use((req, res, next) => {
    try {
        if(tokenActions.validateToken(req.get('XAuthentication-Token')))
            {
            req.securityLevel=tokenActions.statusToken(req.get('XAuthentication-Token'));
            next();
            }
        else {
            res.status(404).json({'error': 'invalid token'});
        }
    } catch {
        res.status(500).json({'error': 'internal server error'});
    }
})

app.use('/users', usersRoutes ); 
app.use('/products', productsRoutes); 
app.use('/orders', ordersRoutes );
 app.use('/events',eventsRoutes );



module.exports = app;  

