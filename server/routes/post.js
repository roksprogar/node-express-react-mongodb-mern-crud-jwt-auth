const express = require("express");

const router = express.Router();

// Import controller methods.
const { create, list, show, update, destroy } = require("../controllers/post");

const { requireSignin } = require("../controllers/auth");

router.get("/", list);
router.get("/post/:slug", show);
router.post("/create", requireSignin, create);
router.put("/post/update/:slug", requireSignin, update);
router.delete("/post/:slug", requireSignin, destroy);

router.get("/secret", requireSignin, (req, res) => {
  console.log(req.auth);
  if (!req.auth.name) return res.sendStatus(401);
  res.json({
    data: req.auth.name,
  });
});

module.exports = router;
