Plan : Ajouter le cristal de glace
Ajouter un nouvel objet rare qui ralentit les objets tombants à 35 % pendant 4 secondes, puis restaure automatiquement leur vitesse normale.

Étapes

Modifier config.js pour ajouter :

le type GLACE ;
une couleur bleu clair ;
une rareté inférieure à celle du doré ;
une durée de 4 secondes ;
la durée du ralentissement ;
Modifier jeu.js pour :

ajouter le chronomètre chronoGlace ;
sélectionner la glace sans chevaucher la probabilité du doré ;
activer l’effet lors de la capture ;
ralentir le déplacement et la rotation des objets ;
laisser automatiquement les vitesses normales revenir après 4 secondes.
Modifier dessin.js pour dessiner la glace en bleu clair avec de petits éclats.

Modifier audio.js pour ajouter un son de capture utilisant Web Audio.

Afficher le temps restant avec le système d’affichage existant, sans ajouter de bibliothèque ni de ressource externe.

Comment vérifier dans le jeu :

Exécuter node --check sur chaque fichier JavaScript modifié.
Ouvrir directement index.html.
Vérifier que la glace est plus rare que le doré, ralentit les objets présents et nouvellement créés, reste active 4 secondes, puis que les vitesses reviennent à la normale.
Vérifier que les bombes, les cristaux normaux, les vies et le combo fonctionnent toujours.
Aucun code n’a été modifié.