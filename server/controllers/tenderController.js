const {Tender} = require("../models/models");
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class TenderController {
    async create(req, res, next) {

            try {
                const {
                    title_ru, title_ro, title_en,
                    description_ru, description_ro, description_en,
                    typeTenderId
                } = req.body;

                let fileName = null; // Initialize as null to handle cases without file upload

                // Check if a PDF file was uploaded
                if (req.files && req.files.pdf_file) {
                    const { pdf_file } = req.files;

                    // Generate a unique filename for the uploaded PDF
                    fileName = uuid.v4() + ".pdf";

                    // Define the path to store the file
                    const filePath = path.resolve(__dirname, '..', 'static', fileName);

                    // Move the uploaded file to the desired location
                    await pdf_file.mv(filePath);
                }

                // Create the tender with or without the pdf_file
                const tender = await Tender.create({
                    title_ru, title_ro, title_en,
                    description_ru, description_ro, description_en,
                    typeTenderId,
                    pdf_file: fileName // If no file is uploaded, this will be null
                });

                return res.json(tender);
            } catch (e) {
                console.error('Error while creating tender:', e);
                return next(ApiError.badRequest(`Failed to create Tender: ${e.message}`));
            }

    }

    async getAll(req, res) {
        const newTender = await Tender.findAll()
        return res.json(newTender)
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Get the id from the request parameters
            const tender = await Tender.findOne({ where: { id } }); // Find one record by id

            if (!tender) {
                // If no record was found with the given id
                return res.status(404).json({ message: 'Tender not found' });
            }

            return res.json(tender);
        } catch (error) {
            next(ApiError.internal('Failed to fetch Tender'));
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params; // Get the ID from the request parameters
            const { title_ru, title_ro, title_en,
                description_ru, description_ro, description_en,
                typeTenderId
            } = req.body; // Get the new values from the request body

            const { pdf_file } = req.files || {};

            const tender = await Tender.findOne({ where: { id } });

            if (!tender) {
                return res.status(404).json({ message: 'tender not found' });
            }
            // Update images if provided
            if (pdf_file) {
                let fileName = uuid.v4() + ".pdf";
                pdf_file.mv(path.resolve(__dirname, '..', 'static', fileName));
                tender.pdf_file = fileName;
            }

            // Update other fields only if they are provided in the request
            Object.assign(tender, {
                title_ru: title_ru || tender.title_ru,
                title_ro: title_ro || tender.title_ro,
                title_en: title_en || tender.title_en,
                description_ru: description_ru || tender.description_ru,
                description_ro: description_ro || tender.description_ro,
                description_en: description_en || tender.description_en,
                typeTenderId: typeTenderId || tender.typeTenderId
            })

            // Save the updated record
            await tender.save();

            return res.json({ message: 'Tender updated successfully', tender });
        } catch (error) {
            next(ApiError.internal('Failed to update Tender'));
        }
    }


    async delete(req, res, next) {
        try {
            const { id } = req.params; // Get the id from the request parameters
            const deletedCount = await Tender.destroy({ where: { id } }); // Use the destroy method

            if (deletedCount === 0) {
                // If no record was deleted, the id wasn't found
                return res.status(404).json({ message: 'Tender not found' });
            }

            return res.json({ message: 'Tender deleted successfully' });
        } catch (error) {
            next(ApiError.internal('Failed to delete Tender'));
        }
    }
}

module.exports = new TenderController()