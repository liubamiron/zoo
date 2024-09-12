const Router = require('express')
const router = new Router()
const activitiesItemController = require('../controllers/activitiesItemController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'),  activitiesItemController.create)
router.get('/', activitiesItemController.getAll)
router.get('/:id', activitiesItemController.getOne);
router.put('/:id', checkRole('ADMIN'), activitiesItemController.edit);  // Edit a activitiesItemController by ID (Admin only)

router.delete('/',activitiesItemController.delete)

module.exports = router
