# PermiX

<div align="center">

![PermiX](public/icons/icon-192x192.png)

**Application d'apprentissage du Code de la Route au Bénin**

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📋 Table des matières

- [🎯 À propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Stack Technique](#️-stack-technique)
- [🚀 Installation](️-installation)
- [💻 Scripts Disponibles](-scripts-disponibles)
- [📁 Structure du Projet](-structure-du-projet)
- [📊 Données et Traitement](-données-et-traitement)
- [🌐 Déploiement](-déploiement)
- [🤝 Contribuer](-contribuer)

---

## 🎯 À propos

**PermiX** est une Progressive Web Application (PWA) complète pour l'apprentissage du Code de la Route au Bénin. Elle permet aux candidats au permis de conduire de se préparer efficacement grâce à différents modes d'apprentissage interactifs.

L'application contient **641 questions** extraites du manuel officiel, avec support d'images et feedback immédiat pour optimiser l'apprentissage.

---

## ✨ Fonctionnalités

### 📚 Modes d'Apprentissage

| Mode            | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| **📖 Révision** | Apprenez à votre rythme avec correction immédiate et mode d'entraînement |
| **📝 Examen**   | Simulez les conditions réelles d'examen (15 secondes par question)       |
| **📋 Sommaire** | Accédez à toutes les questions pour une révision ciblée                  |

### 🎨 Interface Utilisateur

- 🌓 **Thème Clair/Sombre** avec détection automatique des préférences système
- 📱 **Design Responsive** optimisé pour mobile et desktop
- 🎭 **Animations Fluides** avec GSAP pour une expérience utilisateur agréable
- 🖼️ **Support d'Images** pour les questions illustrées

### 💾 Fonctionnalités PWA

- 📲 **Installation** Ajoutez l'app à votre écran d'accueil
- 🔄 **Mode Hors Ligne** Fonctionne sans connexion internet
- 📊 **Persistance des Données** Sauvegarde automatique de la progression

### 📈 Suivi de Progression

- ✅ **Progression en Mode Révision** Reprenez où vous vous êtes arrêté
- 📊 **Historique des Examens** Consultez vos résultats passés avec détails
- 🎯 **Statistiques Détaillées** Analyse performance par question

---

## 🛠️ Stack Technique

### Frontend

- **Framework** : [Next.js 14](https://nextjs.org/) avec App Router
- **Langage** : [TypeScript 5](https://www.typescriptlang.org/)
- **UI** : [React 18](https://react.dev/)
- **Styling** : [Tailwind CSS 3](https://tailwindcss.com/)
- **Animations** : [GSAP 3](https://greensock.com/gsap/)
- **PWA** : [Next-PWA](https://github.com/DuCanhGH/next-pwa/)

### Backend & Build

- **Runtime** : Node.js
- **Package Manager** : npm
- **Image Processing** : Sharp

---

## 🚀 Installation

### Prérequis

- Node.js 18+ et npm
- Python 3.x (pour le traitement des données uniquement)

### Étapes

```bash
# Cloner le repository
git clone https://github.com/votre-username/mon-permis-bj.git
cd mon-permis-bj

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

---

## 💻 Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Crée un build de production
npm start            # Lance le serveur de production

# PWA
npm run generate-sw  # Génère le service worker

# Outils
npm run generate-icons  # Génère les icônes de l'application
```

---

## 📁 Structure du Projet

```
mon-permis-bj/
├── public/                    # Assets statiques
│   ├── icons/                # Icônes PWA
│   ├── manifest.json         # Manifest PWA
│   ├── sw.js                 # Service Worker généré
│   └── questions_reponses.json # Base de données questions
│
├── src/
│   ├── app/                  # Pages Next.js (App Router)
│   │   ├── layout.tsx       # Layout racine + métadonnées PWA
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── revision/        # Mode révision
│   │   ├── examen/          # Mode examen
│   │   ├── historique/      # Historique des examens
│   │   └── sommaire/        # Sommaire des questions
│   │
│   ├── components/          # Composants React
│   │   ├── QuestionCard.tsx    # Affichage question
│   │   ├── ExamConfig.tsx      # Configuration examen
│   │   ├── ExamSummary.tsx     # Résultats examen
│   │   ├── Navbar.tsx          # Barre de navigation
│   │   ├── Layout.tsx          # Layout principal
│   │   └── ClientLayout.tsx    # Wrapper client-side
│   │
│   ├── context/             # Contextes React
│   │   └── ThemeContext.tsx  # Gestion du thème
│   │
│   ├── types/               # Types TypeScript
│   │   ├── Question.ts      # Interface question
│   │   └── ExamResult.ts    # Interface résultat
│   │
│   ├── utils/               # Utilitaires
│   │   ├── storage.ts       # Gestion localStorage
│   │   └── examUtils.ts     # Fonctions utilitaires examen
│   │
│   └── styles/              # Styles globaux
│       └── globals.css      # CSS global + Tailwind
│
|
│
├── next.config.js          # Configuration Next.js + PWA
├── tailwind.config.js      # Configuration Tailwind
├── tsconfig.json           # Configuration TypeScript
└── package.json            # Dépendances et scripts
```

---

## 📊 Données et Traitement

### Source des Données

Les questions sont extraites du **Manuel Officiel du Code de la Route au Bénin**.

### Processus d'Extraction

```
PDF Manuel → Extraction PyMuPDF → Reconnaissance Patterns → Extraction Images
→ Nettoyage Données → Fusion & Dédoublonnage → Contrôle Qualité → JSON Final
```

### Fichiers de Données

| Fichier                   | Description                                |
| ------------------------- | ------------------------------------------ |
| `questions_reponses.json` | Base de données principale (641 questions) |

---

## 🌐 Déploiement

### Build de Production

```bash
# Créer le build optimisé
npm run build

# Tester en local
npm start
```

### Plateformes Recommandées

- **Vercel** (recommandé pour Next.js)
- **Netlify**
- **Railway**
- **Tout hébergeur Node.js**

### Variables d'Environnement

Aucune variable d'environnement requise pour le fonctionnement de base.

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment vous pouvez aider :

1. **Corriger des questions** : Éditez `questions_reponses.json`
2. **Améliorer l'UI** : Modifiez les composants dans `src/components/`
3. **Ajouter des fonctionnalités** : Créez des pull requests
4. **Signaler des bugs** : Ouvrez une issue

### Convention de Code

- Utilisez TypeScript pour tout nouveau code
- Suivez le style existant (ESLint/Prettier)
- Ajoutez des commentaires pour les fonctions complexes
- Testez en développement avant de commit

---

## 📝 Licence

Ce projet est créé pour aider les candidats au permis de conduire au Bénin.

---

<div align="center">

**Bon courage pour votre examen ! 🚗**

</div>
