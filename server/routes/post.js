const express = require("express");

const router = express.Router();

// Import controller methods.
const { create, list, show, update, destroy } = require("../controllers/post");

router.get("/", list);
router.post("/create", create);
router.get("/post/:slug", show);
router.put("/post/:slug", update);
router.delete("/post/:slug", destroy);

module.exports = router;
