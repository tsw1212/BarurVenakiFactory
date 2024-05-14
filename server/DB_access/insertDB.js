const mysql = require("mysql");
const connect = require("./ConnectDB");
require("dotenv").config();

const insertData = () => {
    const connection = connect();

    // Insert data into Users table
    const insertUsers = `
      INSERT INTO Users (name, email, city, street, houseNumber, password, username, phone1, phone2)
      VALUES 
        ('John Doe', 'john.doe@example.com', 'New York', '5th Avenue', '123', 'password1', 'johndoe', '1234567890', '0987654321'),
        ('Jane Smith', 'jane.smith@example.com', 'Los Angeles', 'Sunset Blvd', '456', 'password2', 'janesmith', '1234567890', NULL)
    `;

    connection.query(insertUsers, (err, result) => {
        if (err) throw err;
        console.log("Inserted data into Users table");
    });

    // Insert data into Orders table
    const insertOrders = `
      INSERT INTO Orders (userId, date, status, remarks)
      VALUES 
        (1, '2024-05-14 10:30:00', 'Pending', 'First order'),
        (2, '2024-05-14 11:45:00', 'Shipped', 'Second order')
    `;

    connection.query(insertOrders, (err, result) => {
        if (err) throw err;
        console.log("Inserted data into Orders table");
    });

    // Insert data into Events table
    const insertEvents = `
      INSERT INTO Events (orderId, text, date)
      VALUES 
        (1, 'Order placed successfully.', '2024-05-14 10:30:00'),
        (2, 'Order shipped to customer.', '2024-05-14 11:45:00')
    `;

    connection.query(insertEvents, (err, result) => {
        if (err) throw err;
        console.log("Inserted data into Events table");
    });

    // Insert data into Products table
    const insertProducts = `
      INSERT INTO Products (name, weight, package, imgUrl, inventory)
      VALUES 
        ('Product A', 1.00, 'Box', 'http://example.com/imageA.jpg', 100),
        ('Product B', 2.50, 'Bag', 'http://example.com/imageB.jpg', 200)
    `;

    connection.query(insertProducts, (err, result) => {
        if (err) throw err;
        console.log("Inserted data into Products table");
    });

    // Insert data into ProductOrder table
    const insertProductOrder = `
      INSERT INTO ProductOrder (orderId, productId, amount)
      VALUES 
        (1, 1, 10),
        (2, 2, 20)
    `;

    connection.query(insertProductOrder, (err, result) => {
        if (err) throw err;
        console.log("Inserted data into ProductOrder table");
    });

    // Insert data into Managers table
    const insertManagers = `
      INSERT INTO Managers (id)
      VALUES 
        (1),
        (2)
    `;

    connection.query(insertManagers, (err, result) => {
        if (err) throw err;
        console.log("Inserted data into Managers table");
    });

    connection.end();
};

insertData();
