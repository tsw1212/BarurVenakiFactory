const express = require("express");
const app = express.Router();
const eventsController=require('../controllers/eventsController')

app.get('/',eventsController.getAllEvents );

app.get('/:id',eventsController.getEventByID);

app.post('/', eventsController.createEvent);

app.put('/:id', eventsController.updateEvent);

app.delete('/:id', eventsController.deleteEvent);

module.exports = app;
