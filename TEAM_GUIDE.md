# 📚 Wikilearning - Guide de Démarrage et Collaboration

Bienvenue sur le projet **Wikilearning** ! Ce document t'expliquera pas à pas comment installer le projet sur ta machine et comment nous allons collaborer ensemble via GitHub.

---

## 🚀 1. Initialiser le projet de ton côté (Installation)

Pour commencer à travailler sur le projet, tu dois récupérer le code sur ton ordinateur et installer les dépendances nécessaires.

### Prérequis
Assure-toi d'avoir installé sur ton ordinateur :
- **[Git](https://git-scm.com/)** : Pour versionner et récupérer le code.
- **[Node.js](https://nodejs.org/en/)** (version 18+ recommandée) : Pour faire tourner le projet React/Vite.

### Étapes d'installation

1. **Cloner le projet (Récupérer le code)**  
   Ouvre ton terminal et positionne-toi dans le dossier où tu veux ranger le projet (ex: `cd Desktop`). Lance ensuite :
   ```bash
   git clone <LIEN_DU_DEPOT_GITHUB_ICI>
   ```
   *(Remplace `<LIEN_DU_DEPOT_GITHUB_ICI>` par l'URL du dépôt GitHub, ex: `https://github.com/ton-pseudo/wikilearning.git`)*

2. **Entrer dans le dossier du projet**
   ```bash
   cd wikilearning
   ```

3. **Installer les dépendances**  
   Le projet utilise plusieurs bibliothèques (React, Axios, Framer Motion, etc.). Pour les installer, tape :
   ```bash
   npm install
   ```

4. **Lancer le serveur de développement**  
   Pour voir le site tourner en local sur ton navigateur, lance :
   ```bash
   npm run dev
   ```
   Le terminal te donnera un lien (généralement `http://localhost:5173/`). Clique dessus pour voir le site !

---

## 🤝 2. Comment collaborer avec GitHub (Le Workflow)

Pour éviter qu'on ne casse le travail de l'autre ou qu'on ait des conflits insolubles, voici la méthode de travail (le *workflow*) que nous allons utiliser.

### Règle d'or : Ne JAMAIS coder directement sur la branche `main` !
La branche `main` (ou `master`) doit toujours contenir du code qui **fonctionne parfaitement**. On ne travaille que sur des *branches parallèles*.

### Le cycle de travail classique :

#### Étape A : Avant de commencer à coder
Toujours s'assurer d'avoir la dernière version du code !
```bash
# 1. Se placer sur la branche principale
git checkout main

# 2. Récupérer les nouveautés de l'équipe
git pull origin main
```

#### Étape B : Créer ta propre branche
Tu vas travailler sur une fonctionnalité ? Crée une branche avec un nom clair (ex: `ajout-barre-recherche`, `fix-bug-header`).
```bash
# Créer et se déplacer sur une nouvelle branche appelée "ma-nouvelle-feature"
git checkout -b nom-de-ma-branche
```

#### Étape C : Coder et Sauvegarder (Commit)
Fais tes modifications dans le code. Quand tu as terminé une étape logique, sauvegarde-la :
```bash
# 1. Ajouter les fichiers modifiés pour la sauvegarde
git add .

# 2. Créer la sauvegarde avec un message très clair
git commit -m "Ajout de la barre de recherche dans le Header"
```
*(N'hésite pas à faire plusieurs "commits" réguliers plutôt qu'un seul énorme à la fin).*

#### Étape D : Partager ton travail sur GitHub
Quand ta fonctionnalité est terminée, tu l'envoies sur Internet (sur GitHub) :
```bash
# Pousser ta branche vers le dépôt (la première fois, utilise cette commande exacte)
git push -u origin nom-de-ma-branche
```

#### Étape E : La Pull Request (Demander la fusion)
C'est l'étape la plus importante ! Tu ne fusionnes **jamais** ton code toi-même. C'est Ramy (le responsable du projet) qui va vérifier ton code avant de l'accepter.

1. Va sur le dépôt GitHub du projet dans ton navigateur web.
2. Tu verras une notification jaune/verte avec un bouton **"Compare & pull request"**. Clique dessus.
3. Remplis les informations :
   - **Titre** : Donne un titre clair (ex: *Ajout de la barre de recherche*).
   - **Description** : Explique rapidement ce que tu as fait et s'il y a des choses spécifiques à tester.
4. **Très important : Les Reviewers**. Sur la droite de la page de la Pull Request, clique sur l'engrenage à côté de **"Reviewers"** et sélectionne le compte de Ramy. Cela va lui envoyer une notification pour lui dire que ton code est prêt à être vérifié !
5. Clique sur le bouton vert **"Create pull request"**.

À partir de là, ton travail est en pause pour cette fonctionnalité. Ramy va relire ton code :
- S'il y a des modifications à apporter, il te laissera des commentaires. Tu n'auras qu'à refaire des *commits* sur ta même branche (Étape C), ils s'ajouteront automatiquement à la Pull Request !
- Si tout est parfait, Ramy cliquera sur "Merge" et ton code sera intégré à la branche principale.

---

### ⚠️ Que faire une fois que Ramy a validé et "mergé" ma Pull Request ?

Une fois que ton code est accepté et intégré dans `main` par Ramy, tu dois mettre à jour ton ordinateur avant de commencer une nouvelle tâche :

```bash
# 1. Revenir sur la branche principale
git checkout main

# 2. Récupérer la dernière version du code (qui contient maintenant tes ajouts validés)
git pull origin main

# 3. (Optionnel) Supprimer ta branche locale qui ne sert plus à rien
git branch -d nom-de-ma-branche
```

Et tu peux recommencer le cycle (Étape B) pour ta prochaine mission !

---

## 📂 3. Structure du projet

Voici un rappel rapide de l'arborescence du projet pour t'y retrouver :

```text
src/
 ├── assets/          # Images, icônes, SVG
 ├── components/      # Boutons, Cartes, et petits morceaux d'interface (UI)
 ├── pages/           # Les pages entières de l'app (Accueil, ArticleVue, etc)
 ├── services/        # Toute la logique API (Les requêtes vers Wikipédia)
 ├── App.jsx          # Le composant racine
 ├── main.jsx         # Le point d'entrée de React
 └── index.css        # Le fichier CSS Global (Variables, Reset)
```

**Bon code et amuse-toi bien !** 🚀
