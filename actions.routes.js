const router = require("express").Router();
const actions = require("./data/helpers/actionModel");
const projects = require("./data/helpers/projectModel");

router.get("/", (req, res) => {
  actions.get(req.project_id).then(actions => {
    console.log(req.project_id);
    res.status(200).json(actions);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .getProjectActions(id)
    .then(actions => {
      actions.length
        ? res.status(200).json(actions)
        : res.status(400).json({ err: "project id must be valid" });
    })
    .catch(() => res.status(500).json({ err: "server error" }));
});

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
