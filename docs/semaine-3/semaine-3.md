# Bilan semaine 3 - Harnais agentique

> Les inventaires et la matrice de couverture ont été produits avec Copilot, puis relus et corrigés
> (voir les « Corrections apportées à l'analyse de Copilot »).

## Inventaire

Version visuelle : `matrice-guides-senseurs.html`.

### Matrice guides / senseurs

| | Guide - feedforward | Senseur - feedback |
|---|---|---|
| **Inférentiel** (interprété par une IA) | `.github/copilot-instructions.md`, `README.md`, `docs/analyse/architecture.md`, `docs/analyse/cdc_gesta_developpement.md`, nos prompts | Aucun senseur inférentiel **automatisé** (pas de revue IA configurée, pas de CI). Seulement une revue IA **sollicitée à la main** : l'analyse de couverture demandée à Copilot pendant la séance. |
| **Computationnel** (règles ou programmes) | `.vscode/settings.json` (permissions et sandbox de l'agent), scripts npm (`package.json`), contrainte de version Node (`engines`) | Tests backend (Vitest + Supertest), tests frontend (Vitest + Testing Library), Oxlint, TypeScript (`tsc`), build, tous regroupés dans `npm run check` |

### Détail des mécanismes

| Mécanisme | Emplacement | Rôle | Exemple concret | Exécuté pendant la séance ? |
|---|---|---|---|---|
| Instructions Copilot | `.github/copilot-instructions.md` | Guide inférentiel : architecture, conventions, commandes, règles de modification | « Never edit an applied migration. Add the next ordered file under `backend/src/db/migrations/`. » | Lu en entier par nous (audit des guides) |
| README | `README.md` | Guide inférentiel : démarrage, commandes attendues | « `npm run check` - Lint, typecheck, tests et build : à lancer avant chaque commit important » | Lu |
| Architecture | `docs/analyse/architecture.md` | Guide inférentiel : responsabilités des couches | « Backend requests flow through `controllers -> services -> repositories -> SQLite`. » | Lu |
| Cahier des charges | `docs/analyse/cdc_gesta_developpement.md` | Guide inférentiel : exigences et règles métier | RG-03 : un étudiant ne peut candidater qu'à une offre au statut « Publiée ». | Lu |
| Permissions de l'agent | `.vscode/settings.json` | Guide computationnel : limite **ce que l'agent peut faire** (pas ce qu'il doit coder) | `"chat.tools.global.autoApprove": false`, `"**/.env": false` | Appliqué en continu (demandes de confirmation observées) |
| Scripts npm | `package.json` (+ workspaces) | Fixe les commandes standard ; `check` déclenche les senseurs | `"check": "npm run lint && npm run typecheck && npm run test && npm run build"` | Oui : `npm run check` lancé par nous, OK |
| Version Node | `package.json` (`engines`) | Impose l'environnement d'exécution | `"node": ">=22.14.0"` ; vérifié par `backend/tests/nodeVersion.test.ts` | Seulement lu |
| Tests backend | `backend/tests/*.test.ts` | Senseur computationnel : API, droits, base | `expect(response.status).toBe(409)` pour une offre non publiée | Oui : `applications.test.ts` exécuté (20 puis 21 tests réussis) ; suite complète via `npm run check` |
| Tests frontend | `frontend/tests/*.test.tsx` | Senseur computationnel : rendu, formulaires, appels API simulés | `expect(await screen.findByText("Retirée")).toBeInTheDocument()` | Oui, via `npm run check` : OK |
| Oxlint | `backend/.oxlintrc.json`, `frontend/.oxlintrc.json` | Senseur computationnel : règles de code | `"typescript/no-explicit-any": "error"` | Oui, via `npm run check` : OK |
| TypeScript | `backend/tsconfig.json`, `frontend/tsconfig.app.json` | Senseur computationnel : types | `"strict": true`, `"noUncheckedIndexedAccess": true` | Oui, via `npm run check` : OK |
| Build | scripts `build` | Senseur computationnel : compilation réelle | backend `tsc -p tsconfig.build.json`, frontend `tsc -b && vite build` | Oui, via `npm run check` : OK |

### Corrections apportées à l'analyse de Copilot

- **Copilot classait en « senseurs inférentiels »** les cas de tests manuels, `architecture.md` et le cahier des charges. C'est inexact :
  - `architecture.md` et le cahier des charges sont des **guides** (ils agissent avant) ;
  - les cas de tests manuels relèvent de la **boucle humaine** (c'est nous qui observons, pas une IA).
- **Copilot listait les contraintes SQLite (`CHECK`) et les middlewares `authenticate` / `authorize`** comme senseurs. Ce sont des comportements **de l'application**, pas des retours sur le travail de l'agent. Ils ne deviennent un retour que lorsqu'un test les vérifie. Nous les avons donc retirés de la matrice.
- **Pas de CI** : aucun dossier `.github/workflows/`. Les senseurs ne tournent que si quelqu'un (nous ou l'agent) lance les commandes localement.

## Couverture des exigences

Version visuelle : `matrice-tracabilite-tests.html`.

Légende : **Couvert** = une assertion porte sur le résultat attendu. **Partiel** = seule une partie du résultat est vérifiée. **Absent** = aucun test.
Fichier backend : `backend/tests/applications.test.ts`. Fichiers frontend : `frontend/tests/OffersPage.test.tsx`, `ApplicationsPage.test.tsx`, `ApplicationsWithdraw.test.tsx`.

| # | Exigence | Cas à vérifier | Test existant (fichier et nom) | Assertions utiles | Couverture avant | Après séance |
|---|---|---|---|---|---|---|
| 1 | EF-32 | Candidater sans message | Aucun (le test existant envoie un message) | - | **Absent** | **Couvert** (test ajouté) |
| 2 | EF-32 | Candidater avec message | back : « crée une candidature avec un message facultatif » ; front : « permet à un étudiant d'envoyer une candidature avec un message » | `status 201`, `toMatchObject({ message: "Je suis très motivé.", status: "IN_PROGRESS" })` ; front : corps `POST` envoyé + « En cours » affiché | Couvert | Couvert |
| 3 | EF-32 / RG-03 | Offre non publiée refusée | back : « refuse une offre qui n'est pas publiée » | `status 409`, `error.code "OFFER_NOT_PUBLISHED"` | Couvert (backend) | Couvert |
| 4 | EF-32 | Autre rôle refusé | back : « refuse les profils qui ne sont pas étudiants » (`applications.test.ts:193`) | `applyAs("ADMIN", …)` puis `status 403`, `error.code "FORBIDDEN"` | **Partiel** : seul l'administrateur est testé ; le contact d'entreprise ne l'est pas pour la création (il n'apparaît que dans le test de `GET /applications`) | Partiel |
| 5 | EF-32 | Non connecté | Aucun | - | **Absent** | **Couvert** (test ajouté) |
| 6 | EF-32 | Doublon refusé | back : « refuse une candidature active existante » | `status 409`, `"APPLICATION_EXISTS"` | **Partiel** : seulement avec une candidature En cours, pas Retenue / Non retenue | Partiel |
| 7 | EF-32 | Recandidater après retrait = même ligne réactivée | back : « réactive une candidature retirée sans créer de doublon » | `status 201`, `id: APPLICATION.INES_BILLING_API` (même id), `status "IN_PROGRESS"` | Couvert (même id renvoyé ; pas de comptage des lignes en base) | Couvert |
| 8 | EF-32 | Retrait d'une candidature En cours | back : « retire une candidature en cours et conserve la ligne » ; front : « demande confirmation puis retire la candidature » | `status 200`, `status "WITHDRAWN"`, ligne toujours listée ; front : confirmation + « Retirée » | Couvert | Couvert |
| 9 | EF-32 | Retrait refusé si Retenue / Non retenue | back : « refuse le retrait d'une candidature au statut non modifiable (%s) » (SELECTED, REJECTED) | `status 409`, `"APPLICATION_NOT_IN_PROGRESS"` | Couvert | Couvert |
| 10 | EF-32 | Retrait de la candidature d'un autre étudiant | back : « refuse le retrait de la candidature d'un autre étudiant » | `status 403`, `"FORBIDDEN"` | Couvert | Couvert |
| 11 | EF-32 | Retrait d'un id inexistant | Aucun (seul un id **mal formé** est testé → 400) | - | **Absent** | **Couvert** (test ajouté) |
| 12 | EF-33 | Un étudiant ne voit **que** ses candidatures | back : « retourne toutes les candidatures de l'étudiant, y compris retirées » ; **ajouté** : « ne retourne pas les candidatures d'un autre étudiant » | avant : `expect.arrayContaining([...])` sur 2 candidatures d'Inès ; ajouté : `toEqual` sur la liste complète de Lucas (uniquement sa candidature) | **Partiel** : `arrayContaining` passe même si la liste contient **aussi** les candidatures d'un autre étudiant. L'absence des autres n'est pas vérifiée. | **Couvert** (test ajouté : liste complète vérifiée) |
| 13 | EF-33 | Les 4 statuts affichés | front : « affiche toutes les années et les statuts français », « sépare les offres disponibles des offres déjà candidatées », test d'envoi | « Retirée », « Retenue », « En cours » trouvés dans 3 tests différents | **Partiel** : « Non retenue » n'est testé nulle part | Partiel |
| 14 | EF-33 | Candidature retirée toujours visible | back : « retourne toutes les candidatures de l'étudiant, y compris retirées », « retire une candidature en cours et conserve la ligne » ; front : « affiche toutes les années et les statuts français », « demande confirmation puis retire la candidature » | `objectContaining({ status: "WITHDRAWN" })` | Couvert | Couvert |

### Corrections apportées à l'analyse de Copilot

- **Cas 4** : Copilot le donnait comme couvert. En relisant le test (`applications.test.ts:193`), nous avons constaté qu'il n'appelle la route qu'en tant qu'administrateur : le refus pour un contact d'entreprise n'est pas prouvé.
- **Cas 12** : Copilot le considérait comme vérifié « indirectement ». Nous l'avons classé **Partiel** avant la séance, car `arrayContaining` ne prouve pas l'absence des candidatures d'un autre étudiant. C'était le **manque le plus important**, car il touche à la confidentialité. Nous avons donc ajouté un test qui compare la liste complète (voir « Tests ajoutés »).
- **Cas 13** : Copilot concluait qu'« aucun test ne vérifie les quatre statuts ». En réalité, trois libellés sur quatre apparaissent dans des tests différents ; seul « Non retenue » manque.

### Tests hors exigence repérés (non rattachés à EF-32 / EF-33)

- Backend : message de plus de 1000 caractères refusé (400 `INVALID_MESSAGE`) ; id d'offre invalide (400) ; id de candidature mal formé (400) ; candidature liée à une offre archivée toujours listée ; liste refusée aux profils non étudiants (403).
- Frontend : annulation du retrait (aucune requête envoyée) ; état vide ; déconnexion sur session expirée ; offre retirée replacée dans les offres disponibles.

### Manques restants

1. Cas 4 : refus de la candidature pour un contact d'entreprise (seul l'administrateur est testé).
2. Cas 6 : doublon refusé quand la candidature existante est Retenue ou Non retenue.
3. Cas 13 : affichage du libellé « Non retenue ».
4. Candidature à une offre inexistante : le service renvoie `404 OFFER_NOT_FOUND`, mais aucun test correspondant n'a été repéré (seul un id d'offre **mal formé** est testé, 400).
5. Aucun test frontend des refus (offre non publiée, autre rôle) : acceptable, car les contrôles sont côté serveur et testés au niveau de l'API.

