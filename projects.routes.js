const router = require("express").Router();
const projects = require("./data/helpers/projectModel");
const actions = require("./data/helpers/actionModel");
const ner = { err: "There has been a server error" };

router.get("/", (req, res) => {
  projects.get().then(projects => res.status(200).json(projects));
});

router.post("/", (req, res) => {
  const { name, description } = req.body;
  const completed = req.body.completed || false;
  const newProject = { name, description, completed };
  if (!name || !description) {
    res.status(400).json({ err: "name and description are required" });
  } else {
    projects
      .insert(newProject)
      .then(project => res.status(200).json(project))
      .catch(() => {
        res.status(500).json(ner);
      });
  }
});

router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  projects
    .update(id, { name, description })
    .then(project => {
      if (!project) {
        res.status(404).json({ err: "must provide a valid id" });
      }
      res.status(200).json(project);
    })
    .catch(() => res.status(500).json(ner));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ err: "must provide a valid id" });
  }
  projects
    .remove(id)
    .then(project => res.status(200).json(project))
    .catch(() => {
      res.status(500).json(ner);
    });
});

module.exports = router;
