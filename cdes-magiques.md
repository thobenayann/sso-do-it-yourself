# Edition du fichier host

`sudo nano /etc/hosts`

On peut alors déclarer des noms de domaines sur notre ip 127.0.0.1 en écoute sur le port 80.

Cela va permettre à Nginx proxy de rediriger notre service vers le nom de domaine que l'on configure
et notamment grâce au la variable d'environnement du docker compose VIRTUAL_HOST

## Server

### Stoper apache pour pouvoir libérer le port 80 et utiliser Nginx

`sudo systemctl stop apache2`

### Installation des dépendances server

Création du fichier package.json
`npm init -y`

Install des dépendances prod et dev
`npm i express`
`npm i --save-dev nodemon`

### On oublie pas le fichier .gitignore ET le fichier .dockerignore

on écrit dans les 2 fichiers

```json
**/node_modules
```

Avec cette syntaxe, tous les fichiers précisés par le gitignore seront pris en compte
Quelque soit le niveau de profondeur

### On edit les commandes à lancer dans `package.json`

```json
  "scripts": {
    "start": "nodemon --experimental-modules src/index.mjs",
  },
  ```

La partie --experimental-modules permet l'utilisation des modules grâce au fichier mjs

### Si besoin de débugger un container

`docker exec -it <container> bash`

### Si votre image est en cache et que les fichiers ne sont pas mis à jour au rebuild

on peux forcer le rebuild avec `docker compose up --build`
