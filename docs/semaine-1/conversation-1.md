User: /sandbox policy

Copilot: Opened the sandbox policy in the editor.

User: /init

Copilot: Read skill `agent-customization`
Completed with input: {"skill":"agent-customization"}

Requested chat rename
Completed with input: {
  "title": "Create Copilot instructions",
  "automatic": true
}

Find files matching `*`

Find files matching `.github/**`

Find files matching `**/{README.md,CONTRIBUTING.md,CLAUDE.md,AGENTS.md,.cursorrules,.windsurfrules...`

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\AppData\\Roaming\\Code\\agentPlugins\\vscode-synced-customization-agent-host-copilotcli-34572567\\165997831\\skills\\agent-customization\\references\\agent-instructions.md"
}

I’m narrowing the repository scan to first-party files and project metadata so the instructions reflect actual workflows rather than generated dependencies.

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\README.md"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\package.json"
}

Find files matching `backend/src/**`

Find files matching `frontend/src/**`

Find files matching `**/*.{json,ts,tsx,sql,md,yml,yaml}`

Search for `(npm run|vitest|vite|tsx|oxlint|test|lint|build|dev|start)`

Read , lines 1 to 180
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\README.md",
  "view_range": [
    1,
    180
  ]
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\architecture.md"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\seed.md"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\package.json"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\package.json"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\API.md"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\.github\\pull_request_template.md"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\.vscode\\settings.json"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\vite.config.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\vitest.config.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\tsconfig.json"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\tsconfig.app.json"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\app.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\App.tsx"
}

Read , lines 1 to 100
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\tests\\offers.test.ts",
  "view_range": [
    1,
    100
  ]
}

Ran terminal command: git status --short

The repository already documents a clear split between an Express/SQLite API and a React/Vite client, with strong cross-layer patterns around authentication, migrations, DTO mapping, and tests. I’m encoding those project-specific rules and the documented command matrix now.

Edit 

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\.github\\copilot-instructions.md"
}

Ran terminal command: git diff --check; git status --short

Ask User
Completed with input: {
  "message": "The project has a browser-based React frontend and currently uses jsdom/Testing Library for UI tests. Would you like to configure a Playwright MCP server for browser-based validation in future Copilot sessions?",
  "requestedSchema": {
    "properties": {
      "configure_playwright": {
        "type": "boolean",
        "title": "Configure Playwright MCP",
        "description": "Choose yes if you want browser automation available to Copilot for this repository.",
        "default": false
      }
    }
  }
}

Created `.github/copilot-instructions.md` with:

- Documented build, lint, type-check, database, and test commands
- Examples for running individual backend and frontend tests
- Backend/frontend architecture and request flows
- Authentication, authorization, migration, API, and testing conventions
- References to the repository’s existing architecture and API documentation

Validation completed with `git diff --check`. No runtime tests were needed because this was a documentation-only change.

No MCP server configuration was added. Would you like to adjust the instructions or add coverage for any repository areas I may have missed?

User: Explique l’architecture du projet, puis génère dans ./docs un fichier html qui retrace le parcours qui permet d’afficher les offres, du composant React jusqu’à la base de données. Indique les fichiers qui seraient concernés par l’ajout d’un filtre par période. **Ne modifie aucun fichier.**

Copilot: Je vais retracer le flux réel des offres à travers le frontend, l’API, les services, les repositories et SQLite, puis créer uniquement un nouveau fichier HTML dans `docs/` sans toucher aux fichiers existants.

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\pages\\OffersPage.tsx"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\hooks\\useOffers.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\services\\offers.service.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\components\\OfferTable.tsx"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\controllers\\offers.controller.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\services\\offers.service.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\repositories\\offers.repository.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\models\\offer.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\mappers\\offer.mapper.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\middlewares\\authenticate.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\utils\\api.ts"
}

Read , lines 1 to 180
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\db\\migrations\\001_initial.sql",
  "view_range": [
    1,
    180
  ]
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\models\\offer.ts"
}

