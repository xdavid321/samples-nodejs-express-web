const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();

app.use(bodyParser.json());

console.log(process.env);

app.get("/", (_req, res) => {
    const content = `
        <h4>Sample express.js application</h4>
        <p>Without DAPR - Inside subnets</p>
        <p>/backend - communicate with backend container</p>
    `
    res.send(content);
});

app.get("/backend", async (_req, res) => {
    const request = axios.get(`http://${process.env.SERVICE_APP_HOST}:${process.env.SERVICE_APP_PORT}/test`);
    request.then((_res) => {
            res.json(_res.data);
        }).catch((err) => {
            console.error(JSON.stringify(err));
            res.status(500).send(err);
        })
})
const port = 80;

app.listen(port, () => {
    console.log("App running at " + port);
})