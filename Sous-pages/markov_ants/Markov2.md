<img src="https://www.isima.fr/wp-content/uploads/2023/01/Logo_ISIMA_INP.jpg" alt="Isima" width="200"/>
<img src ="https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL2xyL2ZsMzY4OTgwMzg1MDUtaW1hZ2UuanBn.jpg" alt="Ant" width = "500">

**Par Guillaume BEUVOT, étudiant en Prep'ISIMA 1, 2024/2025**

# Introduction au puzzle

Situation initiale : une fourmi placée sur un terrain part cherche de la nourriture, située en dehors du terrin. Seul problème : la fourmi qui reçoit la tâche d'aller chercher la nourriture est aveugle et la direction dans laquelle elle avance est aléatoire et peut changer chaque seconde. 
Chaque seconde, elle peut avancer au Nord, à l'Ouest, au Sud ou à l'Est, chaque direction ayant la même probabilité que les autres.
La distance parcourue chaque seconde reste cependant la même d'une seconde à l'autre.

En étant aveugle, la fourmi réalise un parcours suivant une chaîne de Markov : à chaque pas de temps, la fourmi possède la même probabilité d'aller dans chaque direction (soit 25% de chance pour chaque direction).

Le problème à traiter en langage C consiste, pour une fourmi et un terrain donnés sous forme de chaîne de caractères, de trouver le temps moyen que cette fourmi mettra pour arriver au bord, ou en dehors du terrain en se déplaçant aléatoirement.
La carte du terrain sera délimités par les caractères '|', '-' et '+', et sera remplie de '.'. 
La fourmi sera représentée par la lettre 'A'.
La distance entre chaque '.' est de 1cm.

## Les données auxquelles nous disposons sont donc : 

- La distance en cm que parcours la fourmi chaque seconde. Cette distance restera la même pour tout le test. C'est un entier
- Deux entier donnant les dimensions du terrain (hauteur et largeur)
- Le terrain sous forme de carte textuelle(avec les symboles mentionnés plus haut)

## Les données à renvoyer sont donc :

- Le temps moyen qu'une fourmi prend pour sortir du terrain(arrondi à 1 chiffre après la virgule)


# Résolution du puzzle

## Résumé de la méthode

Nous allons ici simplement simuler un grand nombre de fourmis réalisant un parcours aléatoire à chaque fois.
Nous mesurerons le temps que mets chaque fourmi à faire un trajet, puis nous ferons la moyenne.

## Transposition en langage C

Le code est plutôt simple mais efficace.


Nous localisons la fourmi pour lui assigner des coordonnées.
Cette localisation se fait dans la boucle d'initialisation : si le caractère 'A' est le j-ième caractère de la ligne écrite à la i-ème itération de la boucle, les coordonnées de la fourmi seront (j;i).

Vient ensuite la boucle qui fera le nombre de simulation voulue (plus ce nombre est grand, plus précise sera notre moyenne) :
- Nous 'clonons' la fourmi en assignant ses coordonnées à une nouvelle fourmi de test
- Nous entrons dans une nouvelle boucle, qui s'arrête une fois que la fourmi de test a atteint ou dépassé les bords du terrain :
    - Nous lançons un dé à 4 faces, puis modifions les coordonnées de la fourmi de test selon la valeur obtenu, en prenant en compte la distance qu'elle parcours chaque seconde
    - Nous augmentons le temps que la fourmi a pris
- Nous ajoutons à la somme finale le temps mis par la fourmi


- Nous divisons enfin la somme par le nombre de simulations pour l'envoyer


## Code en langage C de la résolution 

Pour créer les coordonnées de la fourmi, nous allons nous aider de `struct`, qui permet d'associer plusieures valeurs à une structure.

``` c
typedef struct Coords Coords;
struct Coords {
    int x;
    int y;
};
```
Sans oublier le `typedef`, qui permet d'éviter d'écrire struct à chaque fois que l'on veut utiliser le structure.
Nous y assignons un x et un y, ce qui reste normal pour des coordonnées.

Nous initialisons nos variables : 

``` c
Coords A;
float sum = 0;
```
*A* représente les coordonnées de la fourmi de départ et *sum* contiendra tous les résultats.

Première boucle qui permet d'écrire la carte (donnée par CodinGame) :

``` c
    for (int i = 0; i < h; i++) {
        char row[32];
        scanf("%[^\n]", row); fgetc(stdin);
        for(int j = 0; row[j] != '\0' && row[j-1] != 'A'; j++) {
            if(row[j] == 'A') {
                A.x = j;
                A.y = i;
            }
        }
    }
```

Nous réalisons une boucle interne qui permet de localiser la fourmi. Elle parcours la chaîne de caractères donnée en entrée et done les coordonnées de la fourmi ('A') si elle est trouvée.