Read , lines 1 to 160
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\utils\\guards.ts",
  "view_range": [
    1,
    160
  ]
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\App.tsx"
}

Le flux est confirmé : `App.tsx` autorise la route, `OffersPage` déclenche `useOffers`, le service frontend appelle `/api/offers`, puis Express applique l’authentification et les droits avant la chaîne service → repository → SQLite. Le filtre par période toucherait cette chaîne ainsi que les contrats et tests associés ; je documente ces points dans le nouveau HTML.

Edit 

Ran terminal command: git diff --check; git status --short; git diff --stat -- .github/copilot-instructions.md docs/parcours-affichage-offres.html

Read , lines 1 to 80
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\parcours-affichage-offres.html",
  "view_range": [
    1,
    80
  ]
}

## Architecture du projet

Le projet est un monorepo npm composé de deux applications :

- **Frontend** : React + TypeScript + Vite dans `frontend/`
- **Backend** : Express + TypeScript + SQLite dans `backend/`

Le parcours d’affichage des offres suit cette chaîne :

```text
App.tsx
  → OffersPage.tsx
  → useOffers.ts
  → offers.service.ts
  → GET /api/offers
  → proxy Vite
  → routeur Express
  → authentification / autorisation
  → offers.service.ts
  → offers.repository.ts
  → SQLite
  → mapper DTO
  → OfferTable.tsx
```

### Frontend

`App.tsx` vérifie la session et affiche la page des offres si l’utilisateur possède les droits nécessaires.

`OffersPage.tsx` utilise `useOffers.ts` pour gérer :

- le chargement ;
- les erreurs ;
- l’annulation de la requête ;
- la déconnexion en cas de réponse HTTP 401.

Le service `offers.service.ts` appelle `/api/offers`, transmet le jeton dans l’en-tête `Authorization`, puis valide la réponse avec les type guards existants.

Enfin, `OfferTable.tsx` affiche les offres et convertit les codes de période et de statut en libellés français.

### Backend

Le proxy Vite transmet `/api/offers` vers le backend sous `/offers`.

Le routeur défini dans `offers.controller.ts` :

1. vérifie l’authentification ;
2. applique `canListOffers` ;
3. appelle le service métier ;
4. convertit les résultats en DTO avec `toOfferDto`.

Le service `offers.service.ts` applique les règles de visibilité :

- administrateur : toutes les offres ;
- étudiant : uniquement les offres publiées ;
- déposant : uniquement ses propres offres ;
- contact sans rôle de déposant : réponse 403.

Le repository `offers.repository.ts` exécute la requête SQL. Elle joint notamment :

- `offers` ;
- `companies` ;
- `academic_years` ;
- `periods`.

La relation entre l’offre, son année académique et sa période est garantie par le schéma SQLite dans `001_initial.sql`.

## Fichier HTML créé

Le parcours détaillé, avec diagramme, explication par couche et tableau des fichiers concernés par un filtre par période, se trouve dans :

`docs/parcours-affichage-offres.html`

Pour ajouter un filtre par période, les principaux fichiers concernés seraient :

- `frontend/src/pages/OffersPage.tsx`
- `frontend/src/hooks/useOffers.ts`
- `frontend/src/services/offers.service.ts`
- `frontend/src/models/offer.ts`
- `frontend/src/utils/guards.ts`
- `backend/src/controllers/offers.controller.ts`
- `backend/src/services/offers.service.ts`
- `backend/src/repositories/offers.repository.ts`
- `backend/API.md`
- `backend/http/offers.http`
- `backend/tests/offers.test.ts`
- `frontend/tests/OffersPage.test.tsx`

Aucun fichier existant n’a été modifié ; seul le nouveau fichier HTML a été ajouté. Les tests n’ont pas été exécutés, car il s’agit d’une documentation statique.

User: Quels sont les tests déjà présents dans le projet ?

