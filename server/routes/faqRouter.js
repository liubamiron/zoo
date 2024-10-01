const Router = require('express')
const router = new Router()
const faqController = require('../controllers/faqController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'),  faqController.create)
router.get('/', faqController.getAll)
router.get('/:id', faqController.getOne);
router.put('/:id', checkRole('ADMIN'), faqController.edit);

router.delete('/:id',faqController.delete)

module.exports = router