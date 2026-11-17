# Bilan semaine 4

Conversations : `conversation-4a-audit.md`, `conversation-4b-tdd.md`, `conversation-4c-hook.md`

## 1. Audit des tests (Test Gap Audit)

On a installé le skill dans `.github/skills/test-gap-audit/` et on l'a lancé sur les tests des candidatures avec nos décisions métier.

Ce qu'on a observé :
- Copilot a bien lu le skill et n'a rien modifié.
- Le script `coverage_map.py` n'a pas marché dans Copilot (pas de Python dans la sandbox). On l'a lancé nous-mêmes dans le terminal et ça marche.
- Le script se trompe parfois : il dit que `applications.service.ts` n'est pas testé alors qu'il l'est via les tests d'API. Il compare juste les noms de fichiers, donc c'est une piste, pas une preuve.

| Cas | Test existant | Conclusion |
|---|---|---|
| Doublon si la candidature est Retenue / Non retenue | ligne 216, seulement "En cours" | Manque confirmé |
| Un contact ne peut pas candidater | ligne 193, seulement l'admin | Manque confirmé (déjà vu semaine 3) |
| Retrait puis nouvelle candidature | lignes 87 et 223, testés séparément | Écarté (déjà couvert en 2 tests) |
| Autres statuts d'offre non publiée | ligne 200, seulement SUBMITTED | Écarté (le code teste juste `!== "PUBLISHED"`, un cas suffit) |
| Offre inexistante (404) | aucun | Manque, mais le skill ne l'a pas vu |
| Libellé "Non retenue" | aucun | Manque, mais le skill ne l'a pas vu |

Le skill a trouvé des choses en plus, mais il a aussi raté 2 manques qu'on avait trouvés nous-mêmes en semaine 3.

**Test ajouté** : doublon refusé pour une candidature Retenue et Non retenue. Piège : les candidatures Retenue / Non retenue du seed sont sur une offre non publiée, donc on a demandé de vérifier le code d'erreur `APPLICATION_EXISTS` et pas seulement le 409 (sinon le test passerait à cause de `OFFER_NOT_PUBLISHED`). Résultat : 23 tests OK, pas de bug trouvé.

## 2. TDD

On a installé le skill TDD, ajouté la consigne de pause dans son `SKILL.md` et la règle dans `copilot-instructions.md`.

On a demandé la recherche sans parler du skill ni des tests. Copilot a quand même lu le skill, écrit les tests d'abord et s'est arrêté pour demander notre accord. Aucun fichier de `src/` n'avait été modifié.

**On n'a pas validé tout de suite.** Problèmes trouvés dans ses tests :
- le test de visibilité passait toujours, car aucune offre non publiée ne contenait le mot cherché. On a demandé un mot ("application") présent dans une offre publiée et une non publiée ;
- pas de test backend pour "aucun résultat" ;
- pas de test pour "expression entière" : on a ajouté "rest api" qui doit donner une liste vide ;
- il avait inventé une règle (`q` répété → 400). On l'a acceptée car c'est pareil que pour `period`, mais dans un test séparé.

**Test vu en échec puis en réussite** :
- avant : `expected [ 7, 5, 1, 3 ] to deeply equal [ 1 ]` (la recherche n'existait pas, toutes les offres revenaient) ;
- après : le test passe.

Au total : 5 tests backend et 2 frontend en rouge, puis 23 et 10 en vert. Le test "recherche vide" passait déjà avant, c'est normal puisque sans recherche tout s'affiche.

## 3. Recherche

Dans le code : la requête SQL est paramétrée et les caractères `%` et `_` sont échappés.

Testé dans le navigateur en étudiant : `flotte`, `FLOTTE`, `   flotte   `, `rest api`, `zzz`, `application`, `application` + P1, champ vide. Tout marche comme prévu.

`npm run check` : lint OK, typecheck OK, 143 tests backend et 57 frontend OK, build OK.

Problèmes restants :
- l'échappement de `%` et `_` n'est pas testé ;
- les accents ne sont pas gérés (hors périmètre).

## 4. Hook (optionnel)

Événement : `preToolUse`, le script est lancé avant chaque appel d'outil.

- "Exécute git status" : marche normalement.
- "Supprime demo-protected.txt" : Copilot a lancé `Remove-Item ...` et on voit `Denied by preToolUse hook`. Le fichier est toujours là.
- Test simulé : `rm demo-protected.txt` donne `deny`, `git status` donne `{}`.

C'est bien le hook qui a bloqué, pas Copilot qui a refusé de lui-même.

Limite : le hook cherche juste du texte, il ne bloquerait pas une suppression en Python par exemple. On ne l'a pas commité car c'est une démo.

Différence skill / hook : un skill est une consigne que l'IA peut ne pas suivre ; un hook est un programme qui s'exécute à chaque fois.

## Crédits IA

69 → 75 sur 200
