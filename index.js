const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const content = `
        <h3>Sample express.js application</h3>
        <p>/backend - communicate with backend container</p>
    `
    res.send(content);
});

app.get("/backend", async (req, res) => {
    axios.get(`${process.env.BACKEND_BASE_URL}/test`)
        .then((_res) => {
            res.json(_res.data);
        }).catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Internal server error"
            })
        })
})
const port = 80;

app.listen(port, () => {
    console.log("App running at " + port);
})