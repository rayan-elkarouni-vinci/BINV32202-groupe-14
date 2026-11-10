User: Explore le dépôt et liste les mécanismes qui guident un agent de codage (guides, feedforward)
et ceux qui contrôlent le résultat (senseurs, feedback). Classe-les selon deux axes :
inférentiel (interprété par une IA) ou computationnel (règles ou programmes exécutables).
Pour chacun : nom, fichier ou outil, ce qu'il impose ou vérifie, un exemple concret de règle
tiré du fichier. Ne remplis pas une case si rien n'existe. Ne modifie aucun fichier.

Copilot: Requested chat rename
Completed with input: {
  "title": "Cartographie des contrôles agent",
  "automatic": true
}

Search for `(agent|copilot|instruction|guide|feedback|feedforward|sensor|senseur|lint|tes...`

Find files matching `**/*`

Je vais distinguer les consignes interprétées par l’agent des contrôles exécutables, puis relever des exemples textuels précis sans modifier le dépôt.

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\.github\\copilot-instructions.md"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\README.md"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\package.json"
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
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\.vscode\\settings.json"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\.oxlintrc.json"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\.oxlintrc.json"
}

Read , lines 1 to 220
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\README.md",
  "view_range": [
    1,
    220
  ]
}

Read , lines 1 to 220
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\analyse\\architecture.md",
  "view_range": [
    1,
    220
  ]
}

Read , lines 1 to 220
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\analyse\\cdc_gesta_developpement.md",
  "view_range": [
    1,
    220
  ]
}

Read , lines 1 to 220
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\semaine-2\\cas-de-tests.md",
  "view_range": [
    1,
    220
  ]
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
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\db\\migrations\\001_initial.sql"
}

Read 
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\tests\\nodeVersion.test.ts"
}

Search for `^## |npm run (lint|typecheck|test|build|check)|Never |Keep |Use |When an API|...`

Search for `chat\.(permissions|tools|agent|network)|autoApprove|blockDetected|ignoreDefau...`

Search for `\"scripts\"|\"lint\"|\"typecheck\"|\"test\"|\"build\"|\"check\"|\"engines\"|\...`

Search for `strict|noUnchecked|noUnused|noFallthrough|forceConsistent|deny-warnings|rules...`

Search for `describe\(|it\(|expect\(|toBe\(|toEqual\(|toMatch\(|supertest|fetchMock`

## 1. Feedforward — mécanismes qui guident l’agent avant la production

### Inférentiels — interprétés par l’IA

| Nom | Fichier / outil | Ce qu’il impose | Exemple concret |
|---|---|---|---|
| Instructions Copilot du dépôt | `.github/copilot-instructions.md` | Architecture, conventions, commandes de validation et règles de modification | « Never edit an applied migration. Add the next ordered file under `backend/src/db/migrations/`. » |
| README de projet | `README.md` | Prérequis, démarrage, organisation générale et commandes attendues | « `npm run check` — Lint, typecheck, tests et build : à lancer avant chaque commit important » |
| Documentation d’architecture | `docs/analyse/architecture.md` | Répartition des responsabilités et parcours de référence | « Backend requests flow through `controllers -> services -> repositories -> SQLite`. » |
| Cahier des charges métier | `docs/analyse/cdc_gesta_developpement.md` | Exigences fonctionnelles, règles métier et périmètre | « “Doit” signale une exigence obligatoire ; “peut” signale une possibilité offerte à l’utilisateur. » |

### Computationnels — règles exécutables ou configuration d’exécution

| Nom | Fichier / outil | Ce qu’il impose | Exemple concret |
|---|---|---|---|
| Paramétrage de l’agent VS Code | `.vscode/settings.json` | Autorisations d’outils, sandbox, commandes auto-approuvées et fichiers protégés | `"chat.tools.global.autoApprove": false` |
| Règles d’édition automatique | `.vscode/settings.json` | Autorise les éditions ordinaires mais protège les secrets, `.git`, `.vscode` et le lockfile | `"**/.env": false` et `"**/package-lock.json": false` |
| Scripts npm de développement | `package.json`, `backend/package.json`, `frontend/package.json` | Définit les commandes standard que l’agent doit utiliser | `"check": "npm run lint && npm run typecheck && npm run test && npm run build"` |
| Contraintes de version d’exécution | `package.json` | Version minimale de Node.js | `"node": ">=22.14.0"` |

## 2. Feedback — mécanismes qui contrôlent ou vérifient le résultat

### Inférentiels — résultats interprétés par une IA ou un humain

