const express = require("express");
const { idText } = require("typescript");
const router = express.Router();

const schema = require("./schema");
const authorizationRoutes = require("./authorization");

router.use("/graphql", schema);
router.use("/authorization", authorizationRoutes);
// router.use("/authorization", schema);

module.exports = router;