## Modifications et vérification

### Tests ajoutés (`backend/tests/applications.test.ts`, aucun fichier applicatif modifié)

| Test ajouté | Ce qu'il vérifie | Défaut qui le ferait échouer |
|---|---|---|
| Candidature sans message | `201`, `message: null`, `status "IN_PROGRESS"` | Le service rend le message obligatoire, ou enregistre `""` au lieu de `null` |
| Candidature sans session | `401`, `error.code "UNAUTHENTICATED"` | Le middleware `authenticate` est retiré ou monté après la route (la candidature serait acceptée ou renverrait une autre erreur) |
| Retrait d'une candidature inexistante | `404`, `error.code "APPLICATION_NOT_FOUND"` | Le service ne vérifie pas l'existence et renvoie 403, 409 ou plante (500) |
| « ne retourne pas les candidatures d'un autre étudiant » (cas 12) | La **liste complète** renvoyée est comparée à la liste attendue (pas `arrayContaining`) : aucune candidature d'un autre étudiant n'y figure | Le repository ou le service ne filtre plus par `student_id` (ex. `findByStudent` remplacé par une requête sans `WHERE`) : la liste contiendrait aussi les candidatures d'un autre étudiant |

**Non réalisé** : nous n'avons pas provoqué volontairement le défaut pour constater l'échec des tests ajoutés. Les défauts indiqués ci-dessus sont donc déduits de la lecture des assertions et du service, pas observés. Procédure possible sans risque : commenter le contrôle dans `applications.service.ts`, relancer le test, constater l'échec, puis `git restore` le fichier.