| Nom | Fichier / outil | Ce qu’il vérifie | Exemple concret |
|---|---|---|---|
| Cas de tests manuels | `docs/semaine-2/cas-de-tests.md` | Compare le comportement observé au résultat attendu | « Retirer une candidature en cours — Résultat attendu : statut “Retirée” — Résultat obtenu : ✅ OK » |
| Documentation des scénarios de référence | `docs/analyse/architecture.md` | Sert de référence pour juger si une nouvelle implémentation respecte les parcours existants | « `App.tsx` est le propriétaire unique de `useAuth`. » |
| Cahier des charges | `docs/analyse/cdc_gesta_developpement.md` | Permet d’évaluer la conformité fonctionnelle, même sans exécution automatique | Exemple : un étudiant « peut consulter les offres publiées » et candidater à une offre publiée. |

### Computationnels — capteurs et feedback exécutables

| Nom | Fichier / outil | Ce qu’il vérifie | Exemple concret |
|---|---|---|---|
| Tests backend | `backend/tests/` avec Vitest/Supertest | API, authentification, permissions, visibilité, base de données et versions Node | `backend/tests/nodeVersion.test.ts` vérifie que Node `22.12.0` est refusé et `22.14.0` accepté. |
| Tests frontend | `frontend/tests/` avec Vitest/Testing Library | Rendu React, navigation, formulaires, appels API simulés et gardes | `frontend/tests/guards.test.ts` vérifie les type guards. |
| Oxlint | `backend/.oxlintrc.json`, `frontend/.oxlintrc.json` | Erreurs de style, règles React/TypeScript et avertissements | `"typescript/no-explicit-any": "error"` |
| TypeScript | `backend/tsconfig.json`, `frontend/tsconfig.app.json` | Cohérence statique, types manquants, variables inutilisées et accès potentiellement indéfinis | `"strict": true` et `"noUncheckedIndexedAccess": true` |
| Build | Scripts `build` dans `package.json` et les deux workspaces | Vérifie que le backend et le frontend se compilent réellement | Backend : `tsc -p tsconfig.build.json`; frontend : `tsc -b && vite build`. |
| Contraintes SQLite | `backend/src/db/migrations/001_initial.sql` | Refuse les données invalides au niveau de la base | `CHECK (status IN ('SUBMITTED', 'PENDING', 'PUBLISHED', 'ASSIGNED', 'ARCHIVED'))` |
| Contrôles runtime backend | `backend/src/middlewares/` et `backend/src/services/permissions.ts` | Refuse à l’exécution les requêtes non authentifiées ou non autorisées | `authenticate` renvoie `401`; `authorize` renvoie `403` si la règle n’est pas respectée. |

### Synthèse

- **Feedforward inférentiel** : instructions Copilot, README, architecture, cahier des charges.
- **Feedforward computationnel** : réglages VS Code et scripts npm qui encadrent les actions possibles.
- **Feedback inférentiel** : cas manuels et exigences métier comparées par lecture.
- **Feedback computationnel** : tests, lint, typecheck, build, contraintes SQLite et contrôles runtime.

Aucun workflow CI `.github/workflows/` n’apparaît dans le dépôt inspecté ; le feedback automatisé est donc principalement déclenché localement via `npm run check`.

User: Pour chaque cas de la liste ci-dessous, trouve le test qui le vérifie dans backend/tests
et frontend/tests : fichier, nom du test, et assertions exactes (copie les lignes expect).
Indique "aucun test" si rien ne vérifie ce cas. Liste aussi les tests sur les candidatures
qui ne correspondent à aucun cas. Ne modifie aucun fichier.

#	Exigence	Cas	Résultat attendu
1	EF-32	Étudiant candidate à une offre publiée sans message	201, statut En cours
2	EF-32	Idem avec message	Message enregistré
3	EF-32	Offre non publiée	Refus (400/409 selon votre code)
4	EF-32	Autre rôle (admin, contact)	403
5	EF-32	Non connecté	401
6	EF-32	Doublon (déjà En cours / Retenue / Non retenue)	Refus
7	EF-32	Nouvelle candidature après retrait	Même ligne réactivée, pas de doublon
8	EF-32	Retrait d’une candidature En cours	Statut Retirée
9	EF-32	Retrait d’une candidature Retenue / Non retenue	Refus
10	EF-32	Retrait de la candidature d’un autre étudiant	Refus (403/404)
11	EF-32	Retrait d’un id inexistant	404
12	EF-33	Un étudiant ne voit que ses candidatures	Liste filtrée
13	EF-33	Les 4 statuts s’affichent correctement	Bons libellés
14	EF-33	Candidature retirée toujours visible	Présente, statut Retirée
15 RG-03   Un étudiant ne peut candidater qu'à une offre au statut « Publiée ».

Copilot: Search for `candid|candidate|withdraw|retir|PUBLISHED|PENDING|SUBMITTED|SELECTED|REJECTED...`