Enfin, voici la dernière boucle, elle peut paraître compliquée, mais la majorité est répétée à l'intérieur (Elle effectue un grand nombre de fois, ici c'est 1000000) :

``` c
    for(int i = 0; i < N; i++) {
        Coords Test = A;
        for (int j = 0;Test.y > 0 && Test.y < h-1 && Test.x > 0 && Test.x < w-1; j++) {
            switch((rand()%4)) {
                case 0:
                    Test.x += step;
                    break;
                case 1:
                    Test.y += step;
                    break;
                case 2:
                    Test.x -= step;
                    break;
                case 3:
                    Test.y -= step;
                    break;
            }
            sum ++;
        }
    }
```

Nous commençons par donner les coordonnées de la fourmi originale à une fourmi de test qui subira un simulation.
Ensuite, nous entrons dans une boucle qui se répète tant que la fourmi n'a pas atteint ou dépassé les bords.
Chaque tour de cette boucle consiste à faire avancer la fourmi dans une direction aléatoire(permis par le `(rand()%4)`, initialisé plus tôt par `srand(time(NULL));`)
Pour faire avancer la fourmi, il suffit simplement de modifier ses coordonnées en fonction de la distance parcourue en 1 seconde.
Puis à la fin de cette boucle interne, nous ajoutons 1 à notre compteur, qui aura enregistré le nombre de tours à la fin de la simulation, tout en ajoutant les résultats d'une simulation à un autre.

Enfin, in ne reste plus qu'à diviser le résultat final par le nombre (très grand) de simulations et le retourner : 

``` c
    printf("%.1f\n", sum/= N);
```

Cette instruction permet d'afficher 1 chiffre après la virgule pour un nombre flottant.

# Solution d'un autre CodinGamer

L'utilisateur [PewPewBewm](https://www.codingame.com/profile/4c53ee22375f45272e50d85e1e9419063476361) a choisi de ne pas faire de simulations mais de modéliser le passage moyen de fourmis sur le terrain : 

``` c
#include <stdio.h>
#include <string.h>

#define COMPLEXITY 120  // TODO: Find a metric for this, based on distance to edges

void ReadProblem();
double Calculate();

double M[2][15][15]={0};
int Step, W, H, Y=-1, X=-1;


int main() {
    ReadProblem();
    double answer = Calculate();
    // Display result
    printf("%.1f\n",answer);

    return 0;
}
void ReadProblem() {
    // Read parameters
    scanf("%d%d%d%*c%*s%*c", &Step, &W, &H);W-=2;H-=2;
    // Find line with ant
    char row[32]; do {Y++; scanf("%*c%s%*c", row); } while(strchr(row,'A')==NULL);
    X = strchr(row,'A')-row;
    // Discard rest of ASCII drawing...
    while(!scanf("%*s"));
}

double Calculate(){
    // Set up front and back buffer
    int fb=0, bb=1;
    // Write initial certainty to front buffer M[0];
    M[fb][Y][X]=1;
    // And get ready to rock...
    double Avg=0; 
    double Sum[2]={1,1};

    // Larger grids require more time to settle...
    for(int t=1;t<COMPLEXITY;t++){               
        // Apply the influences from previous cycle...
        for(int y=0;y<H;y++){
            for(int x=0;x<W;x++){
                // Whilst stayng inside bounds...
                if(x>=Step)     M[bb][y][x] += M[fb][y][x-Step];
                if(x<=W-Step)   M[bb][y][x] += M[fb][y][x+Step];
                if(y>=Step)     M[bb][y][x] += M[fb][y-Step][x];
                if(y<=H-Step)   M[bb][y][x] += M[fb][y+Step][x];
            }
        }

        // Average out the influenced result (and build a new sum while we're here)...
        Sum[bb] = 0;
        for(int y=0;y<H;y++) for(int x=0;x<W;x++) { M[bb][y][x]/=4; Sum[bb] += M[bb][y][x]; }

        // Calculate average time from Sum and previous Sum
        Avg+=(t*(Sum[fb]-Sum[bb]));

        // Now, flip the buffers for the next cycle - and erase our new back buffer, ready for re-use
        fb^=1; bb^=1;
        for(int y=0;y<H;y++)for(int x=0;x<W;x++) M[bb][y][x]=0;
    }
    return Avg;
}
```

Cette approche est intéressante car elle repose plus sur une base mathématique que sur l'aléatoire, ce qui permet d'avoir des résultats qui ne sont pas susceptibles de varier.

# Bilan

Ce puzzle est une approche du concept de chaîne de Markov facile à comprendre et dont la solution peut facilement être obtenu à l'aide de l'écriture d'un algorithme plus ou moins court en fonction des notions que l'on veut y appliquer.
