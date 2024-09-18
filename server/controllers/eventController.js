const ApiError = require("../error/ApiError");
const {Event} = require("../models/models");

class EventController {

    async create(req, res, next) {
        try {
            const {
                title_ru, title_ro, title_en,
                time_event, start_date_event, end_date_event,
                short_description_ru, short_description_ro, short_description_en,
                long_description_ru, long_description_ro, long_description_en
            } = req.body;


            const event = await Event.create({
                title_ru, title_ro, title_en,
                time_event, start_date_event, end_date_event,
                short_description_ru, short_description_ro, short_description_en,
                long_description_ru, long_description_ro, long_description_en
            });

            return res.json(event);
        } catch (error) {
            next(ApiError.internal('Failed to create Event'));
        }
    }

    async getAll(req, res) {
        const event = await Event.findAll()
        return res.json(event)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const event = await Event.findOne({where: {id}}); // Find one record by id

            if (!event) {
                // If no record was found with the given id
                return res.status(404).json({message: 'Event not found'});
            }

            return res.json(event);
        } catch (error) {
            next(ApiError.internal('Failed to fetch Event'));
        }
    }

    async edit(req, res, next) {
        try {
            const {id} = req.params; // Get the ID from the request parameters
            const { title_ru, title_ro, title_en,
                time_event, start_date_event, end_date_event,
                short_description_ru, short_description_ro, short_description_en,
                long_description_ru, long_description_ro, long_description_en} = req.body; // Get the new values from the request body

            const event = await Event.findOne({where: {id}});

            if (!event) {
                return res.status(404).json({message: 'TypeAnimal not found'});
            }

            event.title_ru = title_ru || event.title_ru;
            event.title_ro = title_ro || event.title_ro;
            event.title_en = title_en || event.title_en;
            event.time_event = time_event || event.time_event;
            event.start_date_event = start_date_event || event.start_date_event;
            event.end_date_event = end_date_event || event.end_date_event;
            event.short_description_ru = short_description_ru || event.short_description_ru;
            event.short_description_ro = short_description_ro || event.short_description_ro;
            event.short_description_en = short_description_en || event.short_description_en;
            event.long_description_ru = long_description_ru || event.long_description_ru;
            event.long_description_ro = long_description_ro || event.long_description_ro;
            event.long_description_en = long_description_en || event.long_description_en;
            // Save the updated record
            await event.save();

            return res.json({message: 'Event updated successfully', event});
        } catch (error) {
            next(ApiError.internal('Failed to update event'));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const deletedCount = await Event.destroy({where: {id}}); // Use the destroy method

            if (deletedCount === 0) {
                // If no record was deleted, the id wasn't found
                return res.status(404).json({message: 'Event not found'});
            }

            return res.json({message: 'Event deleted successfully'});
        } catch (error) {
            next(ApiError.internal('Failed to delete Event'));
        }
    }
}

module.exports = new EventController()