import express from "express"
import articleRoutes from './routes/articleRoutes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use('/article', articleRoutes)

app.get('/', (req, res) => {
    res.send("API running")
})

app.listen(port, () => {
    console.log(`Starting port at ${port}`)
})