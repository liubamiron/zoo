const {TypeTender} = require("../models/models");
const ApiError = require('../error/ApiError');

class TypeTenderController {
    async create(req, res) {
        const {name_ru, name_ro, name_en } =req.body
        const type = await TypeTender.create({name_ru, name_ro, name_en })
        return res.json(type)

    }

    async getAll(req, res) {
        const typesTenders = await TypeTender.findAll()
        return res.json(typesTenders)

    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Get the id from the request parameters
            const typeTender = await TypeTender.findOne({ where: { id } }); // Find one record by id

            if (!typeTender) {
                // If no record was found with the given id
                return res.status(404).json({ message: 'TypeTender not found' });
            }

            return res.json(typeTender);
        } catch (error) {
            next(ApiError.internal('Failed to fetch TypeTender'));
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params; // Get the ID from the request parameters
            const { name_ru, name_ro, name_en } = req.body; // Get the new values from the request body

            const typeTender = await TypeTender.findOne({ where: { id } });

            if (!typeTender) {
                return res.status(404).json({ message: 'TypeAnimal not found' });
            }

            typeTender.name_ru = name_ru || typeTender.name_ru;
            typeTender.name_ro = name_ro || typeTender.name_ro;
            typeTender.name_en = name_en || typeTender.name_en;

            // Save the updated record
            await typeTender.save();

            return res.json({ message: 'TypeTender updated successfully', typeTender });
        } catch (error) {
            next(ApiError.internal('Failed to update TypeTender'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params; // Get the id from the request parameters
            const deletedCount = await TypeTender.destroy({ where: { id } }); // Use the destroy method

            if (deletedCount === 0) {
                // If no record was deleted, the id wasn't found
                return res.status(404).json({ message: 'TypeTender not found' });
            }

            return res.json({ message: 'TypeTender deleted successfully' });
        } catch (error) {
            next(ApiError.internal('Failed to delete TypeTender'));
        }
    }
}

module.exports = new TypeTenderController()