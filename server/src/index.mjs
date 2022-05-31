// Fichier "mjs"
// m pour module
// cela va permettre d'utiliser les imports, ect des modules
// Et non pas les "requires"
// A ajouter également "--experimental-modules" dans le script
import path from 'path';
import express from 'express';

import db, { find } from "../db/index.mjs";

// mise en place de la variable "__dirname" quand on a un module
const __dirname = path.resolve();

const app = express();

// Activation du moteur de template PUG
app.set("view engine", "pug");
app.set("views", "./src/views");

// Plus besoin de body parser
// Nouvelle syntaxe :
app.use(express.urlencoded());

// CSS
app.use(
  '/public/stylesheets',
  express.static(__dirname + '/public/stylesheets')
);

app.get('/', function (req, res) {
  res.render("login")
});

// POST method route
app.post("/api/session/login", function (req, res) {
  // Objectif: vérifier la validité des identifiants reçus
  // 1) Récupérer les données envoyées en POST
  const { email, password } = req.body;
  // 2) Trouver l'utilisateur qui correspond à l'email reçu
  const user = find(db, email);
  // 3) Vérifier que le mdp est bien celui attendu
  if (user === false) {
    res.send(404);
    return;
  }
  if (password === user.password) {
    res.send(200);
    console.log(user);
  } else {
    res.send(500);
  }
});

app.listen(3000, () => {
    console.log("Started!");
});
