
const ApiError = require('../error/ApiError');
const {Review} = require("../models/models");

class ReviewController {
    async create(req, res, next) {
        try {
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
            rating
        } =req.body

            // Ensure rating is a valid number or null
            const parsedRating = parseFloat(rating);
            const validRating = isNaN(parsedRating) ? null : parsedRating;

        const review = await Review.create({
            title_ru,
            title_ro,
            title_en,
            short_description_ru,
            short_description_ro,
            short_description_en,
            long_description_ru,
            long_description_ro,
            long_description_en,
            rating: validRating
        })
        return res.json(review)
        } catch (error) {
            next(ApiError.internal('Failed to create review'));
        }
    }

    async getAll(req, res) {
        const review = await Review.findAll()
        return res.json(review)
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Get the id from the request parameters
            const review = await Review.findOne({ where: { id } }); // Find one record by id

            if (!review) {
                // If no record was found with the given id
                return res.status(404).json({ message: 'Review not found' });
            }

            return res.json(review);
        } catch (error) {
            next(ApiError.internal('Failed to fetch Review'));
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
                long_description_en,
                rating
            } = req.body; // Get the new values from the request body

            const review = await Review.findOne({ where: { id } });

            if (!Review) {
                return res.status(404).json({ message: 'Reviews not found' });
            }
            review.title_ru = title_ru || review.title_ru;
            review.title_ro = title_ro || review.title_ro;
            review.title_en = title_en || review.title_en;
            review.short_description_ru = short_description_ru || review.short_description_ru;
            review.short_description_ro = short_description_ro || review.short_description_ro;
            review.short_description_en = short_description_en || review.short_description_en;
            review.long_description_ru = long_description_ru || review.long_description_ru;
            review.long_description_ro = long_description_ro || review.long_description_ro;
            review.long_description_en = long_description_en || review.long_description_en;
            review.rating = rating || review.rating;

            // Save the updated record
            await review.save();

            return res.json({ message: 'Review updated successfully', review });
        } catch (error) {
            next(ApiError.internal('Failed to update Review'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params; // Get the id from the request parameters
            const deletedCount = await Review.destroy({ where: { id } }); // Use the destroy method

            if (deletedCount === 0) {
                // If no record was deleted, the id wasn't found
                return res.status(404).json({ message: 'Review not found' });
            }

            return res.json({ message: 'Review deleted successfully' });
        } catch (error) {
            next(ApiError.internal('Failed to delete Review'));
        }
    }
}


module.exports = new ReviewController()