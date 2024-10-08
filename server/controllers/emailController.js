const { EmailList } = require('../models/models');
const ApiError = require('../error/ApiError');

class EmailController {
    async create(req, res, next) {
        try {
            const { email } = req.body;
            const emailList = await EmailList.create({ email });
            return res.json(emailList);
        } catch (error) {
            next(ApiError.internal('Failed to create email'));
        }
    }

    async getAll(req, res, next) {
        try {
            const emailList = await EmailList.findAll();
            return res.json(emailList);
        } catch (error) {
            next(ApiError.internal('Failed to fetch email list'));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const emailList = await EmailList.findOne({ where: { id } });

            if (!emailList) {
                return res.status(404).json({ message: 'EmailList not found' });
            }

            return res.json(emailList);
        } catch (error) {
            next(ApiError.internal('Failed to fetch email'));
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params;
            const { email } = req.body;

            const emailList = await EmailList.findOne({ where: { id } });

            if (!emailList) {
                return res.status(404).json({ message: 'EmailList not found' });
            }

            if (email && !this.isValidEmail(email)) {
                return next(ApiError.badRequest('Invalid email format'));
            }

            emailList.email = email || emailList.email;
            await emailList.save();

            return res.json({ message: 'Email updated successfully', emailList });
        } catch (error) {
            next(ApiError.internal('Failed to update email'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedCount = await EmailList.destroy({ where: { id } });

            if (deletedCount === 0) {
                return res.status(404).json({ message: 'EmailList not found' });
            }

            return res.json({ message: 'EmailList deleted successfully' });
        } catch (error) {
            next(ApiError.internal('Failed to delete EmailList'));
        }
    }

    // Helper function for basic email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

module.exports = new EmailController();
