# Ghost Legs



![Alt text](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtk5NlIFoFEc18J0dHI8hLuJfRJ4Zrwv2Y3A&s "Jeu de Ghost leg dans une station de métro")

![Alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Logo_Universit%C3%A9_Clermont-Auvergne_%28partenariat_Wikim%C3%A9dia%29.png/640px-Logo_Universit%C3%A9_Clermont-Auvergne_%28partenariat_Wikim%C3%A9dia%29.png "UCA")

<u>**Par --**</u>


# Introduction au puzzle

Ghost leg est une sorte de jeu de lotterie populaire en Asie. Il permet d'associer une valeur à une autre, permettant de répartir des objets parmi un groupe de personne, créer des équipes ou bien de savoir quel plat manger pour quel repas.

Le principe du jeu est simple à comprendre. Le jeu commence par une séquence de valeurs (chiffres, noms, objets). Chaque valeur est reliée en ligne droite verticale à une valeur d'une deuxième séquence, située plus bas. Les valeurs sont donc reliées par des *tubes*. Cependant, chaque ligne verticale peut être reliée à une autre par une ou plusieures lignes horizontales, donc un autre *tube*, créant un lien. Une partie débute à la première valeur de la première séquence. Il suffit ensuite de longer le *tube* correspondant à cette valeur jusqu'à tomber sur un *tube* horizontal, qu'il faut emprunter afin de changer de *tube* vertical, il suffit de répéter de procédé jusqu'à atteindre un valeur de la deuxième séquence, maintenant associée à la première valeur de la première séquence. Répéter cela pour toutes les valeurs de la première séquence pour associer toutes les valeurs.
Une grille peut ainsi ressembler à la suivante :

![Alt text](https://lh4.googleusercontent.com/proxy/1RmSf1FENgWF0JCR6HyhKDudR8msJdDA_MSBTckTN1CcoHkd-V9rj8gjaVkcmH_CBqDoLsnNaL30hycgHp7EL_p01tcEEcEcmigc3szdrK4KRjQFKfCOD8yhWA "Grille")

Le problème python à traiter est donc de créer un programme qui puisse automatiquement, selon une grille donnée, associer les valeurs des deux séquences.
Cela revient à créer une sorte d'intelligence artificielle jouant à la place d'un humain.

### Les données auxquelles nous disposons sont donc :
- h et w, respectivement la hauteur et la largeur de la grille (sachant qu'un *tube* horizontal possède une largeur 2 dans cette grille)
- h lignes où la première et dernière représentent les première et deuxième séquences et les autres les *tubes* verticaux et horizontaux.

Une précision est apportée pour ce problème : un *tube* vertical ne peut être relié, à un même niveau, qu'à un seul *tube* horizontal. Autrement dit, la situation : --|-- ne peut pas se produire.


### Les données à renvoyer sont donc :
- L'association des valeurs des deux séquences après une partie, en commençant par la valeur de la première séquence et en séparant chaque association par un retour à la ligne.


# Résolution du puzzle

## Résumé de la méthode

On peut facilement transformer la grille en une matrice, pour une compréhension plus facile pour un humain. En python, cela peut se réaliser avec une liste de listes, où chaque élément est soit une valeur d'une des deux séquence, un *tube* vertical ou horizontal, ou un espace vide (ces derniers ne seront cependant pas pris en compte par l'algorithme). On peut ainsi, pour chaque valeur de la première séquence parcourir le chemin "traditionnel" en regardant les cases adjacentes de la grille.

## Transposition en python

La matrice, comme dit précédemment est créée à partir d'une liste de listes. 
On créé donc une liste vide, qui va contenir les autres listes.
On initialise les variables de réponses et deux listes contenant les valeurs des première et deuxième séquences
Dans la boucle des entrées de valeurs(celles permettant de donner chaque ligne), on sauvegarde chaque caractère de la chaîne d'entrée et les dispose sur la ligne de notre grille correspondant à l'itération de la boucle, et on ajoute les valeurs des première ou deuxième séquences si l'on se trouve sur la prmière ou dernière ligne.



Pour chaque tour, la méthode est la suivante : 
- Commencer à la valeur de la première séquence en y plaçant un "curseur".
- **Si** un *tube* horizontal se trouve à droite ou à gauche du curseur, déplacer le curseur le long de ce *tube*
- Faire descendre le curseur
- Ajouter la valeur de la première séquence suivie de la valeur de la deuxième séquence et d'un caractère de retour à la ligne dans la chaîne de caractères de réponse.


## Code python de cette solution 

Mettre le code




## Comparaison avec un autre Codingamer

Le code donné par l'utilisateur m3m0ry sur Codingame propose une solution différente du parcours classique de la grille.
En effet, au lieu de faire descendre un curseur à la fois, tous seront descendu en même temps et deux curseurs échangront leur place à la rencontre d'un *tube* horizontal. La réponse commencera par le point de départ du curseur, soitsa valeur correspondante, suivi par son point d'arrivé, soit la valeur sur laquelle il se trouve.


Mettre son code


La stratégie de faire descendre tous les curseurs en même temps est intéressante, car elle permet un gain de temps pour un joueur humain.
Un autre détail attirant particulièrement l'attention est le fait de s'approprier le fonctionnement de codingame. En effet les inputs des différentes lignes sont dispersés pour, dans un premier temps créer la liste top, parcourir la grille en second lieu, et enfin créer la liste bot.

# Bilan

Ce puzzle développe la réflexion sur la transformation d'un travail humain en algorithme, puis en un programme. Cela permet d'exprimer explicitement sa stratégie personnelle pour un tel jeu. Ce puzzle peut constituer une sorte introduction à la création d'intelligence artificielle non-générative capables de réaliser certaines missions, pour des jeux ou situations réelles.