const express = require("express")
const cors = require("cors")
const PORT = 8080

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Añade rutas
app.use("/api", require("./routes/"))

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})