Copilot: Find files matching `backend/tests/**`

Find files matching `frontend/tests/**`

Search for `\b(describe|it|test)\(`

Search for `\b(describe|it|test)\(`

Le projet contient **16 fichiers de tests** : 9 côté backend et 7 côté frontend. Les tests utilisent **Vitest**.

## Backend

Les tests backend utilisent Supertest et une base SQLite en mémoire via les helpers de `backend/tests/helpers/`.

### Authentification

`backend/tests/auth.test.ts`

Couvre :

- la liste des utilisateurs disponibles en mode démo ;
- la connexion via `POST /auth/demo-login` ;
- la génération du jeton ;
- l’absence de droits dans le contenu du jeton ;
- la récupération de l’utilisateur via `GET /auth/me` ;
- les requêtes sans jeton ;
- les jetons modifiés ou falsifiés ;
- les comptes désactivés ;
- la relecture des rôles en base à chaque requête ;
- le rejet des rôles transmis par le client ;
- la désactivation des routes de démo ;
- l’interdiction du mode démo en production.

### Offres

`backend/tests/offers.test.ts`

Couvre :

- le refus d’une requête sans session ;
- l’interdiction d’accès pour les contacts sans rôle de déposant ;
- la visibilité complète pour un administrateur ;
- la visibilité des seules offres publiées pour un étudiant ;
- la visibilité des offres déposées par un contact ;
- l’exclusion des offres déposées par un collègue ;
- le cas d’un contact rattaché à plusieurs entreprises ;
- la limitation des champs exposés dans le DTO.

### Entreprises

`backend/tests/companies.test.ts`

Couvre :

- l’authentification nécessaire ;
- la visibilité complète pour un administrateur ;
- la recherche par nom complet ou nom court ;
- la recherche insensible à la casse ;
- la combinaison entre recherche et droits d’accès ;
- l’échappement des caractères spéciaux SQL `LIKE` ;
- l’ignorance d’une recherche vide ;
- le rejet d’une recherche trop longue ;
- le rejet d’un paramètre `q` répété ;
- la forme du DTO retourné.

### Santé et erreurs HTTP

`backend/tests/health.test.ts`

Couvre :

- la réponse de `GET /health` ;
- le format JSON commun d’une erreur 404.

### Permissions

`backend/tests/permissions.test.ts`

Couvre :

- la reconnaissance d’un administrateur ;
- l’application correcte des rôles uniquement aux contacts.

### Base de données : migrations

`backend/tests/db/migrations.test.ts`

Couvre :

- la création des tables sur une base vierge ;
- le caractère idempotent des migrations ;
- l’activation des clés étrangères SQLite.

### Base de données : contraintes

`backend/tests/db/constraints.test.ts`

Couvre notamment :

- les offres valides ;
- les entreprises, déposants et promoteurs inexistants ou mal rattachés ;
- les offres sans promoteur ou sans déposant ;
- la cohérence entre période et année académique ;
- les statuts et titres invalides ;
- les e-mails en doublon ;
- les rattachements et rôles en doublon ;
- les statuts « À vérifier » ;
- les années académiques courantes ;
- les stages valides ou invalides ;
- les stages en doublon ;
- les dates de stage incohérentes.

### Base de données : données de démonstration

`backend/tests/db/seed.test.ts`

Couvre :

- les volumes attendus du jeu de données ;
- l’idempotence du seed ;
- l’intégrité référentielle ;
- l’année académique courante ;
- les entreprises parentes, filiales et archivées ;
- les contacts multi-entreprises et multi-rôles ;
- les contacts sans rôle ;
- les entreprises et contacts « À vérifier » ;
- les différents statuts d’offres ;
- les statuts de candidatures ;
- les stages issus d’offres ;
- la cohérence des rôles ;
- la cohérence des entreprises et contacts ;
- la cohérence entre offre attribuée, candidature retenue et stage ;
- les dates de stage dans leur période.

