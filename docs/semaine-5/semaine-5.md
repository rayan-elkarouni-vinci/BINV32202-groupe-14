# Bilan semaine 5 - MCP et tests end-to-end avec Playwright

> Les scénarios, l'exploration MCP et les tests Playwright ont été produits avec Copilot, puis relus, exécutés et vérifiés par nous (voir les « Corrections apportées aux scénarios proposés par Copilot »).
> Copilot n'a lancé aucun test Playwright : sa sandbox bloque le navigateur. Toutes les exécutions de tests ont été faites par nous.

## Scénarios

Fichier : [`e2e/recherche-offres/scenarios.md`](../../e2e/recherche-offres/scenarios.md)

Règles d'EF-30 appliquées : recherche dans le titre uniquement, insensible à la casse, espaces en début et fin ignorés, visibilité des offres selon le rôle. Les données viennent de la base de démonstration (seed versionné).

| # | Scénario | Type | Justification du choix |
|---|---|---|---|
| 1 | Lucas Dupont (étudiant) recherche « application » | Nominal | Usage le plus courant d'EF-30. Le mot apparaît dans une offre publiée (« Application React de gestion de flotte ») **et** dans une offre attribuée (« Migration d'une application vers le cloud ») : le scénario vérifie aussi que la recherche ne contourne pas la règle de visibilité (un étudiant ne voit que les offres publiées). |
| 2 | Lucas Dupont recherche « zzz-inexistant » | Limite | Recherche valide sans correspondance : aucune offre affichée et un message explicite. On vérifie d'abord que des offres sont affichées avant la saisie, pour ne pas confondre « aucun résultat » avec « page qui ne charge rien ». |

### Corrections apportées aux scénarios proposés par Copilot

- **Scénario 1 trop chargé** : Copilot saisissait `  APPLICATION  ` et vérifiait quatre règles à la fois (sous-chaîne, casse, espaces, visibilité). Ce n'était plus une « situation courante », et un échec n'aurait pas indiqué quelle règle était en cause. Saisie simplifiée en `application`. La casse et les espaces ne sont donc pas vérifiés par les tests E2E : ce choix garde un cas nominal simple.
- **Résultat non garanti** : « une seule offre affichée » ne découlait pas de l'état initial. Nous avons fait vérifier dans le seed puis ajouté qu'aucune autre offre visible par Lucas ne contient « application » et que Lucas n'a pas de candidature sur l'offre attribuée.
- **Condition vague (scénario 2)** : « les offres publiées sont accessibles » a été remplacé par une condition observable : au moins une offre affichée avant la saisie.
- **Actions incomplètes** : ajout de l'étape de connexion (page Connexion de démonstration) et du mode de déclenchement de la recherche (pendant la saisie, sans Entrée).

## Exploration avec Playwright MCP

- **Serveur MCP local** : `npx -y @playwright/mcp@latest --isolated --port 8931`, lancé par nous dans un terminal, donc hors de la sandbox de Copilot.
- **Client** : Copilot en mode Agent, configuré par `.mcp.json` à la racine (`type: http`, `url: http://localhost:8931/mcp`). Connexion vérifiée avec « MCP: List Servers » : `playwright` est à l'état *Running*.
- **Application** : backend et frontend lancés par Copilot (`npm run dev -w backend`, `npm run dev -w frontend`), puis vérifiés : frontend `200` sur le port 5173, `/health` `200`, `/api/auth/demo-users` `200` (28 utilisateurs).

**Scénario exécuté : scénario 1. Résultat : conforme, aucun écart avec le scénario.**

| # | Outil MCP | Action | Ce que l'outil a renvoyé à l'agent |
|---|---|---|---|
| 1 | **`browser_navigate`** | Ouverture de `http://localhost:5173/` | L'URL, le titre de la page (« Gesta ») et un snapshot de la page Connexion de démonstration avec la liste des utilisateurs |
| 2 | `browser_click` | Clic sur Lucas Dupont (colonne Étudiants) | Nouvel état de la page : « Lucas Dupont — Étudiant » (connexion confirmée par le snapshot suivant) |
| 3 | `browser_click` | Clic sur le lien Offres | Page Offres de stage |
| 4 | `browser_snapshot` | Lecture avant la recherche | Plusieurs offres publiées, dont « Application React de gestion de flotte » dans « Offres déjà candidatées » |
| 5 | **`browser_type`** | Saisie de « application » dans « Recherche par titre » (`"submit": false`) | Le code Playwright équivalent (`fill('application')`) et l'état de la page |
| 6 | `browser_snapshot` | Lecture après la recherche | Champ = « application » ; une seule offre affichée (« Application React de gestion de flotte », statut En cours) ; « Migration d'une application vers le cloud » absente |

