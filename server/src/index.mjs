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

// MW gestion des cookies
app.use((req, res, next) => {
  req.cookies = {};
  if(req.headers.cookie) {
    const cookies = req.headers.cookie;

    const cookiesArray = cookies.split("; ");
    const parsedCookies = {};
  
    for (let cookie of cookiesArray) {
      const [key, value] = cookie.split("=");
      parsedCookies[key] = value;
    }
  
    req.cookies = parsedCookies;
  }
  next();
});

app.get('/', function (req, res) {
  // Objectif : distinguer deux cas :
  // - soit l'utilisateur est anonyme (pas de cookies de session, soit invalide)
  // - soit l'utilisateur est connecté (cookie de session valide)

  console.log(">>>>>>", req.cookies);

  if (req.cookies.sso_session) {
    res.render("logout")
  } else {
    res.render("login")
  }
});

app.get("/api/session", function(req, res) {
  res.render("session", { token: req.cookies.sso_session })
})

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
    res.cookie("sso_session", email, {
      sameSite: "none",
      secure: true
    })
      // .send(200);
      .redirect("/api/session");
  } else {
    res.send(500);
  }
});

app.listen(3000, () => {
    console.log("Started!");
});
