//
// import userRouter from "./userRouter";
// import typeTenderRouter from "./typeTenderRouter";
// import typeAnimalRouter from "./typeAnimalRouter";
// import tenderRouter from "./tenderRouter";
// import tagRouter from "./tagRouter";
// import postRouter from "./postRouter";
// import newsItemRouter from "./newsItemRouter";
// import homePageRouter from "./homePageRouter";
// import eventRouter from "./eventRouter";
// import animalRouter from "./animalRouter";
// import activitiesItemRouter from "./activitiesItemRouter";

// import { Router } from 'express';
// const router = new Router();

const Router = require("express");
const router = new Router();

const userRouter = require('./userRouter')
const typeTenderRouter = require('./typeTenderRouter')
const typeAnimalRouter = require('./typeAnimalRouter')
const tenderRouter = require('./tenderRouter')
const tagRouter = require('./tagRouter')
const postRouter = require('./postRouter')
const newsItemRouter = require('./newsItemRouter')
const homePageRouter = require('./homePageRouter')
const eventRouter = require('./eventRouter')
const animalRouter = require('./animalRouter')
const faqRouter = require('./faqRouter')
const reviewRouter = require('./reviewRouter')
const activitiesItemRouter = require('./activitiesItemRouter')

router.use('/user', userRouter)
router.use('/type_tender', typeTenderRouter)
router.use('/type_animal', typeAnimalRouter)
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

module.exports = router


// router.use('/user', userRouter)
// router.use('/typeTender', typeTenderRouter)
// router.use('/typeAnimal', typeAnimalRouter)
// router.use('/tender', tenderRouter)
// router.use('/tag', tagRouter)
// router.use('/post', postRouter)
// router.use('/newsItem', newsItemRouter)
// router.use('/homePage', homePageRouter)
// router.use('/event', eventRouter)
// router.use('/animal', animalRouter)
// router.use('/activitiesItem', activitiesItemRouter)
//
// export default router;