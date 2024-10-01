const ApiError = require("../error/ApiError");
const {NewsItem, TypeAnimal} = require("../models/models");
const uuid = require('uuid');
const path = require('path');

class NewsItemController {
    async create(req, res) {
        const {
            title_ru,
            title_ro,
            title_en,
            short_description_ru,
            short_description_ro,
            short_description_en,
            long_description_ru,
            long_description_ro,
            long_description_en,
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


        const newsItem = await NewsItem.create({
            title_ru,
            title_ro,
            title_en,
            short_description_ru,
            short_description_ro,
            short_description_en,
            long_description_ru,
            long_description_ro,
            long_description_en,
            img_1: fileName1,  // Store the file name if the image was provided
            img_2: fileName2
        })
        return res.json(newsItem)

    }

    async getAll(req, res) {
        const newsItem = await NewsItem.findAll()
        return res.json(newsItem)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const newsItem = await NewsItem.findOne({where: {id}}); // Find one record by id

            if (!newsItem) {
                // If no record was found with the given id
                return res.status(404).json({message: 'NewsItem not found'});
            }

            return res.json(newsItem);
        } catch (error) {
            next(ApiError.internal('Failed to fetch NewsItem'));
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params; // Get the ID from the request parameters
            const {
                title_ru,
                title_ro,
                title_en,
                short_description_ru,
                short_description_ro,
                short_description_en,
                long_description_ru,
                long_description_ro,
                long_description_en } = req.body; // Get the new values from the request body

            const { img_1, img_2 } = req.files || {};

            const newsItem = await NewsItem.findOne({ where: { id } });

            if (!newsItem) {
                return res.status(404).json({ message: 'newsItem not found' });
            }

            // Update images if provided
            if (img_1) {
                let fileName1 = uuid.v4() + ".jpg";
                img_1.mv(path.resolve(__dirname, '..', 'static', fileName1));
                newsItem.img_1 = fileName1;
            }

            if (img_2) {
                let fileName2 = uuid.v4() + ".jpg";
                img_2.mv(path.resolve(__dirname, '..', 'static', fileName2));
                newsItem.img_2 = fileName2;
            }

            Object.assign(newsItem, {
                // Update the news item with new values
                title_ru : title_ru || newsItem.title_ru,
                title_ro : title_ro || newsItem.title_ro,
                title_en : title_en || newsItem.title_en,

                short_description_ru : short_description_ru || newsItem.short_description_ru,
                short_description_ro : short_description_ro || newsItem.short_description_ro,
                short_description_en : short_description_en || newsItem.short_description_en,

                long_description_ru : long_description_ru || newsItem.long_description_ru,
                long_description_ro : long_description_ro || newsItem.long_description_ro,
                long_description_en : long_description_en || newsItem.long_description_en,
            });

            // Save the updated record
            await newsItem.save();

            return res.json({ message: 'NewsItem updated successfully', NewsItem });
        } catch (error) {
            next(ApiError.internal('Failed to update NewsItem'));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const deletedCount = await NewsItem.destroy({where: { id }}); // Use the destroy method

            if (deletedCount === 0) {
                // If no record was deleted, the id wasn't found
                return res.status(404).json({message: 'NewsItem not found'});
            }

            return res.json({message: 'NewsItem deleted successfully'});
        } catch (error) {
            next(ApiError.internal('Failed to delete NewsItem'));
        }
    }
}

module.exports = new NewsItemController()