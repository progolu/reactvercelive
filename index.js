const express = require("express")
const app = express()

const path = require("path")
const logger = require("morgan")
const cors = require("cors")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//app.use("/api", require("./routes"))

app.get("/api", (req,res)=>{
    res.send("API RUNNING")
})

app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, ".frontend/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    )
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app
