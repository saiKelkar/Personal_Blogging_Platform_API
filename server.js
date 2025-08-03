import express from "express"
import dotenv from 'dotenv'
import articleRoutes from './routes/articleRoutes.js'

const app = express()
const port = process.env.PORT || 3000
dotenv.config()

app.use(express.json())
app.use('/article', articleRoutes)

app.get('/', (req, res) => {
    res.send("API running")
})

app.listen(port, () => {
    console.log(`Starting port at ${port}`)
})