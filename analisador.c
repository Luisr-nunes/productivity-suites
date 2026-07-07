#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define TAMANHO_MAX 100

int main() {
    char senha[TAMANHO_MAX];

    printf("Digite uma senha: ");
    fgets(senha, TAMANHO_MAX, stdin);
    senha[strcspn(senha, "\n")] = '\0';

    int tem_maiuscula = 0, tem_minuscula = 0;
    int tem_numero = 0,    tem_especial  = 0;
    int comprimento = strlen(senha);

    for (int i = 0; i < comprimento; i++) {
        if (isupper(senha[i]))  tem_maiuscula = 1;
        if (islower(senha[i]))  tem_minuscula = 1;
        if (isdigit(senha[i]))  tem_numero    = 1;
        if (ispunct(senha[i]))  tem_especial  = 1;
    }

    int score = 0;
    if (comprimento >= 8)   score += 1;
    if (comprimento >= 12)  score += 1;
    if (comprimento >= 16)  score += 1;
    if (tem_maiuscula) score += 1;
    if (tem_minuscula) score += 1;
    if (tem_numero)    score += 1;
    if (tem_especial)  score += 2;

    printf("\n--- Análise da senha ---\n");
    printf("Comprimento: %d caracteres\n", comprimento);
    printf("Tem maiúsculas : %s\n", tem_maiuscula ? "Sim" : "Não");
    printf("Tem minúsculas : %s\n", tem_minuscula ? "Sim" : "Não");
    printf("Tem números    : %s\n", tem_numero    ? "Sim" : "Não");
    printf("Tem especiais  : %s\n", tem_especial  ? "Sim" : "Não");
    printf("Pontuação total: %d / 7\n\n", score);

    if (score <= 2)      printf("Força: *** FRACA ***\n");
    else if (score <= 4) printf("Força: ** MÉDIA **\n");
    else if (score <= 6) printf("Força: * FORTE *\n");
    else                 printf("Força: MUITO FORTE\n");

    printf("\n--- Sugestões ---\n");
    if (comprimento < 12)  printf("- Aumente para pelo menos 12 caracteres.\n");
    if (!tem_maiuscula)    printf("- Adicione pelo menos uma letra maiúscula.\n");
    if (!tem_minuscula)    printf("- Adicione pelo menos uma letra minúscula.\n");
    if (!tem_numero)       printf("- Inclua pelo menos um número.\n");
    if (!tem_especial)     printf("- Use caracteres especiais como !@#$%%^&*.\n");
    if (score == 7)        printf("Nenhuma sugestão — sua senha está excelente!\n");

    return 0;
}