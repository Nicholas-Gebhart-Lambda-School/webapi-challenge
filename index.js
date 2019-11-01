const PORT = process.env.PORT || 8000;

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const projectsRouter = require("./projects.routes");
const actionsRouter = require("./actions.routes");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.listen(PORT, () => console.log(`\n listening on port ${PORT} \n`));
