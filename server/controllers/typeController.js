const {Type, Animal} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const { name_ru, name_ro, name_en } = req.body;

        const typeAnimal = await Type.create({
            name_ru,
            name_ro,
            name_en
        });

        return res.json(typeAnimal);
    }

    async getAll(req, res) {
        const typesAnimals = await Type.findAll(
            {
                include: [{model: Animal, as: 'animals'}]
            }
        )
        return res.json(typesAnimals)

    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Get the id from the request parameters
            const typeAnimal = await Type.findOne({
                where: { id },
                include: [{model: Animal, as: 'animals'}]
                }); // Find one record by id

            if (!typeAnimal) {
                // If no record was found with the given id
                return res.status(404).json({ message: 'Type not found' });
            }

            return res.json(typeAnimal);
        } catch (error) {
            next(ApiError.internal('Failed to fetch Type'));
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params; // Get the ID from the request parameters
            const { name_ru, name_ro, name_en } = req.body; // Get the new values from the request body

            const typeAnimal = await Type.findOne({ where: { id } });

            if (!typeAnimal) {
                return res.status(404).json({ message: 'Type not found' });
            }

            typeAnimal.name_ru = name_ru || typeAnimal.name_ru;
            typeAnimal.name_ro = name_ro || typeAnimal.name_ro;
            typeAnimal.name_en = name_en || typeAnimal.name_en;

            // Save the updated record
            await typeAnimal.save();

            return res.json({ message: 'TypeAnimal updated successfully', typeAnimal });
        } catch (error) {
            next(ApiError.internal('Failed to update TypeAnimal'));
        }
    }


    async delete(req, res, next) {
        try {
            const { id } = req.params; // Get the id from the request parameters
            const deletedCount = await Type.destroy({ where: { id } }); // Use the destroy method

            if (deletedCount === 0) {
                // If no record was deleted, the id wasn't found
                return res.status(404).json({ message: 'TypeAnimal not found' });
            }

            return res.json({ message: 'TypeAnimal deleted successfully' });
        } catch (error) {
            next(ApiError.internal('Failed to delete TypeAnimal'));
        }
    }
}

module.exports = new TypeController()