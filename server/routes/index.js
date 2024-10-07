
const Router = require("express");
const router = new Router();

const userRouter = require('./userRouter')
const typeTenderRouter = require('./typeTenderRouter')
const typeRouter = require('./typeRouter')
const tenderRouter = require('./tenderRouter')
const tagRouter = require('./tagRouter')
const postRouter = require('./postRouter')
const newsItemRouter = require('./newsItemRouter')
const homePageRouter = require('./homePageRouter')
const eventRouter = require('./eventRouter')
const animalRouter = require('./animalRouter')
const faqRouter = require('./faqRouter')
const reviewRouter = require('./reviewRouter')
const emailRouter = require('./emailRouter')
const weekHoursRouter = require('./weekHoursRouter')
const activitiesItemRouter = require('./activitiesItemRouter')

router.use('/user', userRouter)
router.use('/type_tender', typeTenderRouter)
router.use('/type', typeRouter)
router.use('/tender', tenderRouter)
router.use('/tag', tagRouter)
router.use('/post', postRouter)
router.use('/news_item', newsItemRouter)
router.use('/home_page', homePageRouter)
router.use('/event', eventRouter)
router.use('/animal', animalRouter)
router.use('/activities_item', activitiesItemRouter)
router.use('/faq', faqRouter)
router.use('/review', reviewRouter)
router.use('/email', emailRouter)
router.use('/week_hours', weekHoursRouter)


module.exports = router