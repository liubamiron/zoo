const uuid = require('uuid');
const path = require('path');
const ApiError = require("../error/ApiError");
const { Animal } = require('../models/models');

class AnimalController {
    async create(req, res, next) {
        try {
            const {
                name_ru, name_ro, name_en,
                descr_short_ru, descr_short_ro, descr_short_en,
                descr_long_ru, descr_long_ro, descr_long_en,
                habitat_ru, habitat_ro, habitat_en,
                family_ru, family_ro, family_en,
                genus_ru, genus_ro, genus_en,
                phylum_ru, phylum_ro, phylum_en,
                clas_ru, clas_ro, clas_en,
                domain_ru, domain_ro, domain_en,
                karyotype_ru, karyotype_ro, karyotype_en,
                habitat_long_ru, habitat_long_ro, habitat_long_en,
                general_info_ru, general_info_ro, general_info_en,
                nutrition_ru, nutrition_ro, nutrition_en,
                facts_ru, facts_ro, facts_en,
                protection_ru, protection_ro, protection_en,
                new_animal, disappearing,
                typeAnimalId
            } = req.body;

            const { img_1, img_2 } = req.files;

            // Generate unique file names for both images
            let fileName1 = uuid.v4() + ".jpg";
            let fileName2 = uuid.v4() + ".jpg";

            // Move images to the static folder
            img_1.mv(path.resolve(__dirname, '..', 'static', fileName1));
            img_2.mv(path.resolve(__dirname, '..', 'static', fileName2));

            // Create an animal entry
            const animal = await Animal.create({
                name_ru, name_ro, name_en,
                descr_short_ru, descr_short_ro, descr_short_en,
                descr_long_ru, descr_long_ro, descr_long_en,
                habitat_ru, habitat_ro, habitat_en,
                family_ru, family_ro, family_en,
                genus_ru, genus_ro, genus_en,
                phylum_ru, phylum_ro, phylum_en,
                clas_ru, clas_ro, clas_en,
                domain_ru, domain_ro, domain_en,
                karyotype_ru, karyotype_ro, karyotype_en,
                habitat_long_ru, habitat_long_ro, habitat_long_en,
                general_info_ru, general_info_ro, general_info_en,
                nutrition_ru, nutrition_ro, nutrition_en,
                facts_ru, facts_ro, facts_en,
                protection_ru, protection_ro, protection_en, new_animal, disappearing, typeAnimalId,
                img_1: fileName1, img_2: fileName2
            });

            return res.json(animal);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { typeAnimalId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let animals;

        if (!typeAnimalId) {
            animals = await Animal.findAndCountAll({ limit, offset });
        } else {
            animals = await Animal.findAndCountAll({ where: { typeAnimalId }, limit, offset });
        }

        return res.json(animals);
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const animal = await Animal.findOne({ where: { id } });

            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }

            return res.json(animal);
        } catch (e) {
            next(ApiError.internal('Failed to fetch animal'));
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params;

            // Destructure all fields from req.body
            const {
                name_ru, name_ro, name_en,
                descr_short_ru, descr_short_ro, descr_short_en,
                descr_long_ru, descr_long_ro, descr_long_en,
                habitat_ru, habitat_ro, habitat_en,
                family_ru, family_ro, family_en,
                genus_ru, genus_ro, genus_en,
                phylum_ru, phylum_ro, phylum_en,
                clas_ru, clas_ro, clas_en,
                domain_ru, domain_ro, domain_en,
                karyotype_ru, karyotype_ro, karyotype_en,
                habitat_long_ru, habitat_long_ro, habitat_long_en,
                general_info_ru, general_info_ro, general_info_en,
                nutrition_ru, nutrition_ro, nutrition_en,
                facts_ru, facts_ro, facts_en,
                protection_ru, protection_ro, protection_en,
                new_animal, disappearing,
                typeAnimalId,
            } = req.body;

            const { img_1, img_2 } = req.files || {};

            // Find the existing animal record by id
            const animal = await Animal.findOne({ where: { id } });

            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }

            // Update images if provided
            if (img_1) {
                let fileName1 = uuid.v4() + ".jpg";
                img_1.mv(path.resolve(__dirname, '..', 'static', fileName1));
                animal.img_1 = fileName1;
            }

            if (img_2) {
                let fileName2 = uuid.v4() + ".jpg";
                img_2.mv(path.resolve(__dirname, '..', 'static', fileName2));
                animal.img_2 = fileName2;
            }

            // Update other fields only if they are provided in the request
            Object.assign(animal, {
                name_ru: name_ru || animal.name_ru,
                name_ro: name_ro || animal.name_ro,
                name_en: name_en || animal.name_en,
                descr_short_ru: descr_short_ru || animal.descr_short_ru,
                descr_short_ro: descr_short_ro || animal.descr_short_ro,
                descr_short_en: descr_short_en || animal.descr_short_en,
                descr_long_ru: descr_long_ru || animal.descr_long_ru,
                descr_long_ro: descr_long_ro || animal.descr_long_ro,
                descr_long_en: descr_long_en || animal.descr_long_en,
                habitat_ru: habitat_ru || animal.habitat_ru,
                habitat_ro: habitat_ro || animal.habitat_ro,
                habitat_en: habitat_en || animal.habitat_en,
                family_ru: family_ru || animal.family_ru,
                family_ro: family_ro || animal.family_ro,
                family_en: family_en || animal.family_en,
                genus_ru: genus_ru || animal.genus_ru,
                genus_ro: genus_ro || animal.genus_ro,
                genus_en: genus_en || animal.genus_en,
                phylum_ru: phylum_ru || animal.phylum_ru,
                phylum_ro: phylum_ro || animal.phylum_ro,
                phylum_en: phylum_en || animal.phylum_en,
                clas_ru: clas_ru || animal.clas_ru,
                clas_ro: clas_ro || animal.clas_ro,
                clas_en: clas_en || animal.clas_en,
                domain_ru: domain_ru || animal.domain_ru,
                domain_ro: domain_ro || animal.domain_ro,
                domain_en: domain_en || animal.domain_en,
                karyotype_ru: karyotype_ru || animal.karyotype_ru,
                karyotype_ro: karyotype_ro || animal.karyotype_ro,
                karyotype_en: karyotype_en || animal.karyotype_en,
                habitat_long_ru: habitat_long_ru || animal.habitat_long_ru,
                habitat_long_ro: habitat_long_ro || animal.habitat_long_ro,
                habitat_long_en: habitat_long_en || animal.habitat_long_en,
                general_info_ru: general_info_ru || animal.general_info_ru,
                general_info_ro: general_info_ro || animal.general_info_ro,
                general_info_en: general_info_en || animal.general_info_en,
                nutrition_ru: nutrition_ru || animal.nutrition_ru,
                nutrition_ro: nutrition_ro || animal.nutrition_ro,
                nutrition_en: nutrition_en || animal.nutrition_en,
                facts_ru: facts_ru || animal.facts_ru,
                facts_ro: facts_ro || animal.facts_ro,
                facts_en: facts_en || animal.facts_en,
                protection_ro: protection_ro || animal.protection_ro,
                protection_ru: protection_ru || animal.protection_ru,
                protection_en: protection_en || animal.protection_en,
                new_animal: new_animal || animal.new_animal,
                disappearing: disappearing || animal.disappearing,
                typeAnimalId:typeAnimalId || animal.typeAnimalId
            });

            // Save the updated record
            await animal.save();

            return res.json({ message: 'Animal updated successfully', animal });
        } catch (error) {
            next(ApiError.internal('Failed to update animal'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const animal = await Animal.destroy({ where: { id } });

            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }

            return res.json({ message: 'Animal deleted successfully' });
        } catch (error) {
            next(ApiError.internal('Failed to delete animal'));
        }
    }
}

module.exports = new AnimalController();
