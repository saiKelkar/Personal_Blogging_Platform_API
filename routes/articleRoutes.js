import express from "express"
import { 
    getArticle,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
 } from '../controllers/articleControllers.js'

const router = express.Router()

router.get('/', getArticle)
router.get('/:id', getArticleById)
router.post('/', createArticle)
router.put('/:id', updateArticle)
router.delete('/:id', deleteArticle)

export default router