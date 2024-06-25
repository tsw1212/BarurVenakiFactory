const express = require('express');
const app = express.Router();
const usersRoutes = require('./usersRoutes');
const ordersRoutes = require('./ordersRoute');
const passwordsRoutes = require('./passwordsRoutes');
const productsRoutes = require('./productsRoute');
const eventsRoutes = require('./eventRoutes');
const loginRoute = require('./LoginRoute');
const tokenActions = require('../../modules/token');
const signupRoute = require('./singUpRoute');
const guest_tokenRoute = require('./gueust_token');
const managersRoute = require('./managerRoute');
const cartRoutes = require('./cartRoutes');
const factoryRoutes = require('./factoryRoutes');
const productOrderRoute = require('./productOrderRoute');
const LogOutRoute = require('./logOutRoute');



app.use('/guest_token', guest_tokenRoute);

app.use((req, res, next) => {
    try {
        const token=req.get('XAuthentication-Token');
        const status = tokenActions.statusToken(token);
        if (!status) {
            res.status(401).json({ 'error': 'invalid token' });
        }
        else{
            req.securityLevel =status.status;
            req.userId=status.id;
            next();
        }
    } catch {
        res.status(500).json({ 'error': 'internal server error' });
    }

});
app.use('/managers', managersRoute);
app.use('/login', loginRoute);
app.use('/logOut', LogOutRoute);
app.use('/signup', signupRoute);
app.use('/passwords', passwordsRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/events', eventsRoutes);
app.use('/cart', cartRoutes);
app.use('/factory', factoryRoutes);
app.use('/productOrder', productOrderRoute);


module.exports = app;

