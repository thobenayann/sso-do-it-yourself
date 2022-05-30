# Dans ce Dockerfile, je vais pouvoir dérouler toute la logique pour installer mon service
# FROM = image de base (provenant de Dockerhub)
FROM node:18

# WORKDIR permet de définir où se trouve docker lorsqu'il build l'image
# dans les images node il existe un utilisateur dans "/home/node/app"
# le /app est michelisable
# Donc il va créer le dossier "app" qui n'existe pas encore
WORKDIR /home/node/app
# Peu importe tant qu'on oublie pas la commande COPY pour envoyer nos fichiers/dossiers
# Au bon endroit (là ou doit se trouver le package.json ect)
# On copie tous les fichiers du projet/service "server"
# dans le dossier courant (/home/node/app)
COPY . /home/node/app
# Peut également s'écrire COPY . .
# COPY <côté machine où se trouve le Dockerfile> <côté container>

# Commandes exécutées dans le container
# ça utilisera le package-lock.json
RUN npm install

# Si l'image de base ne le fait pas
# Il faut parfois spécifier le port d'écoute du process de l'image
# de façon explicite
EXPOSE 3000

# l'utilisation de CMD permettra d'exécuter des commandes une fois
# que l'image aura finie son build (donc, DANS le container)
# On anticipe le processus qui devra être lancé dans le container instancié.
CMD ["npm", "run", "start"]
