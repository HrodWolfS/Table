# MultiTab

## Description

**MultiTab** est une application éducative conçue pour aider les enfants à apprendre les tables de multiplication de manière ludique et interactive. L'application propose différents modes de jeu adaptés aux besoins et au niveau de chaque enfant.

## Démo en ligne

🔗 [MultiTab sur Vercel](https://table-pi-two.vercel.app/)

## Fonctionnalités principales

### Mode classique

- Apprentissage progressif des tables de multiplication
- Exercices d'entraînement adaptés au niveau
- Tests de connaissances
- Système de badges de réussite pour motiver l'apprentissage
- Tableau de bord pour suivre sa progression

### Mode aventure

- Expérience immersive avec des quêtes thématiques
- Progression par niveaux de difficulté :
  - Niveau 1 : Tables de 1,
  - Niveau 2 : Tables de 2 puis test final avec les tables de 1 et 2
  - Niveau 3 : Tables de 3 puis test final avec les tables de 1, 2 et 3
  - ...
  - Niveau 10 : Test final avec toutes les tables
- Déblocage d'outils et d'artefacts spéciaux ayant un lien avec l'histoire en cours
- Collection de pièces pour personnaliser son avatar

### Fonctionnalités générales

- Avatar personnalisable dès la première connexion
- Interface adaptée aux enfants
- Compatible sur ordinateurs et tablettes
- Suivi détaillé des performances
- Système de récompenses motivant
- Sauvegarde automatique de la progression

## Prérequis

- Node.js 16.x ou supérieur
- npm 8.x ou supérieur
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)

## Technologies utilisées

- **Frontend** :
  - React 18
  - Next.js 13
  - Tailwind CSS
  - Framer Motion (animations)
  - Dicebear (génération d'avatars)

## Installation et démarrage

```bash
# Cloner le dépôt
git clone <URL_DU_DEPOT>
cd MultiTab

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev

# Construire l'application pour la production
npm run build

# Lancer l'application en production
npm start
```

L'application sera disponible sur `http://localhost:3000/`.

## Stockage des données

Les données utilisateur sont stockées localement via le **localStorage** du navigateur, ce qui permet :

- Une utilisation sans création de compte
- Une expérience simplifiée pour les enfants
- Une confidentialité accrue des données
- Un accès rapide aux données de progression

## Captures d'écran

<div align="center">

### Page d'accueil

<img src="./public/images/Capture1.png" alt="Page d'accueil de MultiTab" width="150">

### Mode Classique

<img src="./public/images/Capture2.png" alt="Interface du mode classique" width="473">

### Mode Aventure

<img src="./public/images/Capture3.png" alt="Interface du mode aventure" width="629">

</div>

## Comment contribuer

Les contributions sont les bienvenues ! Voici comment participer :

1. Forker le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commiter vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pousser vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

📝 Développé avec ❤️ pour rendre l'apprentissage des mathématiques plus amusant pour mes enfants
