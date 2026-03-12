# Documentation Projet : WikiLearn

> **Étudiant** : Ramy Nebili
> **Formation** : Bachelor Développement Web 1ère Année - HETIC
> **Projet** : Plateforme E-learning (Type Wikipédia interactif)

---

## 🏗️ Architecture et Choix Techniques

Ce projet a été construit dans une optique de **scalabilité, performance et maintenabilité**, en appliquant les standards actuels de l'industrie du développement Front-End.

### 1. Framework et Cœur du Projet
- **Next.js (App Router v14+)** : Choisi pour bénéficier du SSR (Server-Side Rendering) natif sur les futures fiches, optimisant le SEO et les performances de chargement. Le système de routing par dossier simplifie l'organisation.
- **React (v19)** : Utilisation exclusive de composants fonctionnels et des Web Hooks modernes (`useState`, `useEffect`).
- **JavaScript Standard** : Développement en JS Vanilla (sans TypeScript pour ce premier projet).

### 2. Méthodologie d'Implémentation : Atomic Design
Pour éviter un code monolithique et peu réutilisable, le projet suit de manière stricte le pattern **Atomic Design** proposé par Brad Frost :
- `components/atoms/` : Les éléments de base. (ex: `Button.jsx`, `Typography.jsx`, `ImageWrapper.jsx`). Un atome ne dépend jamais d'aucune autre couche fonctionnelle métier.
- `components/molecules/` : Assemblage d'atomes pour créer un block de sens. (ex: `TopicCard.jsx` combine Image, Titre et Bouton).
- `components/organisms/` : Des sections autonomes et interactives de l'interface. (ex: `TopicCarousel.jsx`, `HeaderLogo.jsx`).

### 3. Gestion de l'État (State Management)
- **Zustand** : Utilisé à la place de Redux ou Context API en raison de sa légèreté temporelle (0 boilerplate) et de son intégration parfaite avec des Hooks.
  - *Choix pédagogique* : Le contexte React a l'inconvénient de déclencher un re-render de tous ses enfants lorsque la référence du store change. Zustand gère des souscriptions par sélecteur, garantissant qu'un composant ne se re-render que si la donnée dont il a *exactement* besoin a changé.
  - Implémenté avec le middleware `persist` couplé au `localStorage` pour récupérer la session de l'utilisateur (thème en cours, score du dernier quiz) après un rechargement manuel.

### 4. Styles et CSS
- **CSS Modules (`*.module.css`)** : Garantit une portée locale unique à chaque composant (scoping) et évite toutes collisions de noms de classes. C'est l'approche la plus solide en React en dehors de frameworks typés comme Tailwind ou styled-components.
- **Variables Globales (`globals.css`)** : Utilisation intensive des Custom Properties (`var(--color-...)`) pour regrouper le "Design System" à un seul endroit, facilitant un éventuel passage au "Dark Mode" ou un "Theming".
- **CSS Moderne** : Utilisation de `scroll-snap-type` pour gérer mécaniquement le défilement du Carousel sans librairies JavaScript lourdes. Implémentation du style "cartoon" en exploitant des `border-radius` irréguliers.

### 5. Animations et Fluides Pédagogiques
- **Framer Motion** : Principal moteur d'animation du projet. Il apporte un côté "vivant" ("App Feel") indispensable pour une application ludo-éducative. Nous l'utilisons pour les rebonds (`type: "spring"`) sur les boutons et les apparitions progressives en liste ("staggered animations").

### 6. Flux de Navigation et Données (Data Flow)
1. **Mock Data** (`topicsMock.json`) : Anticipation de l'appel à une API distante (ex. Wikimedia/GROQ CMS). Découplage strict entre la vue (UI) et la donnée.
2. **Transition asynchrone** (Loader) : Implémentation d'une page de transition artificielle (`/loading/page.jsx`) simulant la latence réseau (1.5s) avant un changement de page important, respectant ainsi les bonnes pratiques UX (feedback de temps d'attente).

---

## 📂 Arborescence Principale du Code Source

```text
/src
 ├── app/               # Routes Next.js
 │    ├── globals.css   # variables couleurs/typo
 │    ├── layout.jsx    # enveloppe HTML/Fonts
 │    ├── page.jsx      # redirection /learn
 │    ├── learn/        # Page d'accueil (Choix du Thème)
 │    └── loading/      # Page transitoire (Loader asynchrone)
 │
 ├── components/        # ATOMIC DESIGN INTERFACES
 │    ├── atoms/        #  - Boutons, Typos, Wrapper Images
 │    ├── molecules/    #  - Cartes
 │    └── organisms/    #  - Header, Carousel
 │
 ├── data/              # Base de Données "Mockée" (topicsMock.json)
 └── store/             # Logique Métier Globale Vanilla (useAppStore.js)
```

## 🔨 Lancement de l'Environnement de Développement

```bash
# Installation des dépendances (React, Next, Zustand, Framer-motion)
npm install

# Lancement du serveur local 
npm run dev
```

*Le projet sera accessible sur: http://localhost:3000.*
