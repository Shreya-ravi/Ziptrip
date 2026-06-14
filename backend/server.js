const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "./todos.json";

function getTodos() {
  return JSON.parse(fs.readFileSync(FILE));
}

function saveTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}

app.get("/todos", (req, res) => {
  res.json(getTodos());
});

app.get("/todos/:id", (req, res) => {
  const todos = getTodos();
  const todo = todos.find(t => t.id == req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(todo);
});

app.post("/todos", (req, res) => {
  const todos = getTodos();

  const todo = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    completed: false
  };

  todos.push(todo);

  saveTodos(todos);

  res.status(201).json(todo);
});

app.put("/todos/:id", (req, res) => {
  const todos = getTodos();

  const index = todos.findIndex(
    t => t.id == req.params.id
  );

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  todos[index] = {
    ...todos[index],
    ...req.body
  };

  saveTodos(todos);

  res.json(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  let todos = getTodos();

  todos = todos.filter(
    t => t.id != req.params.id
  );

  saveTodos(todos);

  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});