### Commandes lancées et résultats

| Commande | Lancée par | Résultat |
|---|---|---|
| `npm run test -w backend -- tests/applications.test.ts` | Copilot | 1er essai bloqué par la politique d'exécution PowerShell (`npm.ps1`) ; relancé avec `npm.cmd` : **20 tests réussis** |
| Ajout du test du cas 12, puis `applications.test.ts` | Copilot | **21 tests réussis** |
| `npm run check` → lint (Oxlint `--deny-warnings`) | Nous | OK : 0 avertissement, 0 erreur (backend 63 fichiers / 85 règles, frontend 53 fichiers / 118 règles) |
| `npm run check` → typecheck (`tsc --noEmit` backend, `tsc -b` frontend) | Nous | OK, aucune erreur |
| `npm run check` → tests (Vitest) | Nous | Backend : **135 tests réussis** (10 fichiers, dont 21 dans `applications.test.ts`). Frontend : **55 tests réussis** (9 fichiers) |
| `npm run check` → build | Nous | OK : backend compilé (`tsc` + copie des migrations), frontend construit par Vite (60 modules) |

### Vérifications manuelles et limites

- Le diff de `applications.test.ts` a été relu par nous dans Source Control : seuls des tests ont été ajoutés, aucun fichier applicatif modifié.
- Les comportements dans le navigateur ont été vérifiés la semaine passée (`docs/semaine-2/cas-de-tests.md`) ; rien de nouveau testé à la main cette semaine.
- Limites : les tests backend tournent sur une base de test avec des données de démonstration fixes ; ils ne prouvent rien sur des volumes réels ou des accès concurrents. Les manques 1 à 3 ci-dessus restent ouverts.