Find files matching `backend/tests/*application*;frontend/tests/*Application*`

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\tests\\applications.test.ts"
}

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\tests\\ApplicationsPage.test.tsx"
}

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\tests\\ApplicationsWithdraw.test.tsx"
}

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\frontend\\tests\\OffersPage.test.tsx"
}

## Correspondance des cas avec les tests

### 1. Étudiant candidate à une offre publiée sans message — 201, En cours

**Backend**

- Fichier : [backend/tests/applications.test.ts]()
- Test : `crée une candidature avec un message facultatif` — le message est fourni, donc ce test ne couvre pas exactement « sans message ».

Assertions :

```ts
expect(response.status).toBe(201);
expect(response.body).toMatchObject({
  offerId: OFFER.FLEET_APP,
  message: "Je suis très motivé.",
  status: "IN_PROGRESS",
});
```

- Test sans message : `refuse une candidature active existante` et `réactive une candidature retirée sans créer de doublon` utilisent parfois un corps absent, mais ne créent pas une nouvelle candidature sans message avec succès.

**Frontend**

- Fichier : [frontend/tests/OffersPage.test.tsx]()
- Test : `permet à un étudiant d'envoyer une candidature avec un message`

Le test concerne une candidature avec message :

```ts
expect(await screen.findByText("En cours")).toBeInTheDocument();
```

**Conclusion :** aucun test exact pour une candidature sans message.

---

### 2. Même cas avec message — message enregistré

**Backend**

- Test : `crée une candidature avec un message`

```ts
expect(response.status).toBe(201);
expect(response.body).toMatchObject({
  offerId: OFFER.FLEET_APP,
  message: "Je suis très motivé.",
  status: "IN_PROGRESS",
});
```

**Frontend**

- Test : `permet à un étudiant d'envoyer une candidature avec un message`

```ts
expect(fetchMock).toHaveBeenLastCalledWith(
  "/api/offers/2/applications",
  expect.objectContaining({
    method: "POST",
    headers: {
      Authorization: "jeton",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "Ma motivation" }),
  }),
);
expect(await screen.findByText("En cours")).toBeInTheDocument();
```

---

### 3. Offre non publiée — refus

**Backend**

- Test : `refuse une offre qui n'est pas publiée`

```ts
expect(response.status).toBe(409);
expect(response.body.error.code).toBe("OFFER_NOT_PUBLISHED");
```

**Frontend**

Aucun test ne vérifie le refus d’une candidature sur une offre non publiée.

---

### 4. Autre rôle — 403

**Backend**

- Test : `refuse les profils qui ne sont pas étudiants`

```ts
expect(response.status).toBe(403);
expect(response.body.error.code).toBe("FORBIDDEN");
```

**Frontend**

Aucun test ne vérifie la tentative de candidature par un administrateur ou un contact.

---

### 5. Non connecté — 401

**Backend**

Aucun test ne vérifie directement `POST /offers/:offerId/applications` sans session.

**Frontend**

Aucun test ne vérifie une candidature sans token.

---

### 6. Doublon — refus

**Backend**

- Test : `refuse une candidature active existante`

```ts
expect(response.status).toBe(409);
expect(response.body.error.code).toBe("APPLICATION_EXISTS");
```

Ce test couvre le doublon avec une candidature `IN_PROGRESS`.

Aucun test ne vérifie explicitement le doublon avec une candidature `SELECTED` ou `REJECTED`.

**Frontend**

Aucun test ne vérifie le refus d’un doublon.

---

### 7. Nouvelle candidature après retrait — même ligne réactivée

**Backend**

- Test : `réactive une candidature retirée sans créer de doublon`

```ts
expect(response.status).toBe(201);
expect(response.body).toMatchObject({
  id: APPLICATION.INES_BILLING_API,
  message: "Nouvelle motivation",
  status: "IN_PROGRESS",
});
```

**Frontend**

Aucun test ne vérifie la réactivation ni l’absence de doublon en base.

---

### 8. Retrait d’une candidature `En cours`

**Backend**

- Test : `retire une candidature en cours et conserve la ligne`

```ts
expect(response.status).toBe(200);
expect(response.body).toMatchObject({
  id: APPLICATION.LUCAS_FLEET_APP,
  status: "WITHDRAWN",
});
```

Puis :

```ts
expect(listed.body).toEqual([
  expect.objectContaining({ id: APPLICATION.LUCAS_FLEET_APP, status: "WITHDRAWN" }),
]);
```

**Frontend**

- Fichier : [frontend/tests/ApplicationsWithdraw.test.tsx]()
- Test : `demande confirmation puis retire la candidature`

```ts
expect(window.confirm).toHaveBeenCalledWith("Voulez-vous retirer cette candidature ?");
expect(fetchMock).toHaveBeenCalledWith(
  "/api/applications/1/withdraw",
  expect.objectContaining({ method: "POST", headers: { Authorization: "jeton" } }),
);
expect(await screen.findByText("Retirée")).toBeInTheDocument();
```

