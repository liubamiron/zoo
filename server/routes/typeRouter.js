const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', typeController.create);
router.get('/', typeController.getAll);
router.put('/:id', typeController.edit);
router.get('/:id', typeController.getOne);

router.delete('/:id',typeController.delete);

module.exports = router
