class CoalCRUD {
  constructor(app, routeName, sequelizeModel) {
    this.app = app;
    this.route = routeName;
    this.model = sequelizeModel;
    this._useBodyParser();
  }

  _useBodyParser() {
    var bodyParser = require("body-parser");
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  create() {
    this.app.post("/" + this.route, async (req, res) => {
      try {
        const result = await this.model.create(req.body);
        res.status(201).send(result);
      } catch (_) {
        res.status(500).send();
      }
    });
  }

  getOne() {
    this.app.get("/" + this.route + "/:id", async (req, res) => {
      const id = req.params.id;
      const item = await this.model.findByPk(id);
      if (item === null) {
        res.status(404).send();
      } else {
        res.status(200).send(item);
      }
    });
  }

  getAll() {
    this.app.get("/" + this.route, async (_, res) => {
      const result = await this.model.findAll();
      res.status(200).send(result);
    });
  }

  update() {
    this.app.put("/" + this.route + "/:id", async (req, res) => {
      const id = req.params.id;
      const item = await this.model.findByPk(id);
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

  delete() {
    this.app.delete("/" + this.route + "/:id", async (req, res) => {
      const id = req.params.id;
      const item = await this.model.findByPk(id);
      if (item === null) {
        res.status(404).send();
      } else {
        item.destroy();
        res.status(204).send();
      }
    });
  }

  registerCRUD() {
    this.create();
    this.update();
    this.getOne();
    this.getAll();
    this.delete();
  }
}

module.exports = CoalCRUD;
