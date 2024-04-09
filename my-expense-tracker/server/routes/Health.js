// const utils = require("../utils/bcrypting")
const express = require("express");
const router = express.Router();
const db = require("../model/index");

function isRequestHeader(req, res) {
    console.log("inside health")
    if (JSON.stringify(req.query) != '{}') {
        console.error("Param is not needed for Health route");
        res.status(400).send();
        return false;
    } else if (JSON.stringify(req.body) != '{}') {
        console.error("Payload is not needed for Health route");
        res.status(400).send();
        return false;
    }
    else {
        return true;
    };
}

function otherMethodCheck(method = "post", res) {
    console.log(`${method} method Not allowed`);
    res.status(405).send();
}

router.get("/", async (req, res) => {
    try {
        console.log("inside health route");
        if (isRequestHeader(req, res)) {
            console.log("Healthy connection");
            await db.sequelize.authenticate();
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache');
            res.status(200).send();
        }
    } catch (err) {
        console.error(err);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache');
        res.status(503).send();
    }
});
router.post("/", (req, res) => otherMethodCheck("post", res));
router.put("/", (req, res) => otherMethodCheck("put", res));
router.delete("/", (req, res) => otherMethodCheck("delete", res));
router.patch("/", (req, res) => otherMethodCheck("patch", res));

module.exports = router;