---

### 9. Retrait d’une candidature retenue ou non retenue — refus

**Backend**

- Test paramétré : `refuse le retrait d'une candidature au statut non modifiable (%s)`

```ts
expect(response.status).toBe(409);
expect(response.body.error.code).toBe("APPLICATION_NOT_IN_PROGRESS");
```

Il couvre les statuts `SELECTED` et `REJECTED`.

**Frontend**

Aucun test ne vérifie l’affichage ou le refus d’une erreur de retrait pour ces statuts.

---

### 10. Retrait de la candidature d’un autre étudiant — 403/404

**Backend**

- Test : `refuse le retrait de la candidature d'un autre étudiant`

```ts
expect(response.status).toBe(403);
expect(response.body.error.code).toBe("FORBIDDEN");
```

**Frontend**

Aucun test.

---

### 11. Retrait d’un identifiant inexistant — 404

**Backend**

Aucun test ne vérifie un identifiant numérique inexistant renvoyant `404`.

Le test existant vérifie seulement un identifiant mal formé :

- Test : `refuse un identifiant invalide`

```ts
expect(response.status).toBe(400);
expect(response.body.error.code).toBe("INVALID_APPLICATION_ID");
```

**Frontend**

Aucun test.

---

### 12. Un étudiant ne voit que ses candidatures — liste filtrée

**Backend**

- Test : `retourne toutes les candidatures de l'étudiant, y compris retirées`

```ts
expect(response.status).toBe(200);
expect(response.body).toEqual(expect.arrayContaining([
  expect.objectContaining({
    id: APPLICATION.INES_FLEET_APP,
    status: "IN_PROGRESS",
  }),
  expect.objectContaining({
    id: APPLICATION.INES_BILLING_API,
    status: "WITHDRAWN",
  }),
]));
```

Le filtrage par étudiant est indirectement vérifié par l’appel authentifié avec `STUDENT.INES_HADDAD`.

**Frontend**

Aucun test ne vérifie le filtrage entre deux étudiants. Les données sont déjà filtrées dans le mock.

---

### 13. Les quatre statuts s’affichent correctement

**Backend**

Aucun test : le backend renvoie les codes anglais, pas les libellés français.

**Frontend**

- Fichier : [frontend/tests/ApplicationsPage.test.tsx]()
- Test : `affiche toutes les années et les statuts français`

```ts
expect(await screen.findByText("API REST de facturation")).toBeInTheDocument();
expect(screen.getByText("Retirée")).toBeInTheDocument();
expect(screen.getByText("2025-2026")).toBeInTheDocument();
expect(screen.getByText("Archivée")).toBeInTheDocument();
expect(screen.getByText("Motivation")).toBeInTheDocument();
```

Ce test ne couvre pas les quatre statuts de candidature : il couvre `Retirée` et `Archivée`, cette dernière étant le statut de l’offre.

**Conclusion :** aucun test ne vérifie les quatre statuts de candidature.

---

### 14. Candidature retirée toujours visible

**Backend**

- Test : `retourne toutes les candidatures de l'étudiant, y compris retirées`

```ts
expect(response.body).toEqual(expect.arrayContaining([
  expect.objectContaining({
    id: APPLICATION.INES_FLEET_APP,
    status: "IN_PROGRESS",
  }),
  expect.objectContaining({
    id: APPLICATION.INES_BILLING_API,
    status: "WITHDRAWN",
  }),
]));
```

- Test : `retire une candidature en cours et conserve la ligne`

```ts
expect(listed.body).toEqual([
  expect.objectContaining({ id: APPLICATION.LUCAS_FLEET_APP, status: "WITHDRAWN" }),
]);
```

**Frontend**

- Test : `affiche toutes les années et les statuts français`

```ts
expect(screen.getByText("Retirée")).toBeInTheDocument();
```

- Test : `demande confirmation puis retire la candidature`

```ts
expect(await screen.findByText("Retirée")).toBeInTheDocument();
```

---

### 15. RG-03 — candidature uniquement sur offre publiée

Ce cas est équivalent au cas 3.

**Backend**

- Test : `refuse une offre qui n'est pas publiée`

```ts
expect(response.status).toBe(409);
expect(response.body.error.code).toBe("OFFER_NOT_PUBLISHED");
```

**Frontend**

Aucun test.

## Tests sur les candidatures ne correspondant à aucun cas

### Backend

Fichier : [backend/tests/applications.test.ts]()

#### Validation de la longueur du message

Test : `refuse un message de plus de 1000 caractères`

```ts
expect(response.status).toBe(400);
expect(response.body.error.code).toBe("INVALID_MESSAGE");
```

#### Identifiant d’offre invalide

