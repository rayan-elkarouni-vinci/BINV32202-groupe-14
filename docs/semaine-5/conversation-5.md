# Conversation Copilot — semaine 5 (MCP et tests end-to-end avec Playwright)

> Export « Copy All » de la conversation avec GitHub Copilot (VS Code, mode Agent), allégé pour la lecture :
> - deux messages envoyés deux fois ont été regroupés (c'est indiqué à l'endroit concerné) ;
> - les entrées JSON des outils de lecture et de recherche sont résumées sur une ligne (fichier et lignes lues) ; les appels Playwright MCP sont conservés en entier ;
> - les longues commandes PowerShell sont résumées et marquées *[abrégé]* ;
> - le tableau de l'énoncé, déformé par le copier-coller depuis le PDF, a été remis en forme ;
> - les liens absolus vers des fichiers locaux sont remplacés par des chemins relatifs.
>
> Aucun message ni aucune réponse n'a été reformulé.
> Les tests Playwright ont été exécutés par nous dans le terminal, pas par Copilot (voir le bilan).

---

## 1. Préparer deux scénarios de tests end-to-end

User: 1. Préparer deux scénarios de tests end-to-end
En semaine 9, vous avez développé la recherche d’offres par titre (EF-30), examiné des tests
en privilégiant l’API et essayé la recherche dans le navigateur. Les séances précédentes ne
demandaient pas de tests end-to-end automatisés. Vous allez maintenant en créer : ces tests
end-to-end (E2E) passent par l’interface et vérifient le fonctionnement de l’application dans
son ensemble.
Relisez les règles de recherche de la semaine 9 et retrouvez les cas essayés dans votre bilan
docs/semaine-4.md, ainsi que les tests préparés à cette occasion. Choisissez deux cas qui
peuvent être vérifiés depuis l’interface; précisez-les ou complétez-les si nécessaire :
— Un cas nominal : le comportement attendu dans une situation courante.
— Un cas limite ou particulier : par exemple une recherche sans résultat.
Pour chacun, précisez l’état initial (y compris les données nécessaires), les actions à effectuer
dans l’interface et le résultat observable attendu. Ne vous contentez pas de « la fonctionnalité
marche ».
Numérotez-les scénario 1 et scénario 2. Par exemple :

| Numéro | Scénario | Actions dans l’interface | Résultat attendu |
|---|---|---|---|
| 1 | Recherche avec résultat | Saisir un mot présent dans le titre d’une offre publiée | Seules les offres correspondantes et visibles sont affichées |
| 2 | Recherche sans résultat | Saisir un texte qui ne correspond à aucune offre | Aucune offre correspondante n’est affichée |

Créez le répertoire e2e/recherche-offres/ à la racine du projet et décrivez les deux scénarios
numérotés dans e2e/recherche-offres/scenarios.md. L’exemple ci-dessus ne précise pas
tout l’état initial : indiquez notamment le rôle utilisé, les offres nécessaires et leur visibilité.
Adaptez les résultats aux règles de la semaine 9 et à vos choix documentés. Définissez-les avant
de demander à Copilot d’exécuter ou de générer les tests.
Ce répertoire regroupera les scénarios et les tests automatisés de cette fonctionnalité. Pour
d’autres fonctionnalités, vous pourrez créer d’autres sous-répertoires dans e2e/.