Les paramètres exacts de chaque appel figurent dans la [conversation](conversation-5.md) (section 2).

**Vérification par nous** : nous avons refait le scénario 1 à la main dans le navigateur (http://localhost:5173) : connexion avec Lucas Dupont, page Offres, saisie de « application ». Une seule offre est affichée (« Application React de gestion de flotte », dans « Offres déjà candidatées ») et « Migration d'une application vers le cloud » est absente. Le résultat correspond au compte rendu de Copilot et au scénario.

**Problème rencontré** : au premier essai, la page de connexion de démo affichait « Chargement des utilisateurs de démo impossible (statut 502) ». Le frontend ne joignait pas le backend, qui n'était pas lancé après la mise à jour de la branche. Le problème a été résolu en démarrant le backend. Aucune modification du code n'a été nécessaire.

## Tests automatisés avec Playwright Test

Installation par nous : `npm init playwright@latest` (TypeScript, dossier `e2e`, pas de workflow GitHub Actions, navigateurs installés).

| Fichier | Rôle |
|---|---|
| `playwright.config.ts` (racine) | `testDir: './e2e'`, projet Chromium uniquement, `baseURL`, `webServer` : backend sur le port 3001 avec une base dédiée `backend/data/gesta-e2e.db` réinitialisée à partir du seed avant chaque exécution, frontend sur le port 5174, `reuseExistingServer: false` |
| `e2e/recherche-offres/recherche-offres.spec.ts` | Un test par scénario, avec le numéro dans le nom (« Scénario 1 — … », « Scénario 2 — … ») |
| `package.json`, `package-lock.json` | Ajout de `@playwright/test` et `@types/node` |
| `.gitignore` | Dossiers générés par Playwright (`test-results/`, `playwright-report/`, …) et `.playwright-mcp/` (traces du serveur MCP). La base E2E n'apparaît pas dans `git status` : elle est déjà ignorée. |

Le test d'exemple `e2e/example.spec.ts` créé par l'installation a été supprimé.

**Données maîtrisées** : les offres et les candidatures viennent du seed versionné. Copilot a constaté que `npm run db:init` ne réensemence pas une base déjà remplie et que `npm run db:reset` effacerait notre base de développement. Il a donc proposé une base SQLite E2E séparée, recréée à partir du seed à chaque exécution : nous avons donné notre accord. Les tests ne modifient aucune donnée et ne dépendent pas de leur ordre d'exécution.

| Scénario | Actions | Assertions principales |
|---|---|---|
| 1 | Connexion de Lucas → page Offres → saisie de `application` dans `getByRole('searchbox', { name: 'Recherche par titre' })` | Au moins une offre avant la recherche ; `getByRole('table')` → `toHaveCount(1)` ; lignes → `toHaveCount(2)` (en-tête + 1 offre) ; titre « Application React de gestion de flotte » dans « Offres déjà candidatées » ; « Migration d'une application vers le cloud » absente |
| 2 | Même connexion → saisie de `zzz-inexistant` | Au moins une offre avant la recherche ; `getByRole('table')` → `toHaveCount(0)` ; `getByRole('cell')` → `toHaveCount(0)` ; `getByText('Aucune offre ne correspond à votre recherche.', { exact: true })` visible |

Les sélecteurs reposent sur les rôles et les noms accessibles, pas sur des classes CSS.

## Vérification : le test détecte-t-il un défaut ?

Contrairement à la semaine 3, le défaut a cette fois été **réellement provoqué** et l'échec **observé**.

- **Défaut temporaire** : dans `backend/src/services/offers.service.ts` (ligne 17), `const searchFilter = search === undefined ? {} : { search };` a été remplacé par `const searchFilter = {};`. Le terme recherché est ignoré, mais le filtre de visibilité (`status: "PUBLISHED"` pour un étudiant) reste actif.
- **Échec constaté** : `2 failed`.
  - Scénario 1 : `expect(getByRole('table')).toHaveCount(1)` (ligne 24) : 2 tables reçues. Toutes les offres publiées s'affichent, dans « Offres disponibles » et dans « Offres déjà candidatées ».
  - Scénario 2 : `expect(getByRole('table')).toHaveCount(0)` (ligne 43) : 2 tables reçues.
  - La connexion, la navigation et la saisie ont fonctionné : les échecs viennent des assertions, pas de la configuration ni de la connexion.
- **Restauration** : `git restore -- '*offers.service.ts'`, puis nouvelle exécution : **2 passed** (4,0 s). `git grep "DÉFAUT TEMPORAIRE"` ne renvoie rien : le défaut n'a pas été commité.

## Commandes lancées et résultats

| Commande | Lancée par | Résultat |
|---|---|---|
| `npx -y @playwright/mcp@latest --isolated --port 8931` | Nous | Serveur à l'écoute sur `http://localhost:8931` |
| `npm run dev -w backend` / `npm run dev -w frontend` | Copilot (`npm.cmd`) | Backend sur 3000, frontend sur 5173, utilisateurs de démo chargés (200) |
| `npm init playwright@latest` | Nous | Playwright Test installé, `playwright.config.ts` créé |
| `npx playwright test` (1re exécution) | Nous | **2 passed** (4,1 s) |
| `npx playwright test` (2e exécution) | Nous | **2 passed** (4,0 s) |
| `npx playwright test --headed` | Nous | **2 passed** (4,5 s) |
| `npm run check` → lint (Oxlint `--deny-warnings`) | Nous | OK : 0 avertissement, 0 erreur |
| `npm run check` → typecheck | Nous | OK, aucune erreur |
| `npm run check` → tests (Vitest) | Nous | Backend : **143 tests réussis** (10 fichiers). Frontend : **57 tests réussis** (9 fichiers) |
| `npm run check` → build | Nous | OK (frontend : 60 modules) |
| `npx playwright test` avec le défaut | Nous | **2 failed** (assertions des lignes 24 et 43) |
| `npx playwright test` après restauration | Nous | **2 passed** (4,0 s) |

`npm run check` ne lance pas les tests E2E (son script `test` ne lance que Vitest dans les workspaces). Ils restent lancés explicitement avec `npx playwright test`.

## Comparaison MCP / Playwright Test

1. **Que permet Playwright MCP dans la conversation avec l'agent ?** Il donne à l'agent des outils pour piloter un vrai navigateur pendant la conversation (naviguer, cliquer, saisir du texte, lire l'état de la page). L'agent décide de l'étape suivante à partir de ce qu'il observe. Action précise vue passer par un outil MCP : `browser_type`, qui a saisi « application » dans le champ « Recherche par titre » (code renvoyé : `fill('application')`).
2. **Ce qu'apportent les scripts Playwright Test :** ils sont versionnés dans le dépôt et se relancent à l'identique sans agent, donc sans interprétation probabiliste. Leurs assertions explicites échouent clairement en cas de défaut, comme le montre notre vérification. Ils sont rapides (environ 4 s), utilisent des données maîtrisées et peuvent tourner dans une CI pour détecter les régressions. Le compte rendu MCP est un récit de l'agent qu'il faut vérifier soi-même. Il n'est pas reproductible à l'identique et consomme du contexte.
3. **Quand utiliser chaque approche ?** Nous préférerions une exploration avec MCP pour vérifier rapidement une fonctionnalité en cours de développement, investiguer un bug signalé, ou découvrir la structure d'une page avant d'écrire un test. Nous préférerions un test automatisé pour une fonctionnalité stable à protéger contre les régressions, pour les parcours critiques (connexion, recherche, candidature), et pour tout ce qui doit être relancé avant chaque PR. Les deux approches sont complémentaires : explorer d'abord, puis automatiser.

## Limites

- Les tests E2E ne sont ni dans `npm run check` ni dans une CI (le dépôt n'a pas de `.github/workflows/`). Ils ne tournent que si quelqu'un lance `npx playwright test`.
- Les tests ne tournent que sur Chromium.
- Ils reposent sur les données fixes du seed. Une modification du seed (titre ou statut d'une offre) les ferait échouer sans qu'il y ait de défaut dans l'application.
- Non vérifié : nous n'avons pas contrôlé que le frontend E2E (5174) envoie ses requêtes au backend E2E (3001) plutôt qu'au backend de développement (3000). Vérification possible : arrêter les serveurs de développement, puis relancer `npx playwright test`.
- `npm init playwright` a signalé une vulnérabilité de sévérité haute dans les dépendances. Elle n'a pas été traitée cette semaine (hors périmètre).

## Crédits d'IA

7% => 10% (3% utilisés cette semaine)

## Fichiers livrés

- `docs/semaine-5/semaine-5.md` : ce bilan
- `docs/semaine-5/conversation-5.md` : conversation complète avec Copilot (scénarios, exécution MCP, génération des tests, défaut temporaire), version allégée pour la lecture (voir son en-tête)
- `docs/semaine-5/conversation-5-brut.md` : export brut de la même conversation, sans retouche
- `e2e/recherche-offres/scenarios.md` : les deux scénarios
- `e2e/recherche-offres/recherche-offres.spec.ts` : les tests Playwright
- `playwright.config.ts` : la configuration Playwright Test
