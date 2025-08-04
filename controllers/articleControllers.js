import pool from "../db.js"

export const getArticle = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM articleList'
        )
        res.status(200).json({ message: "Article List", data: result.rows })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

export const getArticleById = async(req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(
            'SELECT * FROM articleList WHERE id=$1', [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Article not found" })
        }
        res.status(200).json({ message: "Article Id", data: result.rows[0] })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

export const createArticle = async(req, res) => {
    const { articleHead, articleBody, publishedDate, tags } = req.body
    try {
        const result = await pool.query(
            'INSERT INTO articleList(articleHead, articleBody, publishedDate, tags) VALUES ($1, $2, $3, $4) RETURNING *',
            [articleHead, articleBody, publishedDate, tags]
        )
        res.status(201).json({ message: "Article created", data: result.rows[0] })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

export const updateArticle = async(req, res) => {
    const { id } = req.params 
    const { articleHead, articleBody, publishedDate, tags } = req.body
    try {
        const result = await pool.query(
            'UPDATE articleList SET articleHead = $1, articleBody = $2, publishedDate = $3, tags = $4 WHERE id = $5 RETURNING *',
            [articleHead, articleBody, publishedDate, tags, id] 
        )
        if(result.rows.length === 0) {
            return res.status(404).json({ message: "Article not found" })
        }
        res.status(201).json({ message: "Article updated", data: result.rows[0]})
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

export const deleteArticle = async(req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query(
            'DELETE FROM articleList WHERE id=$1 RETURNING *', [id]
        )
        if(result.rows.length === 0) {
            return res.status(404).json({ message: "Article doesn't exist" })
        }
        res.status(200).json({ message: "Article deleted", data: result.rows[0] })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}