*(Message envoyé deux fois : la première exécution s'est arrêtée après l'échec d'une commande terminal. Les appels des deux exécutions sont regroupés ci-dessous.)*

Copilot: Read `docs/semaine-4/semaine-4.md`

Find files matching `docs/**/*semaine*9*`

Search for `EF-30|recherche.*offre|recherche.*titre|sans résultat|aucun résultat`

Read `frontend/tests/OffersPage.test.tsx`

Read `docs/semaine-4/conversation-4b-tdd.md`, lines 1 to 165

Read `backend/tests/offers.test.ts`, lines 150 to 260

Search for `"title"|title:|PUBLISHED|application|flotte|FLOTTE`

Search for `Recherche par titre|Aucune offre ne correspond|searchbox|Recherche par`

Read `backend/src/db/seed/offersData.ts`, lines 1 to 155

Read `docs/analyse/seed.md`

Search for `STUDENT|FLEET_APP|CLOUD_MIGRATION|LUCAS_DUPONT`

Ran terminal command: `git status --short; Get-ChildItem -Force e2e -ErrorAction SilentlyContinue`
Tool execution failed with exit code 1

*(Seconde exécution)*

Read `frontend/src/pages/OffersPage.tsx`, lines 1 to 160

Read `frontend/src/hooks/useOffers.ts`

Read `backend/src/db/seed/seedIds.ts`, lines 50 to 90

Search for `student\(|2400101|Lucas Dupont|Étudiant|240010`

Je vais formaliser les deux parcours à partir des règles consignées et des données de démonstration vérifiées : un résultat publié qui partage le terme avec une offre attribuée cachée, puis une recherche sans correspondance.

Edit `e2e/recherche-offres/scenarios.md`

Read `e2e/recherche-offres/scenarios.md`

Ran terminal command: `git status --short`

Les deux scénarios sont documentés dans `scenarios.md`. Le premier vérifie le résultat publié et le masquage d’une offre attribuée; le second vérifie le message affiché sans correspondance.

Aucun test automatisé n’a été lancé : le changement demandé est uniquement documentaire.

---

User: Corrige le fichier e2e/recherche-offres/scenarios.md. Ne modifie aucun autre fichier et ne génère pas encore de tests automatisés.

Avant d'écrire quoi que ce soit, vérifie dans les données de démo (seed) et dans le code du frontend :
- quelles offres publiées visibles par Lucas Dupont contiennent "application" dans leur titre (insensible à la casse) ;
- si Lucas Dupont a une candidature sur l'offre « Migration d'une application vers le cloud » ;
- le texte exact du message affiché quand une recherche ne donne aucun résultat ;
- comment la recherche se déclenche dans l'interface (pendant la saisie, avec Entrée ou avec un bouton) ;
- ce que signifie la notation « (P2) ».

Modifications à faire :

Scénario 1
1. Dans les actions, saisis simplement `application` (en minuscules, sans espaces autour) au lieu de `  APPLICATION  `. Garde la vérification de visibilité de l'offre attribuée.
2. Dans l'état initial, ajoute explicitement :
   - qu'aucune autre offre visible par Lucas ne contient « application » dans son titre (uniquement si c'est vrai dans les données de démo ; sinon, liste toutes les offres attendues dans le résultat) ;
   - que Lucas n'a pas de candidature sur « Migration d'une application vers le cloud » (uniquement si c'est vrai).
3. Adapte la phrase finale sous le tableau pour qu'elle ne parle plus de casse ni d'espaces pour ce scénario.

Scénario 2
4. Remplace « Les offres publiées de la base sont accessibles avant la recherche » par une condition observable : « Avant la saisie, la page Offres de stage affiche au moins une offre. »
5. Vérifie que le message « Aucune offre ne correspond à votre recherche. » est bien le texte exact affiché par le frontend ; sinon, remplace-le par le texte réel.

Pour les deux scénarios
6. Ajoute au début des actions l'étape de connexion : « Sur la page Connexion de démonstration, choisir Lucas Dupont dans la colonne Étudiants. »
7. Précise comment la recherche se déclenche (par exemple : « puis appuyer sur Entrée », ou « les résultats se mettent à jour pendant la saisie »).
8. Explique la notation « (P2) » ou retire-la si elle n'apporte rien.

Quand tu as terminé, donne-moi un court résumé de ce que tu as vérifié dans les données et le code (avec le nom des fichiers consultés) et de ce que tu as modifié.

Copilot: Je vérifie d’abord les données de seed et les composants concernés (connexion, champ de recherche et état vide); je ne modifierai le document qu’après ces vérifications.

Read `backend/src/db/seed/offersData.ts`, lines 1 to 120

Read `backend/src/db/seed/offersData.ts`, lines 150 to 205

Read `frontend/src/components/SearchField.tsx`

Read `frontend/src/pages/OffersPage.tsx`, lines 28 to 130

Search for `Lucas Dupont|Étudiants|Connexion de démonstration|Démo|Démonstration`

Read `docs/analyse/seed.md`, lines 10 to 45

Read `frontend/src/pages/LoginPage.tsx`

Read `frontend/src/hooks/useOffers.ts`

Search for `list.*offers|kind === "STUDENT"|status.*PUBLISHED|PUBLISHED`

Read `frontend/src/services/offers.service.ts`

Read `frontend/src/components/DemoUserGroup.tsx`

Edit `e2e/recherche-offres/scenarios.md`

Read `e2e/recherche-offres/scenarios.md`

Ran terminal command: `git status --short`

Mis à jour uniquement `e2e/recherche-offres/scenarios.md`. Aucun test automatisé n’a été généré.

Vérifications effectuées :
- Dans `backend/src/db/seed/offersData.ts`, la seule offre publiée dont le titre contient « application » est « Application React de gestion de flotte ». « Migration d'une application vers le cloud » est attribuée; Lucas n’a pas de candidature sur cette offre.
- `backend/src/services/offers.service.ts` confirme que les étudiants ne voient que les offres publiées.
- `frontend/src/pages/OffersPage.tsx` affiche exactement « Aucune offre ne correspond à votre recherche. ». La saisie déclenche la mise à jour des résultats sans appuyer sur Entrée, comme le montrent `frontend/src/components/SearchField.tsx` et `frontend/src/hooks/useOffers.ts`.
- `frontend/src/pages/LoginPage.tsx` et `frontend/src/components/DemoUserGroup.tsx` confirment les libellés de connexion. `docs/analyse/seed.md` précise que la deuxième période va de février à mai.

---

## 2. Tester un scénario avec Playwright MCP

User: Prépare l'environnement pour exécuter un scénario E2E avec Playwright MCP. Ne modifie pas le code de l'application.

Le serveur Playwright MCP tourne déjà dans un terminal sur http://localhost:8931 : ne touche pas à ce terminal, ne lance pas et n'arrête pas ce serveur.

1. Crée le fichier .mcp.json à la racine du projet (pas dans frontend/ ni dans .vscode/) avec exactement ce contenu :

```json
{
  "mcpServers": {
    "playwright": {
      "type": "http",
      "url": "http://localhost:8931/mcp",
      "tools": ["*"]
    }
  }
}
```

Si un fichier .mcp.json existe déjà, ajoute seulement l'entrée "playwright" dans "mcpServers" sans supprimer les autres serveurs.

2. Trouve les commandes habituelles pour lancer le backend et le frontend (dans le package.json racine, les package.json de backend/ et frontend/, et le README). Avant de lancer, vérifie que les dépendances sont installées et que le fichier .env du backend contient toutes les variables de .env.example ; s'il manque quelque chose, dis-le-moi au lieu de l'inventer.

3. Lance le backend et le frontend, chacun dans son propre terminal, en arrière-plan, pour qu'ils restent actifs.

4. Vérifie qu'ils fonctionnent : le backend démarre sans erreur, et l'appel qui charge les utilisateurs de la page de connexion de démonstration ne renvoie plus d'erreur 502.

5. Donne-moi : les commandes utilisées, l'URL du frontend, l'URL du backend, et le résultat de la vérification de l'étape 4. En cas d'erreur, montre-moi le message exact et sa cause probable, sans modifier le code.

Copilot: Je vais d’abord inspecter la configuration MCP existante, les scripts habituels et l’état des prérequis sans afficher les valeurs du `.env`; je ne toucherai pas au serveur Playwright déjà lancé.

Read `package.json`

Read `backend/package.json`

Read `frontend/package.json`

Read `README.md`, lines 1 to 200

Ran terminal command *[abrégé]* : présence de `.mcp.json`, des `node_modules`, de `backend/.env` et `backend/.env.example` ; comparaison des noms de variables ; versions de Node et npm ; `git status --short`
Tool execution failed with exit code 1

Read `backend/.env.example`

Edit `.mcp.json`

Ran terminal command *[abrégé]* : variables manquantes ou vides dans `backend/.env` (noms uniquement, **valeurs non affichées** ; seule la longueur de `JWT_SECRET` est affichée), versions de Node et npm, présence de `tsx`, `vite` et `concurrently`, ports 3000 et 5173 libres, `git status --short`

Les prérequis sont présents : Node/npm compatibles, exécutables des trois outils installés, variables d’environnement toutes définies et aucun service déjà à l’écoute sur 3000/5173. Je démarre maintenant les deux commandes de développement dans des terminaux séparés, sans toucher à Playwright.

Ran terminal command *[abrégé]* : démarrage de `npm.cmd run dev -w backend` dans un nouveau terminal (`Start-Process`)

Read `backend/http/health.http`

Ran terminal command *[abrégé]* : attente de `http://localhost:3000/health` (30 s maximum)

Ran terminal command *[abrégé]* : démarrage de `npm.cmd run dev -w frontend` dans un nouveau terminal (`Start-Process`)

Read `frontend/src/hooks/useDemoUsers.ts`

Search for `getDemoUsers|demo-users|/auth`

Read `frontend/vite.config.ts`

Ran terminal command *[abrégé]* : attente de `http://localhost:5173/` (30 s maximum)

Read `frontend/src/services/auth.service.ts`

Ran terminal command *[abrégé]* : appel de `http://localhost:5173/api/auth/demo-users` (code HTTP, nombre d'utilisateurs, présence de Lucas Dupont)

Ran terminal command *[abrégé]* : relecture de `.mcp.json` (URL, type, outils) et `git status --short`

Environnement prêt. Le serveur Playwright existant n’a pas été touché; aucun test E2E n’a été lancé.

- Configuration créée à la racine : `.mcp.json`, avec l’URL MCP demandée.
- Prérequis vérifiés : Node `v22.20.0`, npm `10.9.3`, dépendances et exécutables présents. Toutes les variables de `backend/.env.example` sont définies et non vides dans `backend/.env`.
- Commandes habituelles : le README indique `npm run dev` à la racine; les scripts des workspaces sont `npm run dev -w backend` et `npm run dev -w frontend`. Démarrés dans deux terminaux séparés avec leurs équivalents Windows `npm.cmd`.
- URLs : frontend http://localhost:5173, backend http://localhost:3000.
- Vérifications : frontend `200`; backend `/health` `200` avec `{"status":"ok"}`; chargement des utilisateurs via le proxy frontend `/api/auth/demo-users` `200`, 28 utilisateurs retournés dont Lucas Dupont — aucune erreur `502`.

---

User: Utilise les outils du serveur Playwright MCP pour exécuter le scénario 1 décrit dans e2e/recherche-offres/scenarios.md.

L'application tourne déjà en local : le frontend est accessible sur http://localhost:5173. Ne lance pas, n'arrête pas et ne redémarre pas le backend, le frontend ou le serveur MCP.

Déroulement attendu :
1. Lis d'abord le scénario 1 (état initial, actions, résultat attendu).
2. Ouvre l'application, connecte-toi via la page Connexion de démonstration avec l'utilisateur indiqué dans le scénario.
3. Ouvre la page Offres de stage et vérifie, avant la recherche, que des offres sont affichées.
4. Réalise exactement les actions du scénario dans l'interface.
5. Prends un snapshot de la page après la recherche et vérifie chaque point du résultat attendu.

Contraintes :
- Ne modifie pas le code de l'application ni les données, et ne génère pas de script de test.
- Si quelque chose ne correspond pas au scénario ou si une étape échoue, ne corrige rien et ne contourne pas le problème : arrête-toi et décris l'écart.

À la fin, donne-moi :
- la liste des actions réellement effectuées, dans l'ordre, avec le nom de l'outil Playwright utilisé pour chacune (browser_navigate, browser_click, browser_type, browser_snapshot, etc.) ;
- pour au moins deux de ces appels, les informations que l'outil t'a renvoyées ;
- un tableau comparant chaque point du résultat attendu avec ce que tu as observé (conforme / écart) ;
- les écarts éventuels avec le scénario et, s'il y en a, leur cause probable, sans rien modifier.

Copilot: Read `e2e/recherche-offres/scenarios.md`

Search Tools

Search Tools

Navigate to a URL
Completed with input: {
  "url": "http://localhost:5173"
}

Page snapshot
Completed with input: {
  "depth": 6
}

Page snapshot
Completed with input: {
  "depth": 10,
  "target": "main"
}

Click
Completed with input: {
  "target": "e30",
  "element": "Lucas Dupont dans la colonne Étudiants"
}

Page snapshot
Completed with input: {
  "depth": 9
}

Click
Completed with input: {
  "target": "e123",
  "element": "lien Offres dans la navigation principale"
}

Page snapshot
Completed with input: {
  "depth": 10
}

Type text
Completed with input: {
  "target": "e140",
  "element": "champ Recherche par titre",
  "text": "application",
  "submit": false
}

Page snapshot
Completed with input: {
  "depth": 10
}

Scénario 1 exécuté depuis `e2e/recherche-offres/scenarios.md`. Aucune donnée ni aucun fichier n’a été modifié.

### Actions effectuées, dans l’ordre

1. `browser_navigate` — ouverture de `http://localhost:5173/`.
2. `browser_snapshot` — lecture de l’écran **Connexion de démonstration** et de la liste des étudiants.
3. `browser_click` — sélection de **Lucas Dupont** dans **Étudiants**.
4. `browser_snapshot` — confirmation de la connexion : **Lucas Dupont — Étudiant**.
5. `browser_click` — ouverture du lien **Offres**.
6. `browser_snapshot` — vérification avant recherche : des offres sont visibles, dont **Application React de gestion de flotte** dans **Offres déjà candidatées**.
7. `browser_type` — saisie de `application` dans **Recherche par titre**, sans soumettre avec Entrée. L’appel Playwright correspondant a utilisé `fill('application')`.
8. `browser_snapshot` — capture et vérification de la page après la recherche.

### Résultat attendu comparé à l’observation

| Point vérifié | Observation | Résultat |
|---|---|---|
| Une seule offre correspondante est affichée : **Application React de gestion de flotte** | Elle est la seule offre affichée après recherche, dans **Offres déjà candidatées**. | Conforme |
| Elle apparaît dans **Offres déjà candidatées** | La page affiche ce titre sous cette section, avec le statut de candidature **En cours**. | Conforme |
| **Migration d'une application vers le cloud** n’est pas affichée | Ce titre est absent du snapshot après recherche. | Conforme |

Quelques informations retournées par les outils : `browser_navigate` a indiqué l’URL `http://localhost:5173/` et le titre de page `Gesta`; le snapshot avant recherche montrait plusieurs offres publiées, et celui après recherche affichait `application` dans le champ ainsi que le résultat attendu. Aucun écart au scénario constaté.

---

## 3. Générer des tests automatisés avec Playwright Test

User: Playwright Test est installé à la racine. N'utilise pas MCP. Ne lance ni navigateur ni tests : je les exécuterai moi-même.

1. Supprime les fichiers d'exemple créés par l'installation (par exemple e2e/example.spec.ts et le dossier tests-examples/ s'il existe). Ne touche pas à e2e/recherche-offres/scenarios.md.
2. Modifie playwright.config.ts sans le recréer :
   - vérifie que testDir vaut './e2e' ;
   - configure use.baseURL sur l'URL réelle du frontend : http://localhost:5173 ;
   - garde uniquement le projet chromium ;
   - configure webServer pour démarrer le backend et le frontend avec les commandes du projet (npm run dev -w backend et npm run dev -w frontend), en attendant http://localhost:3000/health et http://localhost:5173, avec reuseExistingServer: !process.env.CI.
3. Vérifie que .gitignore ignore les dossiers générés par Playwright (test-results/, playwright-report/, etc.).
4. Regarde les scripts de package.json et dis-moi si npm run check lance les tests E2E. Ne modifie pas ce script.

Résume ensuite tes modifications fichier par fichier.

*(Message envoyé deux fois ; au second envoi, Copilot a seulement relu et confirmé la configuration — voir la fin de cet échange.)*

Copilot: Read skill `test-driven-development`

Je vais inspecter la configuration Playwright existante, les fichiers d’exemple, `.gitignore` et les scripts. Je ne lancerai ni navigateur ni tests; je préserverai le scénario et limiterai les suppressions aux exemples explicitement demandés.

Read `playwright.config.ts`

Read `.gitignore`

Read `package.json`

Find files matching `**/*`

Ran terminal command: `git status --short; Get-ChildItem -Force; if (Test-Path 'e2e') { Get-ChildItem -Force 'e2e' }; if (Test-Path 'tests-examples') { Get-ChildItem -Force 'tests-examples' }`

La configuration existante a déjà `testDir: './e2e'`. `.gitignore` ignore les sorties Playwright demandées; `tests-examples/` n’existe pas et `e2e/example.spec.ts` est le seul fichier d’exemple trouvé. Je configure les deux serveurs et Chromium uniquement, puis supprime cet exemple sans toucher au scénario.

Edit `playwright.config.ts`, `e2e/example.spec.ts` (suppression)

Read `playwright.config.ts`

Read `.gitignore`

Read `package.json`

Ran terminal command *[abrégé]* : existence de `e2e/example.spec.ts`, de `tests-examples/` et de `e2e/recherche-offres/scenarios.md`, puis `git status --short`

- `playwright.config.ts` : conservé `testDir: './e2e'`, défini `baseURL` sur le frontend, gardé uniquement Chromium et configuré les web servers backend/frontend avec leurs URLs d’attente et `reuseExistingServer: !process.env.CI`.
- `e2e/example.spec.ts` : supprimé. `tests-examples/` n’existait pas.
- `e2e/recherche-offres/scenarios.md` : conservé sans modification.
- `.gitignore` : vérifié; les sorties Playwright (`test-results/`, `playwright-report/`, `blob-report/` et les dossiers Playwright associés) sont déjà ignorées. Je ne l’ai pas modifié.

`npm run check` **ne lance pas les tests E2E** : son script exécute lint, typecheck, les tests des workspaces, puis build; aucun script Playwright n’y figure. Je n’ai lancé ni navigateur ni test.

*(Second envoi du même message.)*

Copilot: Read `playwright.config.ts`

Read `.gitignore`

Read `package.json`

Ran terminal command *[abrégé]* : existence de `e2e/example.spec.ts`, de `tests-examples/` et de `e2e/recherche-offres/scenarios.md`, puis `git status --short`

Configuration vérifiée : `playwright.config.ts` cible `./e2e`, le frontend sur `http://localhost:5173`, Chromium uniquement et les deux serveurs avec les URLs d’attente demandées.

`e2e/example.spec.ts` et `tests-examples/` sont absents; `e2e/recherche-offres/scenarios.md` est toujours présent. `.gitignore` ignore déjà les sorties Playwright.

Le script `check` dans `package.json` n’inclut pas les tests E2E. Aucun navigateur ni test n’a été lancé.

---

User: À partir des scénarios 1 et 2 de e2e/recherche-offres/scenarios.md, génère des tests end-to-end avec Playwright Test et TypeScript dans e2e/recherche-offres/recherche-offres.spec.ts.
Indique le numéro du scénario dans le nom de chaque test.
N'utilise pas MCP : produis des fichiers de test classiques.

Exigences :
- Les tests passent par l'interface : connexion via la page Connexion de démonstration avec l'utilisateur du scénario, page Offres de stage, champ Recherche par titre.
- Une assertion explicite pour chaque résultat attendu : avant la recherche, au moins une offre est affichée ; scénario 1 : nombre exact d'offres affichées, titre et section de l'offre attendue, absence de l'offre attribuée ; scénario 2 : aucune carte d'offre et le message exact indiqué dans le scénario.
- Sélecteurs robustes (getByRole, getByLabel, getByText ciblé), pas de sélecteurs CSS fragiles ni de waitForTimeout.
- Données de test maîtrisées : les tests doivent être répétables et indépendants de leur ordre d'exécution. Avant d'écrire le code, explique-moi comment les données sont garanties. Si ta solution réinitialise la base ou modifie des données, demande d'abord mon accord et prévois la préparation et le nettoyage.
- Ne modifie pas le code applicatif sans mon accord.

Ne lance pas les tests : la sandbox bloque le navigateur, je les lancerai moi-même. À la fin, indique pour chaque scénario quelles lignes réalisent les actions et quelles assertions vérifient les résultats attendus.

Copilot: Avant de créer le test, je vérifie le comportement exact de l’initialisation de la base et des données de seed. Les tests devront avoir une base prévisible sans risquer d’effacer ou de modifier votre base de développement.

Read `backend/src/db/scripts/reset.ts`

Read `backend/src/db/scripts/init.ts`

Read `backend/src/db/initialize.ts`

Read `backend/src/config.ts`

Read `backend/src/db/seed/offersData.ts`, lines 1 to 120

Read `backend/package.json`

Ask User :

> Les tests peuvent rester en lecture seule et indépendants de leur ordre : ils se connectent avec Lucas et ne créent, ne modifient ni ne suppriment aucune offre/candidature. Le seed versionné contient les fixtures nécessaires : Lucas a une candidature sur « Application React de gestion de flotte »; « Migration d'une application vers le cloud » est attribuée et n'a pas de candidature de Lucas. Toutefois, `npm run db:init` ne réensemence que si la base est vide, tandis que `npm run db:reset` supprimerait la base locale actuelle avant de la recréer. Je ne veux donc pas supposer que votre base actuelle correspond exactement au seed.
>
> Pour garantir les données sans risquer votre base de développement, je propose une base SQLite E2E distincte, initialisée à partir du seed avant les tests, puis supprimée après leur exécution (fichier nommé et ses fichiers SQLite associés seulement). Cela nécessiterait de configurer l'environnement Playwright pour que son backend utilise cette base dédiée. Autorisez-vous cette préparation isolée? Je n'ai encore créé aucun test ni modifié de données/configuration pour cette stratégie.
>
> *Autorisation : autoriser une base E2E distincte, son initialisation avec les données seed, et une configuration Playwright limitée à cette base ?*

*(Réponse donnée dans la fenêtre de confirmation : accord.)*

Read `frontend/src/components/OfferTable.tsx`

Read `playwright.config.ts`

Read `.gitignore`

Read `backend/src/db/database.ts`

Read `frontend/src/components/DemoUserGroup.tsx`

Le seed versionné contient les cas attendus, mais `db:init` ne corrige pas une base déjà remplie. Avec votre accord, je configure donc un SQLite E2E isolé, recréé depuis le seed au démarrage sur des ports distincts; les tests eux-mêmes resteront en lecture seule. Je crée maintenant les deux tests classiques sans les exécuter.

Edit `e2e/recherche-offres/recherche-offres.spec.ts`, `playwright.config.ts`

Read `e2e/recherche-offres/recherche-offres.spec.ts`

Read `playwright.config.ts`

Ran terminal command *[abrégé]* : affichage numéroté de `e2e/recherche-offres/recherche-offres.spec.ts`, `git status --short`, `git diff --check`

Créé `e2e/recherche-offres/recherche-offres.spec.ts`. Je n’ai modifié aucun fichier applicatif et je n’ai lancé ni navigateur ni test.

**Données maîtrisées :** les offres et candidatures attendues proviennent du seed versionné dans `backend/src/db/seed/offersData.ts`. La configuration Playwright réinitialise une base distincte, `backend/data/gesta-e2e.db`, avec ce seed avant de démarrer le backend sur le port 3001. Le frontend E2E utilise le port 5174. La base de développement `gesta.db` et les serveurs habituels sur 3000/5173 ne sont pas ciblés. Les tests ne modifient aucune donnée et peuvent s’exécuter dans n’importe quel ordre.

### Scénarios et vérifications

| Scénario | Actions | Assertions |
|---|---|---|
| 1 | Dans le helper, lignes 6–14 : ouvrir l’application, choisir Lucas, puis ouvrir **Offres**. Ligne 21 : saisir `application`. | Ligne 15 : au moins une offre avant recherche. Lignes 23–25 : une table et exactement une ligne d’offre. Lignes 27–32 : titre attendu dans **Offres déjà candidatées**. Lignes 33–35 : absence de l’offre attribuée. |
| 2 | Lignes 39–41 : même connexion et saisie de `zzz-inexistant`. | Lignes 43–44 : aucune table ni cellule d’offre. Lignes 45–47 : message exact affiché. |

Dans `playwright.config.ts`, les serveurs utilisent des ports dédiés et `reuseExistingServer: false`, pour éviter de réutiliser par inadvertance l’instance de développement.

Après la fermeture de Playwright, la base E2E générée pourra être supprimée avec cette commande PowerShell ciblée :

```powershell
Remove-Item -Force backend\data\gesta-e2e.db, backend\data\gesta-e2e.db-wal, backend\data\gesta-e2e.db-shm, backend\data\gesta-e2e.db-journal -ErrorAction SilentlyContinue
```

---

## 4. Vérifier que les tests détectent un défaut

User: Pour vérifier que les tests E2E détectent un défaut, introduis un défaut TEMPORAIRE simple dans le code de l'application : désactive le filtrage par titre de la recherche d'offres, pour que la recherche renvoie toutes les offres visibles quel que soit le texte saisi. Garde le filtrage par visibilité selon le rôle.
- Modifie un seul fichier, avec le plus petit changement possible, et ajoute le commentaire « DÉFAUT TEMPORAIRE E2E » à la ligne modifiée.
- Ne modifie ni les tests, ni playwright.config.ts, ni les données.
- Ne lance pas les tests : je les lancerai moi-même.
Indique-moi le fichier et la ligne modifiés, et quels tests et quelles assertions devraient échouer, et pourquoi.

Copilot: Je localise où le service construit les filtres de visibilité et de titre, afin de neutraliser uniquement le filtre de recherche sans toucher aux règles de rôle. Je ne lancerai aucun test.

Read `backend/src/services/offers.service.ts`

Search for `searchFilter|filters\.search|search\s*\?\?|\.search`

Ran terminal command *[abrégé]* : `git status --short` et affichage numéroté de `backend/src/services/offers.service.ts`

Edit `backend/src/services/offers.service.ts`

Read `backend/src/services/offers.service.ts`, lines 12 to 30

Ran terminal command: `git diff -- 'backend/src/services/offers.service.ts'; git status --short`

Défaut temporaire ajouté dans `backend/src/services/offers.service.ts`, ligne 17, par un changement d’une seule ligne. Le commentaire demandé y figure. Le filtrage par rôle et par visibilité reste intact; aucun test, fichier de test, configuration Playwright ni donnée n’a été modifié. Je n’ai pas lancé les tests.

Dans `e2e/recherche-offres/recherche-offres.spec.ts` :

- **Scénario 1** : l’assertion du nombre de tables, ligne 24, devrait échouer : la recherche renverra toutes les offres publiées visibles par Lucas, donc les sections « Offres disponibles » et « Offres déjà candidatées » auront chacune une table. L’assertion du nombre de lignes, ligne 25, échouerait aussi si elle était atteinte. Le titre attendu devrait rester présent et l’offre attribuée rester absente, puisque la visibilité n’est pas désactivée.
- **Scénario 2** : l’assertion « aucune table », ligne 43, devrait échouer, car les offres publiées seront toujours affichées. Les assertions d’absence de cellules et de présence du message exact ne correspondraient donc pas au résultat.
