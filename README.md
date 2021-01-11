# Coal Shovel

Provides a simple CRUD endpoint set, based on Django ViewSets, for use with express and sequelize.

## Contents

- [Install](#install)
- [Usage](#usage)
- [Example Code](#example-code)
- [Custom Behavior](#custom-behavior)
- [Endpoints](#endpoints)

## Install

```
npm i coal-shovel
```

## Usage

```javascript
const CoalCRUD = require("coal-shovel");

let sampleCRUD = new CoalCRUD();
sampleCRUD.registerCRUD(expressInstance, "route-name", SequelizeModel);
```

## Example Code

```javascript
const CoalCRUD = require("coal-shovel");
const express = require("express");
const Sequelize = require("sequelize");

const db = new Sequelize("sqlite::memory:");

const app = express();

const Product = db.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

async function syncDB() {
  try {
    const result = await db.sync();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

syncDB();
let product = new CoalCRUD();
product.registerCRUD(app, "product", Product);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
```

## Custom Behavior

You can extend from the CoalCRUD class and override the methods you want to create custom beahavior to a given endpoint.

```javascript
class myCRUD extends CoalCRUD {
  getAll(app, route, _) {
    app.get("/" + route, async (_, res) => {
      res.status(403).send();
    });
  }
}
```

In this example, we override the getAll method to send a 403 FORBIDDEN status code to the user, instead of serving all data.

## Endpoints

Returns all items:

```
GET http://localhost:3000/route-name
```

Returns single item by primary key:

```
GET http://localhost:3000/route-name/1
```

Create item based on model fields:

```
POST http://localhost:3000/route-name
```

Update item based on model fields:

```
POST http://localhost:3000/route-name
```

Delete item by primary key:

```
DELETE http://localhost:3000/route-name/1
```
