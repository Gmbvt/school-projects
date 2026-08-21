<img src="https://www.isima.fr/wp-content/uploads/2023/01/Logo_ISIMA_INP.jpg" alt="Isima" width="200"/>
<img src ="https://i.redd.it/c9xvfidqauyz.jpg" alt="NPC" width = "500">

**Par Guillaume BEUVOT, étudiant en Prep'ISIMA 1, 2024/2025**


# Introduction au puzzle

Un bon développeur de jeux va créer des dialogues bien construits entre les personnages, mais c'est moins fastidieux et plus marrant de faire dire n'importe quoi aux personnages.
Pour cela, il est bien utile de s'aider des chaînes de Markov, une notion qui permet, globalement, de créer une structure aléatoire. 
Pour la génération de texte insensé et complètement aléatoire, il suffit de créer une longue phrase de départ dans laquelle le programme piochera les mots en fonction de ce qu'il reçoit en entrée.

**Le fonctionnement est le suivant :**

1. Le programme reçoit un certain nombre de mots
2. Il va chercher dans la phrase d'exemple le mot qui vient compléter le bout de phrase qu'il a reçu
3. Il prend les derniers mots du bout de phrase complété et se les re-donne pour re-trouver le mot manquant en répétant le procédé
4. Il fait ça jusqu'à avoir une phrase de la longueur souhaitée, ce qui peut, à la fin ressembler à un texte complet qu'un personnage peut réciter.

Ce principe s'inspire des chaînes de Markov car pour chaque groupe de mots(les bouts de phrase) est associé au mot suivant, donc un, *ou plusieurs*, mots. 
En effet, dans la phrase de début, il peut y avoir des gropes de mots similaires, mais dont le mot suivant est différent.
Pour un exemple plus parlant, cela peut être observé quand une expression est utilisée régulièrement dans un texte, comme "*il y a*".
Par exemple, dans la phrase : "*Dans mon jardin, **il y a** des plantes mais **il y a** surtout un arbre*", le groupe de mots *il y a* est précédé, en fonction de l'endroit, soit par le mot *des*, soit par le mot *surtout*.
Nous verrons comment le programme choisit le mot qui complètera le bout de phrase reçu plus loin, pour l'instant, il suffit juste de comprendre l'association de groupes de mots au mot qui le complètera potentiellement.

Le problème en langage C à traiter est donc de créer ce programme qui puisse se charger de créer des dialogues, ou plus généralemrent du texte de manière aléatoire, ou presque.


## Les données auxquelles nous disposons sont donc : 

