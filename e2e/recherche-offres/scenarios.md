# Scénarios E2E — recherche d'offres

Les scénarios utilisent la base de démonstration initialisée avec `npm run setup`
(ou recréée avec `npm run db:reset`). Ils vérifient la recherche dans l'interface
avec les règles retenues pour EF-30 : recherche dans le titre uniquement,
insensible à la casse, espaces périphériques ignorés, et visibilité des offres
appliquée selon le rôle.

| Numéro | Scénario | État initial | Actions dans l'interface | Résultat attendu |
|---|---|---|---|---|
| 1 | Recherche nominale avec résultat et vérification de la visibilité | La base de démonstration 2026-2027 est initialisée. Lucas Dupont a le rôle **étudiant**. L'offre **« Application React de gestion de flotte »**, de la deuxième période (février à mai 2027), est **publiée** et Lucas y a déjà une candidature. Parmi les offres publiées visibles par Lucas, c'est la seule dont le titre contient « application ». L'offre **« Migration d'une application vers le cloud »**, également de la deuxième période, est **attribuée** et donc non publiée; Lucas n'a pas de candidature sur cette offre. | Sur la page **Connexion de démonstration**, choisir **Lucas Dupont** dans la colonne **Étudiants**. Ouvrir la page **Offres de stage**, puis saisir `application` dans **Recherche par titre**. Les résultats se mettent à jour pendant la saisie, sans appuyer sur Entrée. | Une seule offre correspondante est affichée : **« Application React de gestion de flotte »**, dans **Offres déjà candidatées**. **« Migration d'une application vers le cloud »** n'est pas affichée, même si son titre contient le terme recherché, car un étudiant ne voit pas les offres non publiées. |
| 2 | Recherche sans résultat | La base de démonstration est initialisée. Lucas Dupont a le rôle **étudiant**. Aucune offre n'a `zzz-inexistant` dans son titre. | Sur la page **Connexion de démonstration**, choisir **Lucas Dupont** dans la colonne **Étudiants**. Ouvrir la page **Offres de stage**. Avant la saisie, la page **Offres de stage** affiche au moins une offre. Saisir `zzz-inexistant` dans **Recherche par titre**. Les résultats se mettent à jour pendant la saisie, sans appuyer sur Entrée. | Aucune offre ni carte d'offre n'est affichée. L'interface affiche le message **« Aucune offre ne correspond à votre recherche. »** |

Le scénario 1 vérifie une recherche par sous-chaîne et confirme que la recherche ne
contourne pas la visibilité. Le scénario 2 vérifie le résultat observable d'une
recherche valide sans correspondance.
