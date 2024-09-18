const Router = require('express')
const router = new Router()
const homePageController = require('../controllers/homePageController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'),  homePageController.create)
router.get('/', homePageController.getAll)
router.get('/:id', homePageController.getOne);
router.put('/:id', checkRole('ADMIN'), homePageController.edit);


router.delete('/:id',homePageController.delete)

module.exports = router
