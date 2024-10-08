const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const emailController = require('../controllers/emailController')


router.post('/', emailController.create);
router.get('/', emailController.getAll);
router.put('/:id', checkRole('ADMIN'), emailController.edit);
router.get('/:id', emailController.getOne);

router.delete('/:id', checkRole('ADMIN'), emailController.delete);

module.exports = router
