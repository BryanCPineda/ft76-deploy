//* RESPONSABILIDAD: levantar el servidor y la conexion con la base de datos
const { pool } = require("./src/config/dbConnect")
const { PORT } = require("./src/config/envs")
const { initializateDatabase } = require("./src/config/initDb")
const { server } = require("./src/server")

const startServer = async () => {
    await pool.query('SELECT 1')
    await initializateDatabase()
    console.log("conexion con postgreSQL exitosa")

    server.listen(PORT, function(){
      console.log(`Server listen on port: ${PORT}`)
    })

}

startServer()

process.on("SIGINT", async () => {
  await pool.end()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  await pool.end()
  process.exit(0)
})






