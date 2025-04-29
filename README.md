# Movies API - Application Next.js avec MongoDB

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## Description

Movies API est une application web moderne construite avec Next.js et MongoDB. Cette application offre une API pour gérer une collection de films et leurs commentaires associés. Elle démontre comment connecter et utiliser MongoDB comme base de données backend pour votre application Next.js, offrant une solution et évolutive pour la gestion de données de films.

## Fonctionnalités

- API RESTful pour la gestion des films
- Système de commentaires pour chaque film
- Documentation API intégrée avec Swagger
- App de démonstration pour tester les fonctionnalités
- Stockage de données avec MongoDB
- Routes API typées avec TypeScript
- Déploiement facile sur Vercel

## Démarrage

### Prérequis

- Node.js 14.6.0 ou version supérieure
- npm, yarn ou pnpm
- Compte MongoDB Atlas (gratuit) ou MongoDB installé localement

### Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/votre-username/with-mongodb-app.git
cd with-mongodb-app
```

2. Installez les dépendances :

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configurez les variables d'environnement :

```bash
cp .env.local.example .env.local
```

Modifiez le fichier `.env.local` et ajoutez votre chaîne de connexion MongoDB :

```
MONGODB_URI=votre_chaine_de_connexion_mongodb
```

4. Lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Votre application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).

## 🔧 Configuration

### Configuration de MongoDB

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuit) ou utilisez une installation locale de MongoDB.

2. Pour MongoDB Atlas :
   - Créez un nouveau cluster
   - Configurez un utilisateur de base de données avec les privilèges appropriés
   - Configurez les règles de réseau pour permettre l'accès depuis votre adresse IP
   - Obtenez votre chaîne de connexion en cliquant sur "Connect" > "Connect your application"

3. Ajoutez la chaîne de connexion à votre fichier `.env.local`.

### Structure du projet

```
├── .next/                       # Dossier de build Next.js
├── app/                         # Dossier principal de l'application
│   ├── api/                     # Routes API
│   │   ├── movies/              # API pour les films
│   │   │   ├── [idMovie]/       # Route dynamique pour un film spécifique
│   │   │   │   ├── comments/    # API pour les commentaires d'un film
│   │   │   │   │   └── [idComments]/  # Route pour un commentaire spécifique
│   │   │   │   └── route.ts     # Gestionnaire de route pour un film
│   │   │   └── route.ts         # Gestionnaire de route pour tous les films
│   ├── api-doc/                 # Documentation API avec Swagger
│   │   ├── page.tsx             # Page de documentation API
│   │   └── react-swagger.tsx    # Composant Swagger pour React
│   └── app-demo/                # Démo de l'application
│       ├── page.tsx             # Page principale de démo
│       ├── actions.ts           # Actions côté serveur
│       ├── favicon.ico          # Icône de l'application
│       └── layout.tsx           # Layout de l'application
├── lib/                         # Utilitaires et fonctions d'aide
│   ├── mongodb.ts               # Configuration de la connexion à MongoDB
│   └── swagger.ts               # Configuration Swagger
├── node_modules/                # Dépendances installées
├── pages/                       # Pages traditionnelles (dans le cas d'une structure mixte)
├── public/                      # Fichiers statiques
├── styles/                      # Feuilles de style CSS/SCSS
├── .env.local                   # Variables d'environnement (à créer)
├── .gitignore                   # Configuration Git
├── next-env.d.ts                # Types pour Next.js
├── next.config.js               # Configuration de Next.js
└── package-lock.json            # Verrouillage des versions des dépendances
```

## Utilisation de l'API

localhost:3000/api-doc


### Documentation API avec Swagger

L'application inclut une documentation Swagger accessible via la route `/api-doc`. Elle est configurée dans le fichier `lib/swagger.ts` et implémentée dans `app/api-doc/page.tsx`.

Pour plus d'informations sur la façon d'interroger votre base de données, consultez la [documentation MongoDB](https://docs.mongodb.com/) et la [documentation du pilote Node.js pour MongoDB](https://mongodb.github.io/node-mongodb-native/).

## Déploiement

### Déploiement sur Vercel

Le moyen le plus simple de déployer votre application Next.js est d'utiliser [Vercel](https://vercel.com), la plateforme des créateurs de Next.js.

1. Poussez votre code vers GitHub, GitLab ou Bitbucket.

2. Importez votre projet sur Vercel:
   - Connectez-vous à [Vercel](https://vercel.com)
   - Sélectionnez "Import Project" et pointez vers votre dépôt
   - Configurez les variables d'environnement (notamment `MONGODB_URI`)
   - Cliquez sur "Deploy"

**Alternative**: Déployez directement avec le bouton Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvotre-username%2Fwith-mongodb-app)

## Technologies utilisées

- [Next.js](https://nextjs.org/) - Framework React pour la production
- [TypeScript](https://www.typescriptlang.org/) - Langage de programmation typé
- [MongoDB](https://www.mongodb.com/) - Base de données NoSQL orientée document
- [React](https://reactjs.org/) - Bibliothèque JavaScript pour les interfaces utilisateur
- [Swagger](https://swagger.io/) - Outil de documentation d'API
- [App Router](https://nextjs.org/docs/app) - Nouvelle architecture de routage Next.js

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Contact

Robin GARCIA / Kieran GREEN