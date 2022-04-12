const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();

app.use(bodyParser.json());

console.log(process.env);

app.get("/", (_req, res) => {
    const content = `
        <h4>Sample express.js application</h4>
        <h5>Added DAPR</h5>
        <h6>Added Comm using DAPR</h6>
        <p>/backend - communicate with backend container</p>
    `
    res.send(content);
});

app.get("/backend", async (_req, res) => {
    const request = axios.get(`http://dapr-app-id:nodeservice@localhost:${process.env.DAPR_HTTP_PORT}/test`);
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