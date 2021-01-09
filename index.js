function registerCRUD(expressInstance, routeName, sequelizeModel) {
  var bodyParser = require("body-parser");
  expressInstance.use(bodyParser.urlencoded({ extended: false }));
  expressInstance.use(bodyParser.json());

  expressInstance.get("/" + routeName, async function (_, res) {
    const result = await sequelizeModel.findAll();
    res.status(200).send(result);
  });

  expressInstance.get("/" + routeName + "/:id", async function (req, res) {
    const id = req.params.id;
    const result = await sequelizeModel.findByPk(id);
    if (item === null) {
      res.status(404).send();
    } else {
      res.status(200).send(result);
    }
  });

  expressInstance.post("/" + routeName, async function (req, res) {
    try {
      const result = await sequelizeModel.create(req.body);
      res.status(201).send(result);
    } catch (_) {
      res.status(500).send();
    }
  });

  expressInstance.put("/" + routeName + "/:id", async function (req, res) {
    const id = req.params.id;
    const item = await sequelizeModel.findByPk(id);
    if (item === null) {
      res.status(404).send();
    } else {
      for (let [key, value] of Object.entries(req.body)) {
        item[key] = value;
      }
      const result = await item.save();
      res.status(200).send(result);
    }
  });

  expressInstance.delete("/" + routeName + "/:id", async function (req, res) {
    const id = req.params.id;
    const item = await sequelizeModel.findByPk(id);
    if (item === null) {
      res.status(404).send();
    } else {
      item.destroy();
      res.status(204).send();
    }
  });
}

module.exports = registerCRUD
