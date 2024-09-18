const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'),  reviewController.create)
router.get('/', reviewController.getAll)
router.get('/:id', reviewController.getOne);
router.put('/:id', checkRole('ADMIN'), reviewController.edit);

router.delete('/:id',reviewController.delete)

module.exports = router
