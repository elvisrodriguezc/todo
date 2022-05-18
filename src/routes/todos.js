const express = require('express');
const router = express.Router();

const path = require("path");
const fs = require("fs");

const databasePath = path.resolve("./src/database/database.json");
const databaseRead = fs.readFileSync(databasePath, "utf-8");
const database = JSON.parse(databaseRead);

// Routes
router.get("/todos", (req, res) => {
    res.json(database);
});

router.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = database.data.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send("Todo not found");
    }
});

router.post("/todos", (req, res) => {
    const data = req.body;
    if (!data.id) {
        res.status(400).json({
            error: "Id is required"
        })
    }
    if (!data.name) {
        res.status(400).json({
            error: "Name is required"
        })
    }
    if (!data.age) {
        res.status(400).json({
            error: "Age is required"
        })
    }
    const newId = data.id
    if (database.data.find(todo => todo.id === newId)) {
        res.status(400).json({
            error: "Id already exists"
        });
    } else {
        database.data.push(data);
        fs.writeFileSync(databasePath, JSON.stringify(database));
        res.status(201).json(data);
    }
});

router.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = database.data.findIndex(item => item.id === id);
    if (index === -1) {
        res.status(404).json({ message: "TODO not found" });
    } else {
        database.data.splice(index, 1);
        fs.writeFileSync(databasePath, JSON.stringify(database));
        res.status(200).json({ message: "TODO eliminado exitosamente" });
    }
});

router.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = database.data.findIndex(item => item.id === id);
    if (index === -1) {
        res.status(404).json({ error: "TODO not found" });
    } else {
        const data = req.body;
        if (!data.name) {
            res.status(400).json({
                error: "Name is required"
            })
        }
        if (!data.age) {
            res.status(400).json({
                error: "Age is required"
            })
        }
        data.id = id;
        database.data[index] = data;
        fs.writeFileSync(databasePath, JSON.stringify(database));
        res.status(200).json(data);
    }
});

router.patch("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = database.data.findIndex(item => item.id === id);
    if (index === -1) {
        res.status(404).json({ error: "TODO not found" });
    } else {
        const data = req.body;
        if (data.name) {
            database.data[index].name = data.name;
        }
        if (data.age) {
            https://mega.nz/file/zEkEmS4b#ZgBgn1XOjUXQLPaBVQugKtC9I_JkChHLk1mORq0esa0
            database.data[index].age = data.age;
        }
        fs.writeFileSync(databasePath, JSON.stringify(database));
        res.status(200).json(database.data[index]);
    }
});


module.exports = router;
