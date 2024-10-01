const ApiError = require("../error/ApiError");
const {Faq} = require("../models/models");


class FaqController {
    async create(req, res) {
        const {
            question_ru,
            question_ro,
            question_en,
            answer_ru,
            answer_ro,
            answer_en
        } = req.body
        const faq = await Faq.create({
            question_ru,
            question_ro,
            question_en,
            answer_ru,
            answer_ro,
            answer_en
        })
        return res.json(faq)

    }

    async getAll(req, res) {
        const faq = await Faq.findAll()
        return res.json(faq)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const faq = await Faq.findOne({where: {id}}); // Find one record by id

            if (!faq) {
                // If no record was found with the given id
                return res.status(404).json({message: 'Faq not found'});
            }

            return res.json(faq);
        } catch (error) {
            next(ApiError.internal('Failed to fetch Faq'));
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params; // Get the ID from the request parameters
            const {
                question_ru, question_ro, question_en,
                answer_ru, answer_ro, answer_en
            } = req.body; // Get the new values from the request body

            const faq = await Faq.findOne({ where: { id } });

            if (!faq) {
                return res.status(404).json({ message: 'TypeAnimal not found' });
            }

            faq.question_ru = question_ru || faq.question_ru;
            faq.question_ro = question_ro || faq.question_ro;
            faq.question_en = question_en || faq.question_en;
            faq.answer_ru = answer_ru || faq.answer_ru;
            faq.answer_ro = answer_ro || faq.answer_ro;
            faq.answer_en = answer_en || faq.answer_en;

            // Save the updated record
            await faq.save();

            return res.json({ message: 'Faq updated successfully', Faq });
        } catch (error) {
            next(ApiError.internal('Failed to update Faq'));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const deletedCount = await Faq.destroy({where: {id}}); // Use the destroy method

            if (deletedCount === 0) {
                // If no record was deleted, the id wasn't found
                return res.status(404).json({message: 'Faq not found'});
            }

            return res.json({message: 'Faq deleted successfully'});
        } catch (error) {
            next(ApiError.internal('Failed to delete Faq'));
        }
    }
}

module.exports = new FaqController()