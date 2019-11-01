const router = require("express").Router();
const actions = require("./data/helpers/actionModel");
const projects = require("./data/helpers/projectModel");

router.get("/", (req, res) => {
  actions.get().then(actions => res.status(200).json(actions));
});

router.post("", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actions
    .remove(id)
    .then(action => {
      if (action) {
        res.status(200).json({ res: `removed ${action} record` });
      } else {
        res.status(400).json({ err: "that id does not exist" });
      }
    })
    .catch(() => res.status(500).json({ err: "server error" }));
});

module.exports = router;
