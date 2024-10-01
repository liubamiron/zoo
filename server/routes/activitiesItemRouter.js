const Router = require('express')
const router = new Router()
const activitiesItemController = require('../controllers/activitiesItemController')
const checkRole = require('../middleware/checkRoleMiddleware')
const newsItemController = require("../controllers/newsItemController");


router.post('/', checkRole('ADMIN'),  activitiesItemController.create)
router.get('/', activitiesItemController.getAll)
router.get('/:id', activitiesItemController.getOne);
router.put('/:id', checkRole('ADMIN'), activitiesItemController.edit);
router.delete('/:id',activitiesItemController.delete)

router.delete('/:id',newsItemController.delete);
module.exports = router
