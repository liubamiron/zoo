const Router = require('express')
const router = new Router()
const animalController = require('../controllers/animalController')

router.post('/', animalController.create)
router.get('/', animalController.getAll)
router.get('/:id', animalController.getOne)
router.put('/:id', animalController.edit)

router.delete('/:id',animalController.delete)

module.exports = router
