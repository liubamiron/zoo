const ApiError = require('../error/ApiError');
const {WeekHours} = require("../models/models"); // Assuming you're using a custom error handling class

class weekHoursController {
    // Create a new record for week hours
    async create(req, res, next) {
        try {
            const { dayOfWeek, openTime, closeTime } = req.body;

            // Check if a record already exists for the given day
            const existingDay = await WeekHours.findOne({ where: { dayOfWeek } });
            if (existingDay) {
                return res.status(400).json({ message: 'Week hours for this day already exist' });
            }

            const weekHours = await WeekHours.create({ dayOfWeek, openTime, closeTime });
            return res.json(weekHours);
        } catch (error) {
            next(ApiError.internal('Failed to create week hours'));
        }
    }

    // Get all week hours
    async getAll(req, res, next) {
        try {
            const weekHours = await WeekHours.findAll();
            return res.json(weekHours);
        } catch (error) {
            next(ApiError.internal('Failed to fetch week hours'));
        }
    }

    // Get week hours by ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const weekHours = await WeekHours.findOne({ where: { id } });

            if (!weekHours) {
                return res.status(404).json({ message: 'Week hours not found' });
            }

            return res.json(weekHours);
        } catch (error) {
            next(ApiError.internal('Failed to fetch week hours'));
        }
    }

    // Update week hours by ID
    async edit(req, res, next) {
        try {
            const { id } = req.params;
            const { dayOfWeek, openTime, closeTime } = req.body;

            const weekHours = await WeekHours.findOne({ where: { id } });

            if (!weekHours) {
                return res.status(404).json({ message: 'Week hours not found' });
            }

            weekHours.dayOfWeek = dayOfWeek || weekHours.dayOfWeek;
            weekHours.openTime = openTime || weekHours.openTime;
            weekHours.closeTime = closeTime || weekHours.closeTime;

            await weekHours.save();

            return res.json({ message: 'Week hours updated successfully', weekHours });
        } catch (error) {
            next(ApiError.internal('Failed to update week hours'));
        }
    }

    // Delete week hours by ID
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedCount = await WeekHours.destroy({ where: { id } });

            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Week hours not found' });
            }

            return res.json({ message: 'Week hours deleted successfully' });
        } catch (error) {
            next(ApiError.internal('Failed to delete week hours'));
        }
    }
}

module.exports = new weekHoursController();
