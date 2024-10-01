const ApiError = require("../error/ApiError");
const {HomePage} = require("../models/models");
const uuid = require('uuid');
const path = require('path');

class HomePageController {

    async create(req, res, next) {
        try {
            const {
                title_ru,
                title_ro,
                title_en,
                title1_ru,
                title1_ro,
                title1_es,
                description1_ru,
                description1_ro,
                description1_en,
                short_description_ru,
                short_description_ro,
                short_description_en,
                long_description_ru,
                long_description_ro,
                long_description_en,
            } = req.body;

            const { img_1, img_2, img_3 } = req.files;

            // Generate unique file names for both images
            let fileName1 = uuid.v4() + ".jpg";
            let fileName2 = uuid.v4() + ".jpg";
            let fileName3 = uuid.v4() + ".jpg";

            // Move images to the static folder
            img_1.mv(path.resolve(__dirname, '..', 'static', fileName1));
            img_2.mv(path.resolve(__dirname, '..', 'static', fileName2));
            img_3.mv(path.resolve(__dirname, '..', 'static', fileName3));
            // Check if files exist and assign them
            // Create  entry
            const homePage = await HomePage.create({
                title_ru,
                title_ro,
                title_en,
                title1_ru,
                title1_ro,
                title1_es,
                description1_ru,
                description1_ro,
                description1_en,
                short_description_ru,
                short_description_ro,
                short_description_en,
                long_description_ru,
                long_description_ro,
                long_description_en,
                img_1: fileName1,
                img_2: fileName2,
                img_3: fileName3
            });

            return res.json(homePage);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const homePages = await HomePage.findAll()
        return res.json(homePages)
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const homePage = await HomePage.findOne({ where: { id } });

            if (!homePage) {
                // If no record was found with the given id
                return res.status(404).json({message: 'HomePage not found'});
            }

            return res.json(homePage);
        } catch (error) {
            next(ApiError.internal('Failed to fetch HomePage Editor'));
        }
    }

    async edit(req, res, next) {
        try {
            const {id} = req.params; // Get the ID from the request parameters
            const {
                title_ru,
                title_ro,
                title_en,
                title1_ru,
                title1_ro,
                title1_en,
                description1_ru,
                description1_ro,
                description1_en,
                short_description_ru,
                short_description_ro,
                short_description_en,
                long_description_ru,
                long_description_ro,
                long_description_en,
            } = req.body; // Get the new values from the request body

            const { img_1, img_2, img_3 } = req.files || {};

            // Find the existing animal record by id
            const homePage = await HomePage.findOne({ where: { id } });

            if (!homePage) {
                return res.status(404).json({ message: 'Home Page data not found' });
            }

            // Update images if provided
            if (img_1) {
                let fileName1 = uuid.v4() + ".jpg";
                img_1.mv(path.resolve(__dirname, '..', 'static', fileName1));
                homePage.img_1 = fileName1;
            }

            if (img_2) {
                let fileName2 = uuid.v4() + ".jpg";
                img_2.mv(path.resolve(__dirname, '..', 'static', fileName2));
                homePage.img_2 = fileName2;
            }

            if (img_3) {
                let fileName3 = uuid.v4() + ".jpg";
                img_3.mv(path.resolve(__dirname, '..', 'static', fileName3));
                homePage.img_3 = fileName3;
            }

            // Update other fields only if they are provided in the request
            Object.assign(homePage, {
                title_ru: title_ru || homePage.title_ru,
                title_ro: title_ro || homePage.title_ro,
                title_en: title_en || homePage.title_en,
                title1_ru: title1_ru || homePage.title1_ru,
                title1_ro: title1_ro || homePage.title1_ro,
                title1_en: title1_en || homePage.title1_en,
                description1_ru: description1_ru || homePage.description1_ru,
                description1_ro: description1_ro || homePage.description1_ro,
                description1_en: description1_en || homePage.description1_en,
                short_description_ru: short_description_ru || homePage.short_description_ru,
                short_description_ro: short_description_ro || homePage.short_description_ro,
                short_description_en: short_description_en || homePage.short_description_en,
                long_description_ru: long_description_ru || homePage.long_description_ru,
                long_description_ro: long_description_ro || homePage.long_description_ro,
                long_description_en: long_description_en || homePage.long_description_en,
            });

            // Save the updated record
            await homePage.save();

            return res.json({message: 'HomePage updated successfully', homePage});
        } catch (error) {
            next(ApiError.internal('Failed to update HomePage'));
        }
    }


    async delete(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const deletedCount = await HomePage.destroy({where: {id}}); // Use the destroy method

            if (deletedCount === 0) {
                // If no record was deleted, the id wasn't found
                return res.status(404).json({message: 'Post not found'});
            }

            return res.json({message: 'Post deleted successfully'});
        } catch (error) {
            next(ApiError.internal('Failed to delete Post'));
        }
    }
}

module.exports = new HomePageController()