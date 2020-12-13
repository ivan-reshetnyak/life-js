import express = require("express");
import { Formation } from "./Formation";
import { FormationOcta } from "./formations/FormationOcta";

const app: express.Application = express();

app.get("/", function (req, res) {
  let formation: Formation = new FormationOcta(4, 5);
  res.send(formation.render());
});

app.listen(3000, function() {
  console.log("App is listening on port 3000!");
});