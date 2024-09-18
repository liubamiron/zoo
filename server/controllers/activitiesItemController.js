const ApiError = require("../error/ApiError");
const {ActivitiesItem} = require("../models/models");
const uuid = require('uuid');
const path = require('path');

class ActivitiesItemController {
    async create(req, res, next) {
        try {
        const {
            title_ru, title_ro, title_en,
            short_description_ru, short_description_ro, short_description_en,
            long_description_ru, long_description_ro, long_description_en,
        } = req.body

        const { img_1, img_2 } = req.files || {};

        // Initialize file names
        let fileName1 = null;
        let fileName2 = null;

        if (img_1) {
            // Generate unique file name for the first image
            fileName1 = uuid.v4() + ".jpg";
            // Move image to the static folder
            img_1.mv(path.resolve(__dirname, '..', 'static', fileName1));
        }

        if (img_2) {
            // Generate unique file name for the second image
            fileName2 = uuid.v4() + ".jpg";
            // Move image to the static folder
            img_2.mv(path.resolve(__dirname, '..', 'static', fileName2));
        }

        const activitiesItem = await ActivitiesItem.create({
            title_ru, title_ro, title_en,
            short_description_ru, short_description_ro, short_description_en,
            long_description_ru, long_description_ro, long_description_en,
            img_1: fileName1,
            img_2: fileName2
        })
        return res.json(activitiesItem)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res) {
        const activitiesItem = await ActivitiesItem.findAll()
        return res.json(activitiesItem)
    }
    async getOne(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const activitiesItem = await ActivitiesItem.findOne({where: {id}}); // Find one record by id

            if (!activitiesItem) {
                // If no record was found with the given id
                return res.status(404).json({message: 'ActivitiesItem not found'});
            }

            return res.json(activitiesItem);
        } catch (error) {
            next(ApiError.internal('Failed to fetch ActivitiesItem'));
        }
    }
    async edit(req, res, next) {
        try {
            const { id } = req.params; // Get the ID from the request parameters
            const {
                title_ru, title_ro, title_en,
                short_description_ru, short_description_ro, short_description_en,
                long_description_ru, long_description_ro, long_description_en } = req.body; // Get the new values from the request body

            const { img_1, img_2 } = req.files || {};

            const activitiesItem = await ActivitiesItem.findOne({ where: { id } });

            if (!activitiesItem) {
                return res.status(404).json({ message: 'activitiesItem not found' });
            }
            // Update images if provided
            if (img_1) {
                let fileName1 = uuid.v4() + ".jpg";
                img_1.mv(path.resolve(__dirname, '..', 'static', fileName1));
                activitiesItem.img_1 = fileName1;
            }

            if (img_2) {
                let fileName2 = uuid.v4() + ".jpg";
                img_2.mv(path.resolve(__dirname, '..', 'static', fileName2));
                activitiesItem.img_2 = fileName2;
            }

            Object.assign(activitiesItem, {
                // Update the news item with new values
                title_ru : title_ru || activitiesItem.title_ru,
                title_ro : title_ro || activitiesItem.title_ro,
                title_en : title_en || activitiesItem.title_en,

                short_description_ru : short_description_ru || activitiesItem.short_description_ru,
                short_description_ro : short_description_ro || activitiesItem.short_description_ro,
                short_description_en : short_description_en || activitiesItem.short_description_en,

                long_description_ru : long_description_ru || activitiesItem.long_description_ru,
                long_description_ro : long_description_ro || activitiesItem.long_description_ro,
                long_description_en : long_description_en || activitiesItem.long_description_en,
            });
            // Save the updated record
            await activitiesItem.save();
            return res.json({ message: 'activitiesItem updated successfully', activitiesItem });
        } catch (error) {
            next(ApiError.internal('Failed to update activitiesItem'));
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const deletedCount = await ActivitiesItem.destroy({where: {id}}); // Use the destroy method

            if (deletedCount === 0) {
                // If no record was deleted, the id wasn't found
                return res.status(404).json({message: 'ActivitiesItem not found'});
            }

            return res.json({message: 'ActivitiesItem deleted successfully'});
        } catch (error) {
            next(ApiError.internal('Failed to delete ActivitiesItem'));
        }
    }
}

module.exports = new ActivitiesItemController()