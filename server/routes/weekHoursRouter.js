const Router = require('express')
const router = new Router()
const weekHoursController = require('../controllers/weekHoursController')

const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), weekHoursController.create);
router.get('/', weekHoursController.getAll);
router.put('/:id', checkRole('ADMIN'), weekHoursController.edit);
router.get('/:id', weekHoursController.getOne);

router.delete('/:id', checkRole('ADMIN'), weekHoursController.delete);

module.exports = router
