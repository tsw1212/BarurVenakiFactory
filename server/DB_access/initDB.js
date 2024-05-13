const mysql = require("mysql");
const connect = require("./ConnectDB");
require("dotenv").config();

const createDB = () => {
    const config = {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
    };

    const connection = mysql.createConnection(config);

    connection.connect((err) => {
        if (err) throw err;
        console.log("Successfully connected to MySQL");
        connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB}`, function (err) {
            if (err) throw err;
            console.log("Database created successfully");
            connection.end();
        });
    });
}

const createUsersTable = () => {
    const connection = connect();
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        street VARCHAR(255) NOT NULL,
        houseNumber VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        phone1 VARCHAR(20) NOT NULL,
        phone2 VARCHAR(20)
    )
    `;

    connection.query(createUsersTable, (err, result) => {
        if (err) throw err;
        console.log("Users table has been created successfully");
        connection.end();
    });
};

const createOrdersTable = () => {
    const connection = connect();
    const createOrdersTableQuery = `
    CREATE TABLE IF NOT EXISTS Orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        date DATETIME,
        status VARCHAR(255),
        remarks TEXT,
        FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
    )
  `;

    connection.query(createOrdersTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Orders table has been created successfully");
        connection.end();
    });
};

const createEventsTable = () => {
    const connection = connect();
    const createEventsTableQuery = `
      CREATE TABLE IF NOT EXISTS Events (
          id INT AUTO_INCREMENT PRIMARY KEY,
          orderId INT,
          text TEXT,
          date DATETIME,
          FOREIGN KEY (orderId) REFERENCES Orders(id) ON DELETE CASCADE
      )
    `;

    connection.query(createEventsTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Events table has been created successfully");
        connection.end();
    });
};


const createProductsTable = () => {
    const connection = connect();
    const createProductsTableQuery = `
      CREATE TABLE IF NOT EXISTS Products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          weight DECIMAL(10,2) NOT NULL,
          package VARCHAR(255),
          imgUrl VARCHAR(255),
          inventory INT
      )
    `;

    connection.query(createProductsTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Products table has been created successfully");
        connection.end();
    });
};


const createProductOrderTable = () => {
    const connection = connect();
    const createProductOrderTableQuery = `
      CREATE TABLE IF NOT EXISTS ProductOrder (
          orderId INT,
          productId INT,
          amount INT,
          PRIMARY KEY (orderId, productId),
          FOREIGN KEY (orderId) REFERENCES Orders(id) ON DELETE CASCADE,
          FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE
      )
    `;

    connection.query(createProductOrderTableQuery, (err, result) => {
        if (err) throw err;
        console.log("ProductOrder table has been created successfully");
        connection.end();
    });
};

const createManagersTable = () => {
    const connection = connect();
    const createManagersTableQuery = `
      CREATE TABLE IF NOT EXISTS Managers (
          id INT PRIMARY KEY,
          FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
      )
    `;
  
    connection.query(createManagersTableQuery, (err, result) => {
      if (err) throw err;
      console.log("Managers table has been created successfully");
      connection.end();
    });
  };
  



module.exports = {
    createUsersTable,
    createDB,
    createProductsTable,
    createProductOrderTable,
    createEventsTable,
    createManagersTable,
    createOrdersTable
};
