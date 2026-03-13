# 📚 WikiLearn

> **Sauvez le savoir de l'humanité, une page à la fois.**
>
> *Projet de fin de Coding Sprint - Création du nouveau service d'apprentissage de Wikipédia.*

🎓 **Étudiants :** Ramy Nebili, Noé Chauvin, Amina Imadjene, Juliana Neto, Douglas Quintero
🏫 **Formation :** Bachelor Développement Web 1ère Année - HETIC (Sprint B1)  
🔗 **Repository :** [https://github.com/ramynbl/wiki-learn.git](https://github.com/ramynbl/wiki-learn.git)

---

## 📖 Le Lore : Le vol de la grande Bibliothèque

Notre site **WikiLearn** plonge l’utilisateur dans un univers narratif précis : **tout le savoir de Wikipédia a été dérobé par un mystérieux voleur**, dispersant les livres aux quatre coins du monde. Les étagères de la grande bibliothèque de l'humanité sont vides.

**L'objectif du joueur ?** Restaurer cette bibliothèque.
Pour cela, il doit accomplir des leçons pour retrouver des **Pages** (qui agissent comme des points d'XP). Ces pages permettent de reformer des **Livres** (qui agissent comme des Niveaux). Chaque livre débloqué est rangé dans la galerie du joueur et lui octroie des récompenses (skins, icônes) pour personnaliser son avatar !

---

## 🎮 Gamification & Boucle de Gameplay

Le jeu a été pensé pour récompenser la curiosité tout en évitant la frustration.

### 1. Le Déroulé d'une Leçon (Micro-learning)

Le joueur choisit une catégorie thématique. La leçon se divise en 5 cartes interactives pensées pour le mobile :

- **Card 1 :** Présentation du sujet.
- **Card 2 :** "En bref" (Des chiffres clés et statistiques).
- **Cards 3, 4 et 5 :** Des anecdotes surprenantes et marquantes.

Une fois les cartes lues, place au **Quiz** : un QCM de 3 questions pour tester les connaissances.
🏆 *Récompense :* La réussite de la mission octroie **5 pages**.

### 2. Crafting : Pages (XP) et Livres (Niveaux)

La collection de livres est le moteur de satisfaction du jeu. Pour que le joueur ne se sente pas bloqué, la progression est finement calibrée :

- **Une courbe linéaire (et non exponentielle) :** Le nombre de pages retombe à 0 après avoir obtenu un livre. Les premiers s'obtiennent vite :
  *Livre 1 = 5 pages ➔ Livre 2 = 10 pages ➔ Livre 3 = 20 pages ➔ Livre 4 = 40 pages...*
- **Des jauges indépendantes par catégorie :** C'est le cœur de notre système. Si un joueur s'est spécialisé en "Histoire" et a besoin de 500 pages pour son prochain livre, il peut se sentir découragé. S'il lance sa toute première leçon de "Géographie", il n'aura besoin que de 5 pages pour obtenir un nouveau livre ! **Cela pousse le joueur à explorer de nouveaux thèmes.**

### 3. Aspect Social & Compétition

- **Classement (Leaderboard) :** Un tableau des scores met en avant les contributeurs ayant ramené le plus de pages à la bibliothèque mondiale.
- **Galeries partagées :** Possibilité de visiter les profils de ses amis pour comparer ses collections de livres et ses skins d'avatar.

---

## 🚀 Roadmap & Fonctionnalités Futures

Pour maintenir l'engagement des joueurs sur le long terme, voici les *features* prévues :

- 🎁 **Leçon "Surprise" du jour :** Un thème généré aléatoirement (toutes catégories confondues) pour une récompense quotidienne.
- 🔍 **Moteur de recherche IA :** Une barre de recherche reliée à l'API Wikipédia et à un LLM pour générer une leçon jouable sur *n'importe quel sujet* précis demandé par le joueur.
- ⚔️ **Défis Multijoueurs :** Des "battles" de culture générale entre joueurs ayant un nombre de pages similaire.
- 🌍 **Événements Communautaires (Raids) :** Des événements à durée limitée où toute la communauté s'unit. *Exemple : Pour la journée des droits des femmes, un module spécial nécessite de récolter 10 000 pages en commun sur des figures historiques féminines pour débloquer un livre légendaire très rare.*
- ✨ **Feedbacks Visuels & Sonores :** - Une cinématique 2D d'intro rétro présentant le lore.
  - Une animation gratifiante au moment du "craft" d'un livre.
  - Une ambiance sonore dynamique (musique de fond, SFX d'UI).
- ⚙️ **Page Paramètres & Profil :** Personnalisation de l'avatar, gestion de la langue, du volume, et galerie des livres.

---

## 🏗️ Architecture et Choix Techniques

Ce projet a été construit dans une optique de **scalabilité, performance et maintenabilité**, en appliquant les standards de l'industrie Front-End.

### 1. Framework et Cœur du Projet

- **Next.js (App Router v14+) :** Choisi pour le SSR (Server-Side Rendering) sur les futures fiches, optimisant le SEO et les performances. Le routing par dossier simplifie l'architecture.
- **React (v19) :** Utilisation exclusive de composants fonctionnels et des Web Hooks modernes (`useState`, `useEffect`).
- **JavaScript Standard :** Développement en JS Vanilla.

### 2. Méthodologie d'Implémentation : Atomic Design

Pour éviter un code monolithique, le projet suit de manière stricte le pattern **Atomic Design** (Brad Frost) :

- `components/atoms/` : Éléments de base (ex: `Button.jsx`, `Typography.jsx`). Zéro dépendance métier.
- `components/molecules/` : Assemblage d'atomes (ex: `TopicCard.jsx` combine Image, Titre et Bouton).
- `components/organisms/` : Sections autonomes et interactives (ex: `TopicCarousel.jsx`, `HeaderLogo.jsx`).

### 3. Gestion de l'État (State Management)

- **Zustand :** Utilisé à la place de Redux ou Context API pour sa légèreté. Zustand gère des souscriptions par sélecteurs, garantissant qu'un composant ne se re-render *que* si sa donnée spécifique change (contrairement au Context React natif).
- **Persistance :** Middleware `persist` couplé au `localStorage` pour sauvegarder la session du joueur (XP, thème en cours, scores).

### 4. Styles et CSS

- **CSS Modules (`*.module.css`) :** Garantit un scoping local (aucune collision de classes).
- **Variables Globales (`globals.css`) :** Utilisation intensive des Custom Properties (`var(--color-...)`) pour centraliser le Design System (prêt pour le theming/Dark Mode).
- **CSS Moderne :** Utilisation de `scroll-snap-type` pour le carousel (sans surcharge JS) et de `border-radius` irréguliers pour un style "cartoon/jeu vidéo".

### 5. Animations et Fluides Pédagogiques

- **Framer Motion :** Moteur d'animation principal. Apporte un "App Feel" essentiel à un jeu avec des rebonds (`type: "spring"`) et des apparitions en liste (*staggered animations*).

### 6. Flux de Navigation et Données (Data Flow)

- **Mock Data (`topicsMock.json`) :** Découplage strict UI/Données en anticipation de l'appel API distant (Wikimedia / Groq).
- **Transition Asynchrone :** Page de transition artificielle (`/loading/page.jsx`) simulant une latence réseau pour respecter les bonnes pratiques UX.

---

## 📂 Arborescence du Code Source

```text
/src
 ├── app/               # Routes Next.js
 │    ├── globals.css   # Variables globales
 │    ├── layout.jsx    # Enveloppe HTML
 │    ├── page.jsx      # Redirection vers /learn
 │    ├── learn/        # Page d'accueil (Choix du Thème)
 │    └── loading/      # Page transitoire (Loader asynchrone)
 │
 ├── components/        # ATOMIC DESIGN
 │    ├── atoms/        # Boutons, Typos
 │    ├── molecules/    # Cartes, UI composées
 │    └── organisms/    # Header, Carousel
 │
 ├── data/              # Base de Données "Mockée" (topicsMock.json)
 └── store/             # Logique Métier / XP (useAppStore.js)
