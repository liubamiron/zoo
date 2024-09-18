const Router = require('express')
const router = new Router()
const tagController = require('../controllers/tagController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'),  tagController.create)
router.get('/', tagController.getAll)
router.get('/:id', tagController.getOne);
router.put('/:id', checkRole('ADMIN'), tagController.edit);

router.delete('/:id',tagController.delete)

module.exports = router
