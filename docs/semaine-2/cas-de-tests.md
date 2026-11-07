# Cas de tests manuels (end-to-end)

| # | Cas testé | Profil | Résultat attendu | Résultat obtenu |
|---|---|---|---|---|
| 1 | Candidater à une offre publiée sans message | Étudiant A | Candidature créée, statut « En cours » | ✅ OK |
| 2 | Candidater à une offre publiée avec message | Étudiant A | Candidature créée, message enregistré | ✅ OK |
| 3 | Recharger la page | Étudiant A | La candidature et son statut sont toujours affichés | ✅ OK |
| 4 | Retirer une candidature en cours | Étudiant A | Statut « Retirée » | ✅ OK |
| 5 | Retirer une candidature déjà traitée | Étudiant A | Refusé | ⚠️ Non testé |
| 6 | Se connecter avec un 2ᵉ étudiant | Étudiant B | Ne voit pas les candidatures de A | ✅ OK |
| 7 | Candidater avec un autre rôle | Entreprise / prof | Refusé par le serveur | ⚠️ Non testé |
| 8 | Candidater à une offre non publiée | Étudiant A | Refusé par le serveur | ⚠️ Non testé |
| 9 | Candidater deux fois à la même offre | Étudiant A | 409 | ✅ OK (Impossible via l'interface pour éviter les erreurs) |
| 10 | Candidater à nouveau après un retrait | Étudiant A | Tout à fait possible, statut changé et non pas une nouvelle entrée | ✅ OK |

## Cas non testés et pourquoi
- **Cas 5** : aucune candidature « traitée » n'existe, car la sélection d'un candidat est hors périmètre.
  Il faudrait modifier le statut en base ou passer par un test automatique.
- **Cas 7 et 8** : impossibles à déclencher depuis l'interface (le bouton n'est pas affiché).
  Ils seraient vérifiables via l'API (`backend/http/*.http`) ou par les tests backend.