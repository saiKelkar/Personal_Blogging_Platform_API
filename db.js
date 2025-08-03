import pkg from "pg"
const { Pool } = pkg

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "myarticledb",
    password: "password",
    port: 5432,
})

pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.log("DB connection error: ", err))

export default pool