## Audit des guides

### Guides examinés (lus en entier)

- `.github/copilot-instructions.md` (instructions Copilot, générées par `/init` puis relues)
- `docs/analyse/architecture.md` (architecture et parcours de référence)
- `.github/pull_request_template.md` (modèle de PR, qui guide aussi la vérification)

### Références Web 2 utilisées

Cours BINV2150-A « Javascript : avancé » (Plumat & Strebelle, 2025-2026) :
séance 2 « Le langage TypeScript », séance 3 « Middlewares avec Express », séance 4 « API REST »,
séance 6 « Client/Serveur ».

### Matrice d'audit

| # | Attente ou convention de Web 2 (source) | Guide examiné (fichier et passage) | Correspondance | Écart ou ajout proposé |
|---|---|---|---|---|
| 1 | Architecture serveur **Controller → Service → DB** ; le serveur porte « logique métier, gestion des données, **sécurité** » (séance 3, slide « Rappels web1 - Serveur REST » ; séance 6, slide « Serveur ») | `copilot-instructions.md` : « Backend requests flow through `controllers -> services -> repositories -> SQLite` » et « Keep authorization and data visibility rules in backend services… Frontend permission helpers… must not be the security boundary » | **Oui** | Rien à ajouter. Le guide va plus loin que Web 2 (couche `repositories` séparée, mappers), de façon cohérente. |
| 2 | **L'ordre d'enregistrement des middlewares détermine l'ordre d'exécution** ; authentification au niveau de la route ; middleware d'erreur (séance 3, slides « Qu'est-ce qu'un middleware ? », « Middleware au niveau route », « Middleware d'erreur ») | `copilot-instructions.md` : « Authentication is applied before protected controllers… Use `HttpError` for expected failures so `errorHandler` returns the standard shape » | **Partielle** | Le principe est présent, mais **rien sur l'ordre de montage**. Conséquence observée en semaine 2 : en montant le routeur des candidatures à la racine, Copilot a rendu toutes les routes inconnues authentifiées (401 au lieu de 404), et c'est la suite de tests qui l'a détecté. **Ajout proposé** : « Monter `authenticate` au niveau du routeur ou de la route protégée, jamais globalement avant les routes publiques et le 404 ; enregistrer `errorHandler` en dernier. » |
| 3 | **Ressources au pluriel**, sous-ressources (`/users/1/orders`) ; **POST crée, PATCH met à jour partiellement, DELETE supprime** (séance 4, slides « Ressources », « Méthodes HTTP », « Méthode et chemin ») | Aucun passage sur le nommage des routes ou le choix des méthodes HTTP, ni dans `copilot-instructions.md` ni dans `architecture.md` | **Non** (absent) | Nos routes : `POST /offers/:offerId/applications` respecte la sous-ressource. Le retrait est `POST /applications/:id/withdraw` : nous avons refusé `DELETE` (rien n'est supprimé), mais une route d'action n'est pas le style REST du cours, qui suggérerait `PATCH /applications/:id` sur le statut. Sans consigne dans le guide, ce choix dépend de chaque prompt. **Ajout proposé** : « Ressources au pluriel ; POST crée, PATCH modifie partiellement, DELETE supprime ; justifier toute route d'action. » |
| 4 | **Codes de statut** : 201 après un POST ; 400 données invalides, 401 non authentifié, 403 sans droits, 404 inexistant, **409 conflit (ressource existe déjà)** (séance 4, slides « Statut de la réponse » et « Codes d'erreur ») | `copilot-instructions.md` : « Use `HttpError` for expected failures » et « tests for successful and denied access » ; `pull_request_template.md` : « cas d'erreur (400, 401, 403, 404…) » | **Partielle** | Le guide dit **comment** signaler une erreur, pas **quel code** choisir. Le modèle de PR ne cite pas 409, alors que nos doublons et l'offre non publiée en renvoient. Nous utilisons aussi 409 pour `OFFER_NOT_PUBLISHED`, ce qui va au-delà de la définition du cours (« ressource existe déjà ») : choix défendable (conflit d'état), mais à documenter. **Ajout proposé** : un tableau « situation → code HTTP → code d'erreur » dans le guide, et 409 dans le modèle de PR. |
| 5 | En TypeScript, **annotation explicite obligatoire** des paramètres et des retours de fonctions (séance 2, slide « TypeScript : les types », encadré « Attention ») | Aucun passage. `.oxlintrc.json` interdit `any` (`"typescript/no-explicit-any": "error"`) et `tsconfig` est en `strict`, mais rien n'impose les types de retour | **Non** (absent) | Vérifié dans `applications.service.ts` : les méthodes `listOwn`, `withdraw` et `apply` annotent leurs paramètres et leur retour (`: Application[]`, `: Application`), mais la fabrique `createApplicationsService` a un retour **inféré**. La convention est donc suivie par imitation du code existant, pas parce qu'un guide l'impose. **Ajout proposé** : « Annoter explicitement les types des paramètres et des retours de fonctions », ou une règle de lint équivalente (senseur computationnel plutôt que guide). |

### Problèmes trouvés dans les guides eux-mêmes

- **Référence morte** : `copilot-instructions.md` renvoie à « `docs/architecture.md` », alors que le fichier se trouve dans `docs/analyse/architecture.md`. Un agent qui suit la consigne à la lettre ne le trouve pas. **Correction proposée** : mettre à jour le chemin.
- **Incohérence de chemin** : `pull_request_template.md` demande la conversation dans `docs/conversation-N.md`, alors que les consignes du cours demandent `docs/semaine-N/`.

### Recommandations (par priorité)

1. Corriger le chemin vers `architecture.md` : simple, et l'agent lit ce guide à chaque tâche.
2. Ajouter la règle sur l'ordre des middlewares : un défaut réel est déjà survenu.
3. Ajouter les conventions REST et le tableau des codes HTTP du cours.
4. Ajouter l'annotation des types de retour, de préférence sous forme de règle de lint.

Nous n'avons **pas modifié** les guides : la consigne demande un audit, pas une correction.

### Limites de l'audit

- Seuls les supports de Web 2 cités ci-dessus ont été utilisés ; d'autres séances (formulaires, état React, modules) n'ont pas donné de consigne vérifiable sur les points audités.
- Le point 5 n'a été vérifié que dans `applications.service.ts`, pas dans tout le projet.

## Optionnel - senseur d'architecture

- **Règle vérifiée** : un contrôleur (`backend/src/controllers/`) n'importe jamais un repository directement, et aucune requête SQL n'apparaît hors de `backend/src/repositories/`. Raison : sauter la couche service ferait aussi sauter les contrôles de droits (`permissions.ts`), ce qu'un agent pressé pourrait faire.
- **Moment** : un test backend supplémentaire, donc exécuté par `npm run check` (par nous et par l'agent dans sa boucle automatique).
- **Données examinées** : les lignes `import` des fichiers de `controllers/`, et les chaînes SQL (`SELECT`, `INSERT`, `UPDATE`) dans `src/` hors `repositories/`. Résultat : OK, ou la liste des fichiers et lignes en violation.
- **Exemple de violation** : `applications.controller.ts` qui importe `applications.repository.ts`.
- **Limites et coûts** : faux positifs possibles (import de types seuls, mots SQL dans un commentaire ou un message) ; ne détecte pas les violations indirectes ; un outil dédié (ex. dependency-cruiser) serait plus robuste mais ajouterait une dépendance. Non implémenté.

## Crédits d'IA

22% => 31% (62,3/200)

## Fichiers livrés dans `docs/semaine-3/`

- `semaine-3.md` : ce bilan
- `matrice-guides-senseurs.html` : classification des guides et senseurs, et audit par rapport aux bonnes pratiques Web 2
- `matrice-tracabilite-tests.html` : traçabilité des cas de tests par rapport aux exigences EF-32, EF-33 et RG-03
- `conversation-3.md` : conversation complète avec Copilot (inventaire, couverture, tests ajoutés, génération des matrices), exportée sans retouche
