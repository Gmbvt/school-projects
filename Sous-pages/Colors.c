#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

#define BLK "\e[0;30m"
#define RED "\e[0;31m"
#define GRN "\e[0;32m"
#define YEL "\e[0;33m"
#define BLU "\e[0;34m"
#define MAG "\e[0;35m"
#define CYN "\e[0;36m"
#define WHT "\e[0;37m"

char Countries[10][50] = {"\e[0;32mP\e[0;31mRT", "\e[0;34mF\e[0;37mR\e[0;31mA", "\e[0;30mG\e[0;31mE\e[0;33mR", "\e[0;32mB\e[0;34mR\e[0;32mA", "\e[0;30mB\e[0;33mE\e[0;31mL", "\e[0;34mS\e[0;33mW\e[0;34mE", "\e[0;31mS\e[0;33mP\e[0;31mA", "\e[0;33mC\e[0;31mHI", "\e[0;31mA\e[0;37mU\e[0;31mS"};


char CountriesNc[10][50] = {"PRT", "FRA", "GER", "BRA", "BEL", "SWE", "SPA", "CHI", "AUS"};



void fillFile(int num) {
    FILE* file = NULL;
    file = fopen("scores.txt", "w+");
    for(int i = 0; i < num; i++) {        
        fprintf(file, "%s: 0       \n", CountriesNc[i]);
    }
    fclose(file);
}





void match(){
  int adv1 = rand()%9, adv2 = 0, winner = 0;
  char text[500] = {0};
  do{
    adv2 = rand()%9;
  }while(adv2 == adv1);
  printf("Rencontre amicale :\n%s\e[0;37m vs. %s\n\n\e[0;35m\n\e[1mÊtes-vous prêts ?\e[0;37m\n\n", Countries[adv1], Countries[adv2]);
  scanf("%s", text);

//// Match

//// Half-time

//// Overtime

 
  winner = rand()%2?adv1:adv2;
  FILE* file = NULL;
  file = fopen("scores.txt", "r+");


  int wins;
  char swins[50];
  if(file != NULL){
      for(int i = 0; i < 9; i++) {        
        char line[4], bin[1000];
        fgets(line, 4, file);
        if(!strcmp(line, CountriesNc[winner])){
            printf("%s\n", line);
            fgetc(file);
            fgetc(file);
            fscanf(file, "%d", &wins);
            sprintf(swins, "%d", wins);
            for(int j = 0; j < (int)strlen(swins); j++)fseek(file, -1, SEEK_CUR);
            wins++;
            fprintf(file,"%d", wins);   
        }
        fgets(bin, 1000, file);
      }   
  }
  
  fclose(file);
  char term[5];
  if(wins==1)strcpy(term,"ère");
  else if(wins==2)strcpy(term,"nde");
  else strcpy(term,"ème");
  printf("\n\nÀ l'issu d'un match très respectable, l'équipe %s\e[0;37m l'emporte et décroche une %d%s victoire !\n\n", Countries[winner], wins, term); //Would be nice if there was a database // I got you lil man
}








int main () {
  srand(time(NULL));
  int choix = 0;
    
  printf("Coupe du monde de Football-Instantané, pour quelle option allez vous opter ? \n1.Match seul\n2.Accuser les clubs de corruption\n");
  scanf("%d", &choix);
  switch(choix%2){
      case 1:
        match();
        break;
      case 0:
        fillFile(9);
        break;
  }
   
  return 0;
}
