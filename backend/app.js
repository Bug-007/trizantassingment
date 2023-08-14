

const express = require('express')
const app = express()
const port = 3000

const userRoutes = require("./Routes/UserRoutes")


const cors = require('cors')
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())



app.use(userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/",(req, res) => {

    console.log(req.body)

    res.send("okay");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})