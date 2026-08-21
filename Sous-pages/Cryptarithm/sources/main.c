
/**
 *@file main.c
 *@author Guillaume BEUVOT - Prep'ISIMA 1
 *@version 1.0
 *@date 4 mai 2025
 *@brief Fichier contenant le code en C de la résolution du puzzle CodinGame "Cryptarithme", 3 éléments seront étudiés :
 *- La structure =letter_t=
 *- La fonction  =search=
 *- La fonction  =search=
 *- La fonction  =place=
 *- La fonction principale
*/




/**
 *@struct letter_t
 *@brief Contient une lettre, sa valeur et un entier égal à 1 si la lettre se trouve au début d'un mot, 0 sinon
*/

typedef struct letter_t letter_t;
struct letter_t {
    char letter; /*!< Lettre (caractère) */
    int value; /*!< Valeur (entier) */
    int firstLetter; /*!< 1 Si la lettre est la première dans un mot, 0 sinon */
};


/**
 *@fn int calc(char *word, letter_t cryptarithm[], int n) 
 *@author Guillaume BEUVOT
 *@brief Calcule la somme des lettres d'un mot converties en chiffres
 *@param word une chaîne de caractères, cryptarithm un tableau de type letter_t, n un entier
 *@return Somme des lettres d'un mot converties en chiffres
 *@retval positive ou nule
*/



int calc(char *word, letter_t cryptarithm[], int n) {
    int values[26];
    for (int i = 0; i < n; i++){
        values[cryptarithm[i].letter-'A'] = cryptarithm[i].value;
    }
    int k = 0;
    for (char *p = word; *p > 0 ; p++){
        k = 10*k + values[*p-'A'];
    }
    return k;
}


/**
 *@fn int verif(letter_t cryptarithm[], int n, int k, char words[6][100])
 *@author Guillaume BEUVOT
 *@brief Vérifie si une combinaison est valide ou non
 *@param cryptarithm un tableau de type letter_t, n un entier, k un entier, words, un tableau de chaînes de caractères
 *@return 1 si la combinaison est valide, 0 sinon
 *@retval positive ou nule
*/

int verif(letter_t cryptarithm[], int n, int k, char words[6][100]) {
    int sum = 0;
    for (int i = 0; i < k; i++){
        sum += calc(words[i], cryptarithm, n);
    }
    return sum == calc(words[k], cryptarithm, n);
}


/**
 *@fn changeLetters(letter_t cryptarithm[], int n, int x, int k, char words[6][100]) {
 *@author Guillaume BEUVOT
 *@brief Modifie la combinaison actuelle jusqu'à ce que la bonne soit trouvée
 *@param cryptarithm un tableau de type letter_t, n un entier, x un entier, k un entier, words, un tableau de chaînes de caractères
 *@return 0 si la combinaison est trouvée, 1 sinon
 *@retval positive ou nule
*/

int changeLetters(letter_t cryptarithm[], int n, int x, int k, char words[6][100]) {
    int seen[10] = {0};

    if(cryptarithm[x].firstLetter){
        seen[0] = 1;
    }

    for(int i = 0; i < x; i++) {
        seen[cryptarithm[i].value] = 1;
    }

    for(int i = 0; i < 10; i++) {
        if(!seen[i]){
            cryptarithm[x].value = i;
            if((x == n-1 && verif(cryptarithm, n, k, words)) || (changeLetters(cryptarithm, n, x+1, k, words))){
                return 1;
            }
        }
    }
    return 0;
}






/**
 *@fn int place(letter_t cryptarithm[], int n, char c)
 *@author Guillaume BEUVOT
 *@brief Renvoie l'indice d'une lettre dans le tableau de lettres. Si la lettre n'y est pas présente, la fonction renvoie -1
 *@param cryptarithm un tableau de type letter_t, n un entier et c un caractère
 *@return -1 si la lettre n'est pas présente dans le tableau, l'indice de la lettre dans le tableau sinon
 *@retval positive ou nul si la lettre est présente dans le tableau, négative sinon
*/


int place(letter_t cryptarithm[], int n, char c) {
    for (int i = 0; i < n; i++)
        if (cryptarithm[i].letter == c) return i;
    return -1;
}

/**
 *@fn int main()
 *@author Guillaume BEUVOT
 *@brief Fonction principale, récupère les mots et le résultat, extrait les lettres et les arrange par ordre alphabétique, puis affiche chaque lettre avec le chiffre correspondant
 *@return 0
*/

int main()
{
    letter_t cryptarithm[26];
    int l = 0;
    int N;
    char words[6][100];


    scanf("%d", &N);
    for (int i = 0; i < N; i++) {
        char word[100];
        scanf("%s", word);
        strcpy(words[i], word);
        for (char *p = words[i], *j = p; *p > 0; p++) {
            int k = place(cryptarithm, l, *p);
            if (k == -1) { 
                cryptarithm[l].letter = *p;
                cryptarithm[l].value = 0;
                cryptarithm[l].firstLetter = j == p;
                l++;
            }
        }
    }
    char total[100];
    scanf("%s", total);
    strcpy(words[N], total);
    for (char *p = words[N], *j = p; *p > 0; p++) {
        int k = place(cryptarithm, l, *p);
        if (k == -1) { 
            cryptarithm[l].letter = *p;
            cryptarithm[l].value = 0;
            cryptarithm[l].firstLetter = j == p;
            k = l;
            l++;
        }
    }

    for(int i = 0, count = 0; i < 25; i++){
        for(int j = count; j < l; j++){
            if(cryptarithm[j].letter == i+'A'){
                letter_t temp = cryptarithm[count];
                cryptarithm[count] = cryptarithm[j];
                cryptarithm[j] = temp;
                count++;
                break;
            }
        } 
    }

    changeLetters(cryptarithm, l, 0, N, words);

    for(int i = 0; i < l; i++) {
        printf("%c %d\n", cryptarithm[i].letter, cryptarithm[i].value);
    }
    return 0;
}
