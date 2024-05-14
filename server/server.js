const express = require('express');
const app = express();
const router = express.Router();
 const allRoutes = require('./routes/AllRoutes');
const cors = require('cors');
const db_init = require('./DB_access/initDB')
require('dotenv').config();
 // db_init.createDB();
// db_init.createUsersTable();
// db_init.createOrdersTable();
// db_init.createEventsTable();
// db_init.createProductsTable();
// db_init.createProductOrderTable();
// db_init.createManagersTable();
// Middleware
app.use (cors ({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization', "Authentication-Token", "Access-Control-Expose-Headers"],
    credentials: true}))

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routes
 app.use('/', allRoutes);

 app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
const host = process.env.HOST;
const port = process.env.PORT;
app.listen(port, host, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});