### Version de Node.js

`backend/tests/nodeVersion.test.ts`

Vérifie que la version de Node.js utilisée est compatible avec la version minimale requise par le projet.

## Frontend

Les tests frontend utilisent Vitest, jsdom, React Testing Library et le mock de `fetch` défini dans `frontend/tests/helpers/fetchMock.ts`.

### Application et session

`frontend/tests/App.test.tsx`

Couvre :

- l’affichage de la connexion sans session ;
- l’ouverture et la conservation d’une session ;
- la reprise d’une session enregistrée ;
- l’effacement d’une session refusée par le backend ;
- le retour à la connexion lors d’un changement de profil.

### Page de connexion

`frontend/tests/LoginPage.test.tsx`

Couvre :

- le regroupement des utilisateurs de démonstration par profil ;
- la connexion avec l’utilisateur sélectionné ;
- l’affichage d’une erreur de connexion.

### Page d’accueil

`frontend/tests/HomePage.test.tsx`

Couvre :

- l’affichage de l’utilisateur, de son profil et de ses entreprises ;
- l’affichage d’une erreur renvoyée par l’API.

### Page des offres

`frontend/tests/OffersPage.test.tsx`

Couvre :

- l’affichage des offres avec les libellés français ;
- l’adaptation de la description selon le profil ;
- l’affichage d’un refus d’accès du backend ;
- la gestion d’une session expirée.

### Barre de navigation

`frontend/tests/NavBar.test.tsx`

Couvre le masquage du lien vers les offres pour un contact qui n’a pas le rôle de déposant.

### Page des entreprises

