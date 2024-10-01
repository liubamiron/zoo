const Router = require('express')
const router = new Router()
const animalController = require('../controllers/animalController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), animalController.create)
router.get('/', animalController.getAll)
router.get('/:id', animalController.getOne)
router.put('/:id', checkRole('ADMIN'), animalController.edit)

router.delete('/:id',animalController.delete)

module.exports = router
