const Router = require('express')
const router = new Router()
const typeAnimalController = require('../controllers/typeAnimalController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeAnimalController.create);
router.get('/', typeAnimalController.getAll);
router.put('/:id', checkRole('ADMIN'), typeAnimalController.edit);
router.get('/:id', typeAnimalController.getOne);

router.delete('/:id',typeAnimalController.delete);

module.exports = router
