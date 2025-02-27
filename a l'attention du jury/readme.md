- Projet FSJS40

Bienvenue dans le projet FSJS40 ! Ce document vous guidera dans l'installation et l'exécution du projet en local.

- Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

Node.js (v16+ recommandé)

Git

phpmyadmin (si une base de données est utilisée en local)

- Installation

Cloner le dépôt :

git clone https://github.com/GBaudelet/projet-FSJS40.git
cd projet-FSJS40

- Installer les dépendances :

Backend :

cd backend
npm install

Frontend :

cd frontend
npm install

- Configuration

Créez un fichier .env dans le dossier backend et ajoutez les variables d'environnement requises :

LOCAL_PORT=9000
SECRET_KEY_SESSION="your secret key"
DB_HOST=localhost
DB_USER=root
DB_PASS="your password"
DB_NAME=nom_de_ta_base

Note : Remplacez nom_de_ta_base par le nom de votre base phpmyadmin.

Lancer le projet en local

Démarrer le backend :

cd backend
npm start

Démarrer le frontend :

cd ../frontend
npm run dev

Le frontend sera accessible sur http://localhost:5173 et le backend sur http://localhost:9000.

- Contribution

Si vous souhaitez contribuer :

Forkez le projet

Créez une branche (git checkout -b feature/nouvelle-fonction)

Commitez vos modifications (git commit -m "Ajout d'une nouvelle fonctionnalité")

Poussez la branche (git push origin feature/nouvelle-fonction)

Ouvrez une pull request
