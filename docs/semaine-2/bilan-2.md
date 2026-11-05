# Bilan semaine 2

## Choix (planification)
- Utilisé le mode Plan de Copilot, en 3 étapes : candidater, consulter, retirer.
- Recandidater après un retrait : oui, en **réactivant l'ancienne candidature**. Refusé seulement si une candidature En cours, Retenue ou Non retenue existe déjà sur l'offre. Avantage : pas de doublons dans l'interface. Inconvénient : on perd l'historique du nombre de recandidatures.
- Retrait possible uniquement si le statut est En cours (Retenue et Non retenue = décisions prises).
- Message facultatif, 1 000 caractères maximum.
- Les candidatures restent visibles même si l'offre est archivée.
- Pas de filtre par année : toutes les candidatures sont affichées (limite assumée).
- Confirmation avant un retrait.
- Pas de migration : le schéma existait déjà.
- Le retrait ne supprime rien : route `POST /applications/:applicationId/withdraw` au lieu du `DELETE` proposé, car le nom était trompeur.

## Résultat
- Fonctionne : candidater (avec ou sans message), consulter ses candidatures avec les 4 statuts, retirer une candidature En cours.
- Les contrôles sont faits côté serveur : rôle étudiant, offre publiée, propriétaire de la candidature, statut En cours.
- Difficulté : après les 3 étapes, le bouton « Candidater » restait affiché et un 2e clic donnait une erreur 409. Corrigé avec une demande (prompt) de plus.
- Limites : pas de filtre par année sur « Mes candidatures », confirmation de retrait faite avec la boîte de dialogue du navigateur (simple mais peu personnalisable).

## Modifications
- Backend : du nouveau pour les endpoints `/offers/:offerId/applications` & `/applications`.
- Frontend : nouveaux boutons + formulaire de message & nouvelle page.
- Correction UX : séparation des offres "candidatables" et celles avec le cas pas possible.
- Répondu aux questions demandées par l'agent sur les limites du CDC.

## Validation fonctionnelle
- Testé à la main dans le navigateur : candidature avec/sans message, rechargement, retrait & différents étudiants.
- Problème repéré en testant : après une candidature, le bouton restait et un 2e clic provoquait une erreur 409.
- Correction : 2 sections sur la page des offres (« Offres disponibles » et « Offres déjà candidatées »), l'offre change de section tout de suite, bouton désactivé pendant l'envoi, message clair si 409 en secours (backend protégé dans tous les cas). Une candidature retirée remet l'offre dans les offres disponibles.
- Non vérifié : effet de l'acceptation ou refus de candidature sur l'UI.

## Qualité
- Copilot a bien réutilisé l'architecture existante (routeur / service / repository côté backend, hooks et services côté frontend).
- Pendant l'étape 1, Copilot a cassé quelque chose par accident : une adresse qui n'existe pas renvoyait « non connecté » (401) au lieu de « introuvable » (404). Les tests complets l'ont détecté et Copilot l'a réparé.
- Le serveur reste la vraie protection contre les doublons. La correction UX évite seulement des requêtes inutiles.
- Relu les diffs, que les fichiers importants et les grosses lignes car beaucoup trop pour le temps qu'on a...

## Tests et commandes
- Tests ajoutés : backend + frontend pour les modifs et nouveaux.
- 131 tests backend et 53 tests frontend réussis, avec typecheck, lint et build réussis. Jamais cela a réussi chez l'agent et pas chez nous. Pareil pour `npm run check`
- Nos tests préférés: tester directement le site, tous les sénérios imaginés fonctionnent.
- Crédits IA consommés pour cette séance: 22,7/200 soit 12%.