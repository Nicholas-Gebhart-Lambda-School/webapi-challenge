const router = require("express").Router();
const actions = require("./data/helpers/actionModel");

router.get("/", (req, res) => {
  actions.get().then(actions => res.status(200).json(actions));
});

module.exports = router;
