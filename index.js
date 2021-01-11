class CoalCRUD {
  _useBodyParser(app) {
    var bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  }

  create(app, route, model) {
    app.post("/" + route, async (req, res) => {
      try {
        const result = await model.create(req.body);
        res.status(201).send(result);
      } catch (_) {
        res.status(500).send();
      }
    });
  }

  getOne(app, route, model) {
    app.get("/" + route + "/:id", async (req, res) => {
      const id = req.params.id;
      const item = await model.findByPk(id);
      if (item === null) {
        res.status(404).send();
      } else {
        res.status(200).send(item);
      }
    });
  }

  getAll(app, route, model) {
    app.get("/" + route, async (_, res) => {
      const result = await model.findAll();
      res.status(200).send(result);
    });
  }

  update(app, route, model) {
    app.put("/" + route + "/:id", async (req, res) => {
      const id = req.params.id;
      const item = await model.findByPk(id);
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
  }

  delete(app, route, model) {
    app.delete("/" + route + "/:id", async (req, res) => {
      const id = req.params.id;
      const item = await model.findByPk(id);
      if (item === null) {
        res.status(404).send();
      } else {
        item.destroy();
        res.status(204).send();
      }
    });
  }

  registerCRUD(app, routeName, sequelizeModel) {
    this._useBodyParser(app);
    this.create(app, routeName, sequelizeModel);
    this.update(app, routeName, sequelizeModel);
    this.getOne(app, routeName, sequelizeModel);
    this.getAll(app, routeName, sequelizeModel);
    this.delete(app, routeName, sequelizeModel);
  }
}

module.exports = CoalCRUD;
