const ApiError = require("../error/ApiError");
const {Post} = require("../models/models");
const uuid = require('uuid');
const path = require('path');

class PostController {
    async create(req, res, next) {
        try {
        const {
            name_ru,
            name_ro,
            name_en,
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

        const post = await Post.create({
            name_ru,
            name_ro,
            name_en,
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
        return res.json(post)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const post = await Post.findAll()
        return res.json(post)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const post = await Post.findOne({where: {id}}); // Find one record by id

            if (!post) {
                // If no record was found with the given id
                return res.status(404).json({message: 'Post not found'});
            }

            return res.json(post);
        } catch (error) {
            next(ApiError.internal('Failed to fetch Post'));
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params; // Get the ID from the request parameters
            const {
                name_ru,
                name_ro,
                name_en,
                title_ru,
                title_ro,
                title_en,
                short_description_ru,
                short_description_ro,
                short_description_en,
                long_description_ru,
                long_description_ro,
                long_description_en,
            } = req.body;

            const { img_1, img_2 } = req.files || {};

            const post = await Post.findOne({ where: { id } });

            if (!post) {
                return res.status(404).json({ message: 'post not found' });
            }

            // Update images if provided
            if (img_1) {
                let fileName1 = uuid.v4() + ".jpg";
                img_1.mv(path.resolve(__dirname, '..', 'static', fileName1));
                post.img_1 = fileName1;
            }

            if (img_2) {
                let fileName2 = uuid.v4() + ".jpg";
                img_2.mv(path.resolve(__dirname, '..', 'static', fileName2));
                post.img_2 = fileName2;
            }
            Object.assign(post, {
                // Update the news item with new values
                name_ru : name_ru || post.name_ru,
                name_ro : name_ro || post.name_ro,
                name_en : name_en || post.name_en,

                title_ru : title_ru || post.title_ru,
                title_ro : title_ro || post.title_ro,
                title_en : title_en || post.title_en,

                short_description_ru : short_description_ru || post.short_description_ru,
                short_description_ro : short_description_ro || post.short_description_ro,
                short_description_en : short_description_en || post.short_description_en,

                long_description_ru : long_description_ru || post.long_description_ru,
                long_description_ro : long_description_ro || post.long_description_ro,
                long_description_en : long_description_en || post.long_description_en,
            });

            // Save the updated record
            await post.save();

            return res.json({ message: 'NewsItem updated successfully', post });
        } catch (error) {
            next(ApiError.internal('Failed to update post'));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params; // Get the id from the request parameters
            const deletedCount = await Post.destroy({where: {id}}); // Use the destroy method

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


module.exports = new PostController()