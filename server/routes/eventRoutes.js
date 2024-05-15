const express = require("express");
const app = express.Router();
const EventsController = require("../controllers/eventControllers");
const validation = require('../modules/validation');

app.get('/', async (req, res) => {
    if (req.securityLevel !== "manager")
        res.status(401).json({ error: "unauthorized" });
    else {
        try {
            let events = await EventsController.getAllEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ error: "server internal error" });
        }
    }
});

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let event = await EventsController.getEventById(id);
        if (!event) {
            res.status(404).json({ error: "event not found" });
        } else {
            res.status(200).json(event);
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
});

app.post('/', async (req, res) => {
    try {
        const event = req.body;
        if (!validation.validateEventsInput(event)) {
            res.status(400).json({ error: 'invalid input' });
        } else {
            const newEvents = await EventsController.createEvent(event);
            res.status(200).json(newEvents);
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
});

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let updatedEventsData = req.body;
        if (!validation.validateEventsInput(updatedEventsData, true)) {
            res.status(400).json({ error: 'invalid input' });
        } else if (await EventsController.getEventById(id) === null) {
            res.status(404).json({ error: "event not found" });
        } else {
            updatedEventsData = await EventsController.updateEvent(updatedEventsData);
            res.status(200).json(updatedEventsData);
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (await EventsController.getEventById(id) === null) {
            res.status(404).json({ error: "event not found" });
        } else {
            await EventsController.deleteEvent(id);
            res.status(200).json({});
        }
    } catch (error) {
        res.status(500).json({ error: "server internal error" });
    }
});

module.exports = app;
