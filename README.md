# Task-Manager-App
Ce projet est une application de gestion de tâches qui permet aux utilisateurs de créer, lire, mettre à jour et supprimer des tâches.
![Conception.png](Conception.png)

## Les étapes pour démarrer ce projet

Ce projet est divisé en deux parties :
1. une partie /Backend/ réalisée avec :
- Langage : Node.js
- Framework : Express.js
- Base de données : MySQL
- ORM : Prisma
- Sécurité : Utilisation de JWT (JSON Web Tokens) pour la gestion des tokens d'authentification

2. une partie /Frontend/ réalisée avec :
- Langage : JavaScript (ES6+)
- Framework : React.js
- UI Library : Tailwind-UI

Pour tester le projet on le clone d'abord avec la commande:    
```bash
git clone https://github.com/anaserrami/Task_Management_App.git
```

### Partie Backend:

Pour la partie /backend/ il faut installer `node_modules` en executant les commandes suivant dans le `git bash` ou `cmd`:
```bash
cd backend
npm i
```

Et créer un fichier `.env` qui contient `DATABASE_URL` le lien pour la base de données (mettez le nom d'utilisateur et le mot de passe de votre base de données dans `DATABASE_URL` ) et `TOKEY_KEY`, alors remplir par le code suivant :
```bash
DATABASE_URL="mysql://username:yourpassword@host:port/database_name"
TOKEN_KEY = "your_token_key"
```
pour mysql url database est par défaut `mysql://root:@localhost:3306/database_name`

Apres il faut faire la migration de la base donnees avec la commande suivant:
```bash
npx prisma migrate dev
```

Nous devons remplir la base de données en utilisant le fichier seeds situé dans le dossier seeds :
```bash
node seeds/seeds.js
```

Apres lancer le backend avec la commande :
```bash
nodemon index.js
```

### Partie Frontend:

Dans un autre terminal `cmd` on accede au frontend par :
```bash
cd frontend
```

Et on doit installer `node_modules` avec :
```bash
npm i
```

Puis lancer le frontend avec la commande suivant:
```bash
npm start
```

Après, assurez-vous que vous démarrez mysql en utilisant `xaamp` et naviguer vers `http://localhost:3000/` pour tester le projet.
### Il faut que les deux serveurs de backend et frontend doit démarer pour que le projet travailler et naviguer vers http://localhost:3000

### N.B. Pour authentifier comme admin il faut utiliser les informations suivantes:
```bash
email: admin@gmail.com
password: admin
```

### N.B. Ces informations sont déjà generées après l'execution du fichier seeds.