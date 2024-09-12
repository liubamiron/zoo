const Router = require('express')
const router = new Router()
const newsItemController = require('../controllers/newsItemController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'),  newsItemController.create)
router.get('/', newsItemController.getAll)
router.get('/:id', newsItemController.getOne);
router.put('/:id', checkRole('ADMIN'), newsItemController.edit);

router.delete('/',newsItemController.delete)

module.exports = router