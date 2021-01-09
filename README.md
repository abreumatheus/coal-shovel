# Coal Shovel
Provides a simple CRUD endpoint set, for use with express and sequelize.

## Contents
- [Install](#install)
- [Usage](#usage)
- [Example Code](#example-code)
- [Endpoints](#endpoints)

## Install
```
npm i coal-shovel
```

## Usage
```javascript
const coalCRUD = require('coal-shovel');

let sampleCRUD = new coalCRUD(expressInstance, 'route-name', SequelizeModel);
sampleCRUD.registerCRUD()
```

## Example Code
```javascript
const coalCRUD = require('coal-shovel')
const express = require('express')
const Sequelize = require('sequelize');

const db = new Sequelize('sqlite::memory:');

const app = express()

const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

async function syncDB() {
    try {
        const result = await db.sync();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

syncDB()
let product = new coalCRUD(app, "product", Product);
product.registerCRUD();

const port = 3000
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
```

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