Test : `refuse un identifiant d'offre invalide`

```ts
expect(response.status).toBe(400);
expect(response.body.error.code).toBe("INVALID_OFFER_ID");
```

#### Lecture d’une candidature liée à une offre archivée

Test : `retourne aussi une candidature liée à une offre archivée`

```ts
expect(response.status).toBe(200);
expect(response.body).toEqual([
  expect.objectContaining({
    offerId: OFFER.PDF_REPORTS,
    offerStatus: "ARCHIVED",
  }),
]);
```

#### Refus de la liste des candidatures pour les profils non étudiants

Test paramétré : `refuse le profil %s`

```ts
expect(response.status).toBe(403);
expect(response.body.error.code).toBe("FORBIDDEN");
```

#### Réutilisation de la ligne retirée

Le test `réactive une candidature retirée sans créer de doublon` correspond déjà au cas 7, mais vérifie également la mise à jour du message :

```ts
expect(response.body).toMatchObject({
  id: APPLICATION.INES_BILLING_API,
  message: "Nouvelle motivation",
  status: "IN_PROGRESS",
});
```

### Frontend

#### Annulation du retrait

Fichier : [frontend/tests/ApplicationsWithdraw.test.tsx]()

Test : `n'envoie rien si le retrait est annulé`

```ts
expect(fetchMock).toHaveBeenCalledTimes(1);
```

Ce test vérifie que seul le chargement initial est effectué et qu’aucune requête de retrait n’est envoyée.

#### État vide

Fichier : [frontend/tests/ApplicationsPage.test.tsx]()

Test : `affiche un état vide`

```ts
expect(await screen.findByText("Aucune candidature à afficher.")).toBeInTheDocument();
```

#### Déconnexion en cas de session expirée

Test : `déconnecte sur une session expirée`

```ts
await waitFor(() => expect(onUnauthorized).toHaveBeenCalled());
```

#### Présence d’un bouton de candidature pour une offre retirée

Fichier : [frontend/tests/OffersPage.test.tsx]()

Test : `replace dans les offres disponibles une offre retirée`

```ts
expect(within(availableSection.parentElement!).getByText("Candidature retirée")).toBeInTheDocument();
expect(within(availableSection.parentElement!).getByRole("button", { name: "Candidater" }))
  .toBeInTheDocument();
```

#### Séparation des offres disponibles et déjà candidatées

Test : `sépare les offres disponibles des offres déjà candidatées`

```ts
expect(within(availableSection.parentElement!).getByText("Offre disponible")).toBeInTheDocument();
expect(within(availableSection.parentElement!).getByRole("button", { name: "Candidater" }))
  .toBeInTheDocument();
expect(within(appliedSection.parentElement!).getByText("Offre déjà candidatee")).toBeInTheDocument();
expect(within(appliedSection.parentElement!).getByText("Retenue")).toBeInTheDocument();
expect(within(appliedSection.parentElement!).queryByRole("button", { name: "Candidater" }))
  .not.toBeInTheDocument();
```

User: Ajoute dans backend/tests/applications.test.ts un test pour les 3 manques les plus importants, à toi de juger.
   Utilise les helpers existants (tests/helpers/testApp.ts, testDatabase.ts) et le style
   des tests déjà présents. Ne modifie pas le code de l'application, seulement les tests.

Copilot: Je vais ajouter trois tests ciblés dans le fichier existant : candidature sans message, accès sans session et retrait d’un identifiant numérique inexistant, puis lancer la suite backend concernée.

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\controllers\\applications.controller.ts"
}

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\tests\\helpers\\testApp.ts"
}

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\services\\applications.service.ts"
}

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\tests\\helpers\\testDatabase.ts"
}

Edit []()

Ran terminal command: npm run test -w backend -- tests/applications.test.ts

La première exécution est bloquée par la politique PowerShell sur le lanceur `npm`; je relance la même validation via `npm.cmd`, sans changer le test ni l’application.

Ran terminal command: npm.cmd run test -w backend -- tests/applications.test.ts

Ran terminal command: git --no-pager diff -- backend/tests/applications.test.ts

Ran terminal command: git --no-pager status --short

Ajout de 3 tests dans [backend/tests/applications.test.ts]() :

- candidature sans message : `201`, `message: null`, `IN_PROGRESS`
- candidature sans session : `401`, `UNAUTHENTICATED`
- retrait d’une candidature inexistante : `404`, `APPLICATION_NOT_FOUND`

Validation réussie :

```text
20 tests passed
```

Aucun fichier applicatif modifié.

User: Ajoute dans backend/tests/applications.test.ts un test qui vérifie que GET /applications
   pour un étudiant ne renvoie aucune candidature d'un autre étudiant (vérifier la liste
   complète, pas arrayContaining). Ne modifie que les tests.

