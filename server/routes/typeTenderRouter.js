const Router = require('express')
const router = new Router()
const typeTenderController = require('../controllers/typeTenderController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), typeTenderController.create)
router.get('/', typeTenderController.getAll)
router.get('/:id', typeTenderController.getOne);
router.put('/:id', checkRole('ADMIN'), typeTenderController.edit);

router.delete('/:id',typeTenderController.delete)

module.exports = router
