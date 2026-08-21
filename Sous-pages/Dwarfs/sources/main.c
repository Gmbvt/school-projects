
/**
 *@file main.c
 *@author Guillaume BEUVOT - Prep'ISIMA 1
 *@version 1.0
 *@date 13 avril 2025
 *@brief Fichier contenant le code en C de la résolution du puzzle CodinGame "Dwarfs standing on the shoulders of giants", 3 éléments seront étudiés :
 *- La structure =node_t=
 *- La fonction récursive =search=
 *- La fonction principale
*/




/**
 *@struct node_t
 *@brief Contient la valeur du noeud lui-même, la valeur du noeud qui le précède et l'adresse du noeud qui le suit
*/

typedef struct node node_t;
struct node {
    int value;
    int prev;
    node_t *next;
};


/**
 *@fn int search(node_t node)
 *@author Guillaume BEUVOT
 *@brief Calcule la longueur d'une chaîne d'influence
 *@param node une variable de type node_t
 *@return 1 si node.next == NULL (si le noeud n'est pas suivi par un autre noeud dans le graphe), 1+search(*node.next) sinon
 *@retval supérieure ou égale à 1
*/


int search(node_t node) {
    if(node.next == NULL){
        return 1;
    }
    else {
        return 1 + search(*node.next);
    }
}


/**
 *@fn int main()
 *@author Guillaume BEUVOT
 *@brief Fonction principale, récupère le nombre de relations d'influence, assigne l'adresse du noeud suivant à tous les noeuds suivis
 *@return 0
*/

int main()
{
    int n;
    scanf("%d", &n);
    node_t *nodes = NULL;
    int *outputs = NULL;
    nodes = malloc(n*sizeof(node_t));
    outputs = malloc(n*sizeof(int));
    if(nodes == NULL || outputs== NULL) {
        exit(1);
    }
    for (int i = 0; i < n; i++) {
        int x;
        int y;
        scanf("%d%d", &x, &y);
        nodes[i].value = y;
        nodes[i].prev = x;
        nodes[i].next = NULL;
    }
    for(int i = 0; i < n; i++){
        for(int j = 0; j < n; j++){
            if(nodes[i].value == nodes[j].prev){
                nodes[i].next = &nodes[j];
            }
        }
    }    
    int max = 1;
    for(int i = 0; i < n; i++){
        outputs[i] = 1 + (search(nodes[i]));
        max = outputs[i]>max?outputs[i]:max;
    }
    printf("%d\n",max);
    free(nodes);
    free(outputs);
    nodes = NULL;
    outputs = NULL;
    return 0;
}