Copilot: Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\mappers\\application.mapper.ts"
}

Search for `LUCAS_FLEET_APP|applications|FLEET_APP`

Search for `findByStudent|SELECT`

Read [](), lines 157 to 220
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\db\\seed\\offersData.ts",
  "view_range": [
    157,
    220
  ]
}

Read [](), lines 1 to 80
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\src\\db\\seed\\offersData.ts",
  "view_range": [
    1,
    80
  ]
}

Edit []()

Ran terminal command: npm.cmd run test -w backend -- tests/applications.test.ts

Ajouté dans [backend/tests/applications.test.ts]() :

- Test : `ne retourne pas les candidatures d'un autre étudiant`
- Vérifie la liste complète avec `toEqual`
- Vérifie que Lucas reçoit uniquement sa candidature

Validation :

```text
21 tests passed
```

User: Crée le fichier docs/semaine-3/matrice-tracabilite.html : une matrice de traçabilité
entre les exigences EF-32, EF-33, RG-03 et les tests du projet.

Style : reprends la structure, la mise en page et le style CSS de la page HTML fournie
plus bas (code du professeur). Ne reprends pas son contenu, seulement sa forme.

Contraintes :
- Un seul fichier HTML autonome (CSS et éventuel JS dans le fichier), aucune ressource
  externe (pas de CDN, pas de police en ligne) : le réseau est bloqué.
