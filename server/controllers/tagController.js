const ApiError = require('../error/ApiError');
const {Tag} = require("../models/models");

class TagController {
    async create(req, res) {
        const {name_ru, name_ro, name_en, } = req.body
        const tag = await Tag.create({
            name_ru,
            name_ro,
            name_en,
            })
        return res.json(tag)

    }

    async getAll(req, res) {
        const tag = await Tag.findAll()
        return res.json(tag)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const tag = await Tag.findOne({where: {id}}); // Find one record by id

            if (!tag) {
                // If no record was found with the given id
                return res.status(404).json({message: 'Tag not found'});
            }

            return res.json(tag);
        } catch (error) {
            next(ApiError.internal('Failed to fetch Tag'));
        }
    }

    async edit(req, res, next) {
        try {
            const {id} = req.params;
            const {name_ru, name_ro, name_en} = req.body;

            const tag = await Tag.findOne({where: {id}});

            if (!tag) {
                return res.status(404).json({message: 'Tag not found'});
            }

            Object.assign(tag, {
                name_ru: name_ru || tag.name_ru,
                name_ro: name_ro || tag.name_ro,
                name_en: name_en || tag.name_en,
            })

            // Save the updated record
            await tag.save();

            return res.json({message: 'Tag updated successfully', tag});
        } catch (error) {
            next(ApiError.internal('Failed to update Tag'));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const deletedCount = await Tag.destroy({where: {id}}); // Use the destroy method

            if (deletedCount === 0) {
                // If no record was deleted, the id wasn't found
                return res.status(404).json({message: 'Tag not found'});
            }

            return res.json({message: 'Tag deleted successfully'});
        } catch (error) {
            next(ApiError.internal('Failed to delete Tag'));
        }
    }
}


module.exports = new TagController()