[`frontend/tests/CompaniesPage.test.tsx`](<C:/Users/Rayan/Downloads/HE Vinci/BLOC 3/4 - IA 4devs/6 - Projet/WORKSPACE/BINV32202-groupe-14/frontend/tests/CompaniesPage.test.tsx>`)

Couvre :

- l’affichage des entreprises et de leur nombre ;
- la transmission du jeton ;
- l’état vide ;
- l’affichage des erreurs API ;
- la gestion d’une session expirée ;
- la transmission de la recherche à l’API.

### Type guards

`frontend/tests/guards.test.ts`

Teste la validation des réponses pour :

- l’état de santé ;
- les entreprises ;
- les listes d’entreprises ;
- les utilisateurs ;
- les sessions ;
- les offres ;
- les listes d’offres.

## Commandes utiles

Depuis la racine du projet :

```bash
npm test
```

Tests backend uniquement :

```bash
npm run test -w backend
```

Tests frontend uniquement :

```bash
npm run test -w frontend
```

Un fichier précis :

```bash
npm run test -w backend -- tests/offers.test.ts
npm run test -w frontend -- tests/OffersPage.test.tsx
```

Un test précis avec un filtre Vitest :

```bash
npm run test -w backend -- tests/offers.test.ts -t "visibilité"
```

Le fichier HTML précédemment créé, `docs/parcours-affichage-offres.html`, n’a pas été modifié.

User: Ajoutez un filtre à la page des offres avec les choix suivants :
• Toutes les périodes ;
• P1 ;
• P2 ;
• Autre.
Le filtre doit être transmis à l’API, par exemple avec GET /offers?period=P1.
Contraintes :
• le filtre est facultatif ;
• sans filtre, toutes les offres normalement visibles restent affichées ;
• les règles de visibilité liées au profil de l’utilisateur ne changent pas ;
• aucune nouvelle dépendance et aucune migration de base de données ne sont nécessaires ;
• ajoutez ou adaptez les tests utiles côté backend et côté frontend.

Copilot: Je vais étendre le filtre existant de bout en bout sans modifier le schéma : contrôle React, query string côté client, validation API, règle métier combinée à la visibilité, SQL paramétré et tests ciblés.

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\tests\\OffersPage.test.tsx"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\tests\\offers.test.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\models\\offer.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\utils\\labels.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\tests\\helpers\\fetchMock.ts"
}

Read , lines 70 to 145
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\API.md",
  "view_range": [
    70,
    145
  ]
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\controllers\\companies.controller.ts"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\components\\SearchField.tsx"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\src\\pages\\CompaniesPage.tsx"
}

Search for `PeriodCode|PERIOD_CODES|period`

Edit , , , , , , 

Edit , , , 

La fonctionnalité est maintenant câblée sur les deux côtés et les tests couvrent l’absence de filtre, les trois valeurs, la combinaison avec les droits, les paramètres invalides et l’envoi HTTP depuis React. Je lance les suites ciblées puis le contrôle de types/lint pour corriger les éventuels écarts de style ou de typage.

Ran terminal command: npm run test -w backend -- tests/offers.test.ts
Tool execution failed with exit code 1

Ran terminal command: npm run test -w frontend -- tests/OffersPage.test.tsx
Tool execution failed with exit code 1

Ran terminal command: npm run typecheck
Tool execution failed with exit code 1

Ran terminal command: npm run lint
Tool execution failed with exit code 1

Ran terminal command: npm.cmd run test -w backend -- tests/offers.test.ts

Ran terminal command: npm.cmd run test -w frontend -- tests/OffersPage.test.tsx
Tool execution failed with exit code 1

Ran terminal command: npm.cmd run typecheck

Ran terminal command: npm.cmd run lint

Le backend, le typage et le lint passent. Un test frontend existant devient ambigu parce que « Autre » apparaît désormais à la fois dans la liste déroulante et dans le tableau ; je l’adapte pour vérifier explicitement les deux occurrences, puis je relance la suite frontend.

Edit 

Ran terminal command: npm.cmd run test -w frontend -- tests/OffersPage.test.tsx

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\http\\offers.http"
}

Ran terminal command: git diff --check; git status --short

Edit 

Le test frontend ciblé passe désormais, et j’ai aussi ajouté un exemple REST pour `period=P1` dans la documentation d’API interactive. Je lance le contrôle global du projet pour vérifier qu’aucune régression n’a été introduite ailleurs.

Ran terminal command: npm.cmd run check

Le filtre par période a été ajouté de bout en bout.

### Fonctionnement

- La page des offres propose :
  - Toutes les périodes
  - P1
  - P2
  - Autre
- Sans filtre, la requête reste `GET /offers`.
- Avec un filtre, le frontend envoie par exemple `GET /api/offers?period=P1`.
- Le proxy Vite transmet ensuite la requête au backend sous `GET /offers?period=P1`.
- Le backend valide les valeurs autorisées : `P1`, `P2`, `OTHER`.
- Une valeur inconnue ou un paramètre répété retourne `400 INVALID_QUERY`.
- Les règles de visibilité restent inchangées :
  - administrateur : toutes les offres de la période ;
  - étudiant : offres publiées de la période ;
  - déposant : ses offres de la période ;
  - autres contacts : 403.

### Fichiers modifiés

- `frontend/src/pages/OffersPage.tsx`
- `frontend/src/hooks/useOffers.ts`
- `frontend/src/services/offers.service.ts`
- `frontend/tests/OffersPage.test.tsx`
- `backend/src/controllers/offers.controller.ts`
- `backend/src/services/offers.service.ts`
- `backend/src/repositories/offers.repository.ts`
- `backend/src/models/offer.ts`
- `backend/tests/offers.test.ts`
- `backend/API.md`
- `backend/http/offers.http`

Aucune dépendance ni migration de base de données n’a été ajoutée.

### Validation

La commande globale passe intégralement :

```text
npm run check
```

Résultats :

- lint : réussi ;
- typecheck backend/frontend : réussi ;
- backend : 9 fichiers de tests, 114 tests réussis ;
- frontend : 7 fichiers de tests, 47 tests réussis ;
- build backend/frontend : réussi.