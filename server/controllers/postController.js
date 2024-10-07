const ApiError = require("../error/ApiError");
const { Post, Tag} = require("../models/models");
const uuid = require('uuid');
const path = require('path');

class PostController {
    async create(req, res, next) {
        try {
            let {
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
                popular,
                tags
            } = req.body;

            const { img_1, img_2 } = req.files || {};
            let fileName1 = null;
            let fileName2 = null;

            // Handle file uploads
            if (img_1) {
                const img1Name = uuid.v4() + ".jpg";
                await img_1.mv(path.resolve(__dirname, '..', 'static', img1Name));
                fileName1 = img1Name; // Assign the name for storage
            }
            if (img_2) {
                const img2Name = uuid.v4() + ".jpg";
                await img_2.mv(path.resolve(__dirname, '..', 'static', img2Name));
                fileName2 = img2Name; // Assign the name for storage
            }

            // Create the post
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
                popular,
                img_1: fileName1,
                img_2: fileName2,
            });

            // Handle tags if provided
            if (tags) {
                await post.setTags(JSON.parse(tags)); // Ensure types are parsed if necessary
            }

            return res.json(post); // Respond with the created post
        } catch (e) {
            console.error('Error creating post:', e);
            return next(ApiError.badRequest('Error creating post: ' + e.message));
        }
    }

    async getAll(req, res) {
        try {
            const posts = await Post.findAll({
                include: [{
                    model: Tag,
                    through: { attributes: [] },
                    attributes: ['id', 'name_ru', 'name_ro', 'name_en']
                }]
            });
            return res.json(posts);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch posts: ' + error.message });
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const post = await Post.findOne({
                where: { id },
                include: [{
                    model: Tag,
                    through: { attributes: [] },
                    attributes: ['id', 'name_ru', 'name_ro', 'name_en']
                }]
            });

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            return res.json(post);
        } catch (error) {
            next(ApiError.internal('Failed to fetch post: ' + error.message));
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params; // Get the ID from the request parameters
            let {
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
                popular,
            } = req.body;

            // Parse tags from the request body
            let tags = JSON.parse(req.body.tags) || [];

            const { img_1, img_2 } = req.files || {};

            const post = await Post.findOne({ where: { id } });

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Update the post item with new values
            Object.assign(post, {
                name_ru: name_ru || post.name_ru,
                name_ro: name_ro || post.name_ro,
                name_en: name_en || post.name_en,
                title_ru: title_ru || post.title_ru,
                title_ro: title_ro || post.title_ro,
                title_en: title_en || post.title_en,
                short_description_ru: short_description_ru || post.short_description_ru,
                short_description_ro: short_description_ro || post.short_description_ro,
                short_description_en: short_description_en || post.short_description_en,
                long_description_ru: long_description_ru || post.long_description_ru,
                long_description_ro: long_description_ro || post.long_description_ro,
                long_description_en: long_description_en || post.long_description_en,
                popular:popular || post.popular,
            });

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


            await post.save();
            // Update the tags association
            if (Array.isArray(tags) && tags.length > 0) {
                await post.setTags(tags);
            }
            // Optionally, fetch the updated animal with its types to return
            const updatedPost = await Post.findOne({
                where: { id },
                include: {
                    model: Tag,
                    through: {
                        attributes: [] // Exclude the join table attributes
                    }
                }
            });

            return res.json({ message: 'Post updated successfully', post:updatedPost });
        } catch (error) {
            next(ApiError.internal('Failed to update post: ' + error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params; // Get the id from the request parameters
            const deletedCount = await Post.destroy({ where: { id } }); // Use the destroy method

            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Post not found' });
            }

            return res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            next(ApiError.internal('Failed to delete post: ' + error.message));
        }
    }
}

module.exports = new PostController();
