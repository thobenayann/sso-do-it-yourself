// Fichier "mjs"
// m pour module
// cela va permettre d'utiliser les imports, ect des modules
// Et non pas les "requires"
// A ajouter également "--experimental-modules" dans le script
import path from 'path';
import express from 'express';

// mise en place de la variable "__dirname" quand on a un module
const __dirname = path.resolve();

const app = express();

// Activation du moteur de template PUG
app.set("view engine", "pug");
app.set("views", "./src/views");

// CSS
app.use(
  '/public/stylesheets',
  express.static(__dirname + '/public/stylesheets')
);

app.get('/', function (req, res) {
  res.render("login")
});

app.listen(3000, () => {
    console.log("Started!");
});
