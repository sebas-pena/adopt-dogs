const express = require("express")
const cors = require("cors")
const path = require("path")
const PORT = 8080

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static("public", { extensions: ['html'] }))

// Añade rutas
app.use("/api", require("./routes/"))

// Manejar 404
app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
