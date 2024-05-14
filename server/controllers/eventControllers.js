const DB_actions = require('../DB_access/eventsDB_handler');

const EventsController = {
    createEvent: async (event) => {
        return await DB_actions.createEvent(event);
    },

    getAllEvents: async () => {
        return await DB_actions.getAllEvents();
    },

    getEventById: async (id) => {
        return await DB_actions.getEventById(id);
    },

    updateEvent: async (updatedEventData) => {
        return await DB_actions.updateEvent(updatedEventData);
    },

    deleteEvent: async (id) => {
        await DB_actions.deleteEvent(id);
    },
};

module.exports = EventsController;
