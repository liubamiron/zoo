const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'),  postController.create)
router.get('/', postController.getAll)
router.get('/:id', postController.getOne);
router.put('/:id', checkRole('ADMIN'), postController.edit);

router.delete('/:id',postController.delete)

module.exports = router