- La phrase de départ, une chaîne de caractères d'une longeueur maximum de 1000 caractères (on peut donc avoir 1000 "mots" ou 1 "mot" de 1000 caractères)
- La profondeur, un entier inférieur ou égal à 10 (C'est le nombre de mots du bout de phrase à envoyer au programme)
- La longueur souhaitée, un entier supérieur ou égal à la profondeur et inférieur ou égal à 100 (C'est en nombre de mots)
- Le bout de phrase de départ, une chaîne de caractères inférieure ou égale à 1000 caractères qui peut avoir un nombre de mots supérieur à la profondeur

## Les données à renvoyer sont donc :

- La phrase aléatoire générée selon le principe introduit plus haut, dont la longueur doit être celle demandée. Notez que le bout de phrase de départ doit être présent dans la phrase finale, ce qui réduit le nombre de mots à générer.

# Résolution du puzzle

## Résumé de la méthode

Le fonctionnement du programme est expliqué plus haut, mais il faut pouvoir décomposer plus distinctement les étapes pour les transposer en code.
Nous commencerons par isoler les mots de la phrase donnée, pour les associer aux groupes de mots, eux aussi isolés dans des tableaux.
Puis nous prendrons un groupe de mots, lui ajouterons le mot suivant en retirant le premier mot du groupe pour prendre ce nouveau groupe de mots pour lui associer le suivant et ainsi de suite...
Nous sauvagarderons bien-sûr la progression de la phrase dans une chaîne réponse, que nous retournerons à la fin de la génération.

## Transposition en langage C

Le code est constitué de plusieurs parties dont la dernière sera une boucle, elle-même composée de plusieurs étapes.

Nous créons un tableau de chaînes de caractères pour isoler les mots de la phrase, un autre tableau pour contenir tous les groupes de mots, et une chaîne qui contiendra toutes les options pour le mot suivant, si un mot peut avoir plusieurs potentiels mots suivants.

Nous commençons par compter le nombre de mots dans le bout de phrase donné, cela permet de faciliter la tâche si le nombre de mots du bout de phrase donné n'est pas égal à la profondeur (p), soit le nombre de mots à regarder pour déduire le mot suivant.

Nous copions ensuite le bout de phrase donné dans la chaîne de caractères réponse avant de la vider pour y mettre seulement les *p*-derniers mots.

Nous entrons ensuite dans une boucle qui va isoler les mots de la phrase de départ. Son fonctionnement est le suivant :

Tant que le curseur n'est pas à la fin de la chaîne de caractères :
- Si le curseur est sur un espace, on change de mot (nouvelle case dans le tableau "isolation")
- Sinon, on ajoute le caractère sous le curseur dans la chaîne de caractère de la case correspondante du tableau.

Ensuite, le tableau contenant les groupes de mots se remplit naturellement, en ajoutant dans chaque case un groupe de mots séparés par p-1 espaces.

Les deux boucles suivantes nous servirons à mettre dans le bout de phraseà étudier les pderniers mots de la chaîne de caractère réponse. Étudions leur fonctionnement:

Première boucle (Tant que le curseur ne se trouve pas sur le *p-1*-ème espace ou sur le début de la chaîne) :
- Recule le curseur de 1 (Il est placé à la fin de la chaîne)

Ce curseur nous sert pour la deuxième boucle (Tant que le curseur ne se trouve pas à la fin de la chaîne) :
- Ajoute le caractère sous le curseur à la chaîne de caractères représentant le bout de phrase à étudier

Nous allons appeler cette chaîne *S*.

Enfin, nous entrons dans la dernière boucle, qui va réaliser le travail de l'algorithme présenté en introduction.

Tant que la chaîne réponse n'a pas la longueur voulue (Nous nous plaçons dans la chaîne de bouts de phrases) : 
- Si le curseur se trouve sur la même chaîne que *S*:
    - Nous ajoutons dans le tableau des options le mot qui se trouve juste après dans le texte
    - Nous entrons dans une boucle qui parcours le tableau des bouts de phrases, jusqu'à trouver une chaîne similaire à *S* si elle existe, puis ajoute le mot qui suit cette chaîne dans le tableau des mots de la phrase de départ
    - Nous choisissons aléatoirement parmi les options
    - Nous ajoutons l'option choisie à la chaîne de caractères réponse, et vidons *S*
    - Nous re-remplissons *S* de la même manière que précédemment

À la fin de cette boucle, la chaîne de caractères réponse est correctement remplie, et nous pouvons la renvoyer.

## Code en langage C de la résolution 

```c
    char answer[1001];
    char text[1000][1000];
    char verif[1000][1000];
    char options[400][30][400];
```
Nous initialisons nos variables en commençant par les tableaux.
`answer` est la chaîne de caractère réponse que nous renverrons.
`text` est le tableau de chaînes de caactères qui contiendra chque mot isolé de la phrase de départ.
`verif` est le tableau de chaînes de caractères qui seront les bouts de phrases.
`options` est le tableau qui contiendra les options pour chaque groupes de mots.

Nous initialisons aussi les variables, mais elles ne seront spécifique qu'à chaque partie, nous les présenteront lorsque cela sera nécessaire.

```c
    for(int i = 0; s[i] != '\0'; i++) {
            if (s[i] == ' ') {
                words++;
            }
    }
```

Nous comptons ici le nombre de mots dans le bout de phrase donné.
`int words = 1;` sera le nombre de mots du bout de phrase de départ.
Ici, nous parcourons la chaîne de caractères en entier en augmentant le nombre de mots si le curseur se trouve sur une espace.

Ensuite, nous copions le bout de phrase de départ dans notre réponse, puis la vidons :

```c
    strcpy(answer, s);
    s[0] = '\0';
```

La fonction `char* strcpy(char* chaine1, const char* chaine2);` permet de copier la chaîne chaine2 dans la chaîne chaine1.

La boucle suivante permet d'isoler chaque mot dans le tableau `text` :
```c
    for(int i = 0, j = 0; t[i] != '\0'; i++) {
        if (t[i] == ' ') {
            j = 0;
            k++;
        }
        else {
            text[k][j] = t[i];
            j++;
        }
    }
```

`int k = 0;` est le compteur de mots de la phrase de départ.
La boucle s'effectue tant que le dernier caractère n'est pas atteint.
Si le caractère sur lequel le curseur est placé est une espace, le nombre de mots augmente, ce qui a pour effet d'écrire le mot suivant dans la case suivante.
Sinon la variable temporaire `j` permet d'écrire le j-ième caractère du mot (i-ème case de la phrase) dans la j-ième case de la chaîne de caractères.

La boucle suivante permet de rempllir le tableau `verif` :

```c
    for (int i = 0; i <= k; i++) {
        for(int j = 0; j < d; j++) {
            if (j) {
                strcat(verif[i]," ");
            }
            strcat(verif[i],text[i+j]);
        }
    }
```

Ici, la variable `d` nous a été donnée par le puzzle, elle représente *p*, vue plus haut.
Dans ce tableau, chaque mot sera suivi de *p*-1 mots séparés par des espaces.
Les mots ajoutés sont ceux qui suivent dans le tableau `text`.


Les deux boucles suivantes serviront, comme vu précédemment, à adapter la chaîne de caractère de façon à ce qu'elle puisse être étudiée par la boucle finale :

```c
    for(int i = strlen(answer)-1, n = 0; n < d; i--) {
        if(answer[i] == ' ' || i == 0) {
            n++;
        }
        c = answer[i] == ' '? i+1:i;
    }
```

`int c = 0;` servira de curseur dans la boucle suivante.
Le curseur est placé à la fin de la chaîne de caractères réponse et recule jusqu'à rencontrer suffisament d'espaces ou le début de la chaîne.
Cette boucle autorise p-1 espaces avant de stopper la boucle.
Elle place le curseur `c` sur le caractère sur lequel le curseur actuel se trouve s'il se trouve au début de la chaîne ou le suivant s'il se trouve sur une espace.

```c
    for(int i = 0; answer[c] != '\0'; i++) {
        s[i] = answer[c];
        s[i+1] = '\0';
        c++;
    }
```

Ici, le curseur `c` permet d'écrire dans la chaîne *s* les p-deriners mots (jusqu'à ce que la fin de la chaîne soit rencontrée).
Notons l'instruction `s[i+1] = '\0';` qui évite de récupérer des caractères en trop (cela sera utile lorsque nous seront dans la boucle finale et que nous ne pourons pas vider la chaîne)


Nous arrivons maintenant dans la dernière boucle.
Voici son début : 

```c
for(int j = 0, a = 1;turn < l-words; j++, turn++, a = 1)
```

`int turn = 0` permet de compter les itérations de la boucle, ce qui permet de générer le nombre exact de mots, tout en ayant soustrait le nombre de mots dans la chaîne de départ.

La condition suivante contient l'ensemble des instructions de la boucle, elle n'est valide que si la chaîne *s* est la même que le bout de phrase étudié :
```c
if(!strcmp(verif[j],s))
```

La fonction `int strcmp(const char* chaine1, const char* chaine2);` renvoie 0 si les 2 chaînes sont identiques, d'où le `!`.

```c
    sprintf(options[j][0], "%s",text[j+d]);
    for(int i = j+1; i < k; i++) {
        if(!strcmp(verif[i],verif[j])) {
            sprintf(options[j][a], "%s",text[i+d]);
            a++;
        }
    }
```

Ici, le mot qui suit le bout de phrase étudié est ajouté aux options.
Une boucle est ensuite effectuée pour trouver une autre chaîne identique et ajouter aussi le mot qui suit dans les options.

Nous arrivons maintenant au moyen de choisir "aléatoirement" le mot suivant parmi les options.

```c
    random_seed += 7;
    strcat(strcat(answer, " "), options[j][random_seed%a]);
```

`int random_seed = 0;` est le "nombre aléatoire" qui permettra de choisir le mot suivant. Nous y ajoutons 7 puis calculons son modulo par le nombre d'options.
Nous ajoutons à la réponse une espace puis le mot suivant choisi *aléatoirement*.

Enfin, nous adaptons la chaîne *s* pour qu'elle soit traitée dans l'itération suivante, tout en ayant comme dernier mot le mot nouvellement ajouté.
Nous utiliseront pour cela les deux mêmes boucles vues précédemment:

```c
    for(int i = strlen(answer)-1, n = 0; n < d; i--) {
        if(answer[i] == ' ' || i == 0) {
            n++;
        }
        c = answer[i] == ' '? i+1:i;
    }

    for(int i = 0; answer[c] != '\0'; i++) {
        s[i] = answer[c];
        s[i+1] = '\0';
        c++;
    }
```

Enfin, nous augmentons le nombre de tours, nous le faisons ici et pas dans la boucle car la boucle effectue chaque itération, que la condition de départ soit validée ou non, alors qu'ici la condition est déjà validée.


Il ne reste plus qu'à envoyer notre réponse : 
```c
    printf("%s\n", answer);
```

Cette solution nécéssite peut-être des améliorations, la taille des tableaux ne correspond pas forcément à toutes les situations, et prend souvent, très souvent de la place pour rien, une modification en remplaçant les tableaux à taille fixe par des tableaux à taille dynamique, grâce aux `malloc` serait la bienvenue (Je m'engage à modifier ce programme, si vous voyez cette note c'est que je n'ai pas eu le temps de le faire, et vous aurez le droit de me taper sur les doigts...)

# Solution d'un autre CodinGamer

L'utilisateur [Ender_4](https://www.codingame.com/profile/2766db9bafd6f54a1d566af7c2bcb0d40047495) utilise une approche que j'ai eu pendant l'écriture de mon code, qui est d'utiliser un struct(*dictionnaire* pour les fans inexistants de Python) pour lequel on peut associer plusieures valeur à une seule variable, ce qui permet d'associer le ou les mots suivants pour chaque groupe de mots.


Voici le morceau de code concerné, l'ensemble du code étant déjà trop long : 


```c
struct rule {
    // A table corresponding to a string match
    // for example: { 0, 1 } -> 'one fish'; { 1, 2, 6 } -> 'fish is bad'
    int *predicate;
    // Table for result actions, as a table of corresponding words
    // for example : { 2 } -> 'is'; { 3, 6 } -> 'good' | 'bad'
    int *actions;
    int actionsLength;
};
```

Sans oublier le typedef :

```c
typedef struct rule rule_t;
```



# Bilan

Ce puzzle permet une approche plutôt ludique au concept des chaînes de Markov. Il permet aussi, de par sa complexité de mettre en application plusieurs éléments du langage dans lequel le problème est traité. Il fait aussi plus réfléchir que d'autres puzzles.