- Ne modifie aucun autre fichier.
- Source des données : la section « Couverture des exigences » de docs/semaine-3/semaine-3.md.
  Recopie-la fidèlement, n'invente aucun test ni aucune assertion.
  Vérifie chaque nom de test dans backend/tests/applications.test.ts et frontend/tests/*.test.tsx,
  et signale-moi tout nom qui ne correspond pas exactement.

Contenu de la page :
1. Un en-tête : titre « Matrice de traçabilité — Candidatures (EF-32, EF-33, RG-03) », date,
   légende des couvertures (Couvert / Partiel / Absent) avec leur définition :
   « Couvert = une assertion porte sur le résultat attendu ».
2. Un tableau avec les colonnes : #, Exigence, Cas à vérifier, Test (fichier et nom),
   Assertions utiles (en police monospace), Couverture avant, Couverture après séance.
   Les couvertures sont affichées sous forme de badges colorés (vert / orange / rouge),
   avec aussi le texte, pas uniquement la couleur.
   Les lignes dont la couverture a changé pendant la séance sont mises en évidence.
3. Un résumé chiffré : nombre de cas Couverts / Partiels / Absents, avant et après.
4. Une section « Manques restants » et une section « Tests hors exigence ».
5. Un pied de page : « Commande de vérification : npm run check » et le résultat que je
   te donne : [COLLEZ ICI VOTRE RÉSULTAT, ex. lint OK, typecheck OK, X tests backend
   et Y tests frontend réussis, build OK].

Quand c'est fait, dis-moi comment l'ouvrir dans le navigateur pour la vérifier.

Code HTML du professeur (modèle de style) est dans le projet

Copilot: Je vais relever la section source et les styles du modèle, vérifier les noms de tests, puis générer uniquement le nouveau fichier HTML autonome.

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\semaine-3\\semaine-3.md"
}
Tool execution failed: Path does not exist

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\semaine-3\\matrices_exemples\\matrice_cdc_interview.html"
}

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\semaine-3\\matrices_exemples\\matrice_interview_cdc.html"
}

Search for `it\("|it\.each\(|describe\("`

Read [](), lines 1 to 180
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\semaine-3\\matrices_exemples\\matrice_cdc_interview.html",
  "view_range": [
    1,
    180
  ]
}

Search for `Couverture des exigences|EF-32|EF-33|RG-03|Tests hors exigence`

Find files matching `docs/semaine-3/**`

Le fichier source demandé [docs/semaine-3/semaine-3.md]() n’existe pas dans le dépôt inspecté. Le dossier contient uniquement les fichiers d’exemple HTML.

Comme tu demandes de recopier fidèlement sa section « Couverture des exigences » sans inventer de données, peux-tu fournir ce fichier ou coller cette section ?

User: #attachment:Pasted text #1  Le voila pardon

Copilot: Je vais utiliser le texte joint comme source de vérité, vérifier les noms de tests dans le dépôt, puis créer uniquement la matrice HTML demandée.

Read []()
Completed with input: {
  "path": "C:\\Users\\Rayan\\AppData\\Roaming\\Code\\agentSessionData\\6cfda3c0-ad44-40c4-bcd4-c923a7460146\\attachments\\d6601835-2120-49b3-85b7-1852c231d2fb\\Pasted text #1.txt"
}

Read [](), lines 1 to 60
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\semaine-3\\matrices_exemples\\matrice_interview_cdc.html",
  "view_range": [
    1,
    60
  ]
}

Search for `it\("|it\.each\(`

Read [](), lines 1 to 180
Completed with input: {
  "path": "C:\\Users\\Rayan\\AppData\\Roaming\\Code\\agentSessionData\\6cfda3c0-ad44-40c4-bcd4-c923a7460146\\attachments\\d6601835-2120-49b3-85b7-1852c231d2fb\\Pasted text #1.txt",
  "view_range": [
    1,
    180
  ]
}

Read [](), lines 181 to 344
Completed with input: {
  "path": "C:\\Users\\Rayan\\AppData\\Roaming\\Code\\agentSessionData\\6cfda3c0-ad44-40c4-bcd4-c923a7460146\\attachments\\d6601835-2120-49b3-85b7-1852c231d2fb\\Pasted text #1.txt",
  "view_range": [
    181,
    344
  ]
}

Search for `Couverture des exigences|EF-32|EF-33|RG-03|avant|après|Tests hors|Manques`

La source jointe contient 14 cas et indique que le cas 12 était encore partiel. Le dépôt contient maintenant le test exact ajouté précédemment (`ne retourne pas les candidatures d'un autre étudiant`) ; je conserverai fidèlement les couvertures de la source et signalerai cet écart dans la page et dans ma réponse.

Edit []()

Search for `<title>|Matrice de traçabilité|Couverture des exigences|Manques restants|Test...`

Ran terminal command: git --no-pager diff --stat -- docs/semaine-3/matrice-tracabilite.html; git --no-pager status --short -- docs/semaine-3/matrice-tracabilite.html

Fichier créé : [docs/semaine-3/matrice-tracabilite.html]()

Il est autonome, sans ressource externe, et aucun autre fichier n’a été modifié.

Écarts de noms détectés dans la source :

- `retourne toutes les candidatures… y compris retirées` ne correspond pas exactement au test réel : `retourne toutes les candidatures de l'étudiant, y compris retirées`.
- `Retirée affiché` n’est pas un nom de test exact.
- Le dépôt contient désormais `ne retourne pas les candidatures d'un autre étudiant`, absent de la section source.

Pour l’ouvrir : double-clique sur le fichier dans l’explorateur VS Code, ou clic droit → **Open with Default Browser**.

User: Vérifiez que le test « refuse les profils qui ne sont pas étudiants » teste bien l’admin **et** le contact.

Copilot: Search for `refuse les profils qui ne sont pas étudiants|applyAs\("(ADMIN|CONTACT)"|it\.each`

Non. Dans [backend/tests/applications.test.ts:193](), le test utilise uniquement :

```ts
const response = await applyAs("ADMIN", 1, OFFER.FLEET_APP);
```

Le contact n’est donc pas testé par ce test. Le contact apparaît seulement dans un autre test paramétré concernant `GET /applications`, pas la création d’une candidature.

User: Crée docs/semaine-3/matrice-guides-senseurs.html.

Style : reprends la structure, la mise en page et le CSS de la page HTML du professeur
fournie plus bas. Ne reprends que la forme, pas le contenu.

Contraintes : un seul fichier autonome (CSS/JS inclus), aucune ressource externe,
ne modifie aucun autre fichier. Source unique des données : les sections « Inventaire »
et « Audit des guides » de docs/semaine-3/semaine-3.md. Recopie fidèlement, n'invente rien.

Contenu :
1. En-tête : « Harnais agentique — Guides, senseurs et bonnes pratiques Web 2 », date.
2. Partie A — Classification : la grille 2×2 (Guide/feedforward vs Senseur/feedback ×
   Inférentiel vs Computationnel), avec dans chaque case les mécanismes trouvés ;
   une case sans mécanisme affiche « Aucun mécanisme trouvé ».
   Puis le tableau détaillé : mécanisme, emplacement, rôle, exemple concret,
   exécuté pendant la séance ou seulement lu. Puis les corrections apportées à Copilot.
3. Partie B — Audit Web 2 : le tableau des 5 attentes (attente et source du cours,
   guide et passage, correspondance, écart ou ajout proposé). La correspondance est un
   badge coloré avec son texte (Oui vert, Partielle orange, Non rouge, Contradiction violet).
   Puis les problèmes trouvés dans les guides, les recommandations par priorité et les limites.
4. Un résumé chiffré : nombre d'attentes Oui / Partielle / Non.

Ensuite, liste-moi les éléments que tu n'as pas pu reprendre tels quels.

Code HTML du professeur joint

Copilot: Je vais extraire fidèlement les sections demandées et le style du modèle, puis créer uniquement le fichier HTML autonome.

Read [](), lines 1 to 344
Completed with input: {
  "path": "C:\\Users\\Rayan\\AppData\\Roaming\\Code\\agentSessionData\\6cfda3c0-ad44-40c4-bcd4-c923a7460146\\attachments\\d6601835-2120-49b3-85b7-1852c231d2fb\\Pasted text #1.txt",
  "view_range": [
    1,
    344
  ]
}

Read [](), lines 1 to 10
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\analyse\\matrices_exemples_cours\\matrice_cdc_interview.html",
  "view_range": [
    1,
    10
  ]
}

Read [](), lines 1 to 10
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\analyse\\matrices_exemples_cours\\matrice_interview_cdc.html",
  "view_range": [
    1,
    10
  ]
}

Find files matching `docs/semaine-3/semaine-3.md`

Read [](), lines 1 to 220
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\semaine-3\\semaine-3.md",
  "view_range": [
    1,
    220
  ]
}

Read [](), lines 100 to 176
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\semaine-3\\semaine-3.md",
  "view_range": [
    100,
    176
  ]
}

Edit []()

Ran terminal command: git --no-pager status --short -- docs/semaine-3/matrice-guides-senseurs.html

Search for `Harnais agentique|Partie A|Partie B|Corrections apportées|Problèmes trouvés|R...`

Fichier créé : [docs/semaine-3/matrice-guides-senseurs.html]()

Aucun autre fichier n’a été modifié.

Éléments non repris strictement tels quels :

- La mise en page exacte du modèle professeur a été adaptée pour présenter la grille 2×2 et les deux matrices demandées.
- Le modèle contient des fonctionnalités de navigation et de lecture de documents sources ; elles n’ont pas été reprises car aucune ressource externe ou autre page n’était nécessaire.
- Les données ont été reprises depuis [docs/semaine-3/semaine-3.md](), sans ajout de contenu d’audit.

User: Crée docs/semaine-3/matrice-tracabilite-tests.html.

Même style que la page du professeur fournie plus bas (forme uniquement), un seul fichier
autonome, aucune ressource externe, ne modifie aucun autre fichier.
Source unique : les sections « Couverture des exigences » et « Modifications et vérification »
de docs/semaine-3/semaine-3.md. Recopie fidèlement. Vérifie chaque nom de test dans
backend/tests/applications.test.ts et frontend/tests/*.test.tsx et signale tout écart.

Contenu :
1. En-tête : « Traçabilité des tests — Candidatures (EF-32, EF-33, RG-03) », date, légende :
   Couvert = une assertion porte sur le résultat attendu ; Partiel ; Absent.
2. Tableau des 14 cas : #, exigence, cas, test (fichier et nom), assertions (monospace),
   couverture avant, couverture après séance (badges colorés avec texte). Mets en
   évidence les lignes qui ont changé.
3. Résumé chiffré Couvert / Partiel / Absent, avant et après.
4. Tests ajoutés (avec le défaut qui les ferait échouer), manques restants,
   tests hors exigence.
5. Pied de page : résultats de npm run check (lint 0 erreur 0 avertissement, typecheck OK,
   135 tests backend et 55 frontend réussis, build OK).

Code HTML du professeur joint

Copilot: Je vais reprendre les deux sections sources, vérifier les noms exacts dans les tests, puis remplacer uniquement le fichier demandé.

Read [](), lines 45 to 145
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\docs\\semaine-3\\semaine-3.md",
  "view_range": [
    45,
    145
  ]
}

Read , lines 20 to 250
Completed with input: {
  "path": "C:\\Users\\Rayan\\Downloads\\HE Vinci\\BLOC 3\\4 - IA 4devs\\6 - Projet\\WORKSPACE\\BINV32202-groupe-14\\backend\\tests\\applications.test.ts",
  "view_range": [
    20,
    250
  ]
}

Search for `it\("|it\.each\(`

La source actuelle indique quatre tests ajoutés (dont le test de liste complète du cas 12) et corrige le cas 4 en « Partiel » : le test réel ne couvre que l’administrateur. Je vais refléter ces valeurs, sans reprendre les anciennes valeurs de la matrice précédente.

Edit []()

Ran terminal command: git --no-pager status --short -- docs/semaine-3/matrice-tracabilite-tests.html

Search for `Traçabilité des tests|Résumé chiffré|Tests ajoutés|Manques restants|Tests hor...`

Fichier créé : [docs/semaine-3/matrice-tracabilite-tests.html]()

- Fichier autonome, CSS inclus, aucune ressource externe.
- Seul ce fichier a été ajouté.
- Les 14 cas, les tests ajoutés, les manques, les tests hors exigence et les résultats de `npm run check` sont inclus.
- Les écarts de noms de tests sont signalés dans la section « Vérification des noms de tests ».

Résumé calculé depuis la source :

- Avant : 7 Couvert, 4 Partiel, 3 Absent.
- Après : 10 Couvert, 3 Partiel, 0 Absent.