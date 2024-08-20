const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // path("/views")
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});
app.use(express.static("public"));

app.get("/", (req, res) => {
  const users = [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
    },
    {
      firstName: "Jack",
      lastName: "Doe",
    },
    {
      firstName: "Joe",
      lastName: "Doe",
    },
  ];
  res.render("index", {
    pageTitle: "Bonjour monde!",
    message: "Coucou les gens !",
    users: users,
  });
});

app.get("/about", (req, res) => {
  res.send("Page A propos");
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { view, order } = req.query;
  res.send(`L'id utilisateur est le : ${userId}`);
});

app.get("/contact", (req, res) => {
  res.send("Page contact");
});

const port = 3000;
app.listen(port, () => {
  console.log(
    `Le serveur Express est en cours d'exécution sur http://localhost:${port}/`
  );
});
