const Router = require('express')
const router = new Router()
const tenderController = require('../controllers/tenderController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'),  tenderController.create)
router.get('/', tenderController.getAll)
router.get('/:id', tenderController.getOne);
router.put('/:id', checkRole('ADMIN'), tenderController.edit);

router.delete('/:id',tenderController.delete)

module.exports = router
