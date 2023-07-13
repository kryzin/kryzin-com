---
slug: "mikrokontrolery-1"
title: "Mikrokontrolery 101"
date: "2023-05-18"
featured: "../images/post-0000.jpg"
altfeatured: "microcontrollers"
tags: ["pic24", 'microcontrollers', 'c']
locale: "pl"
---

## Wprowadzenie

W ramach wprowadzenia do pracy z mikrokontrolerami przedstawiam 9 prostych programów napisanych w języku `C`.

Nasz mikrokontroler będzie przełączał się między tymi 9 programami za pomocą przycisku S4 - następny program - i S3 - poprzedni program.

1. 8-bitowy licznik zliczający w kodzie binarnym (0-255).
2. Odwrotność p1 - odliczanie w dół w kodzie binarnym.
3. 8-bitowe zliczanie w kodzie Graya.
4. Odwrotność p3 - odliczanie w dół w kodzie Graya.
5. 2x4-bitowe zliczanie w kodzie BCD (0-99).
6. Odwrotność p5 - odliczanie w dół w kodzie BCD.
7. Wąż 3-bitowy poruszający się z boku na bok (3 diody LED obok siebie poruszające się w bloku w nieskończonej pętli).
8. Układanie stosu (przenoszenie diody LED z prawej do lewej strony i trzymanie jej na końcu, aż wszystkie diody LED będą włączone).
9. Generator losowych liczb 6-bitowych z ziarnem 1110011.

## Wymagania wstępne

Skonfigurowane do działania na układzie PIC24FJ128GA010 (może wymagać kilku zmian w funkcjach zewnętrznych, aby działały na innym kontrolerze).

Kilka samouczków, z których korzystałam:

- [Konwersja Decimal -> Gray](https://stackoverflow.com/questions/5373276/how-to-get-gray-code-from-decimal-number)
- [Generator Pseudo-losowych liczb](https://www.geeksforgeeks.org/pseudo-random-number-generator-prng/)

## Implementacja

### Podstawy (przełączanie, przyciski)

W nieskończonej pętli sprawdzam, czy którykolwiek przycisk został naciśnięty - jeśli tak, zmieniam bieżący indeks programu w zmiennej `program`. Następnie, za pomocą instrukcji warunkowych, sprawdzam, który program ma zostać uruchomiony.

```c
//main.c
int main(void) {
    SYS_Initialize(); // inicjalizacja aplikacji
    TIMER_SetConfiguration(TIMER_CONFIGURATION_RTCC);
    ADC_SetConfiguration(ADC_CONFIGURATION_AUTO_SAMPLE_CONVERT);
    int program = 1; // śledzenie uruchomionego programu

    while (1) { // nieskończona pętla
        if (BUTTON_IsPressed(BUTTON_S3)) { // poprzedni program
            program--;
            if (program == 0)
                program = 9; // przypadek krańcowy
        }
        if (BUTTON_IsPressed(BUTTON_S4)) { // następny program
            program++;
            if (program == 10)
                program = 1; // przypadek krańcowy
        }
        if (program == 1) { // sprawdzenie, który program uruchomić
            count_up();
        }
        if (program == 2) {
            count_down();
        }
        if (program == 3) {
            count_up_gray();
        }
        if (program == 4) {
            count_down_gray();
        }
        if (program == 5) {
            count_up_bcd();
        }
        if (program == 6) {
            count_down_bcd();
        }
        if (program == 7) {
            snake();
        }
        if (program == 8) {
            stack();
        }
        if (program == 9) {
            pseudo();
        }
    }
    return 0;
}
```

### Liczenie w górę w kodzie binarnym

Domyślna konfiguracja dla układu PIC24 na platformie MPLAB X IDE obejmuje `LATA` - kontrolujący jednocześnie 8 diod LED, zamieniający wartość na kod binarny i wyświetlający go. Oznacza to, że tworzenie licznika binarnego nie wymaga nawet użycia kodu binarnego, lol.

Funkcja `delay()` jest wywoływana, abyśmy mogli zobaczyć zmiany na diodach LED - bez niej mikrokontroler działałby zbyt szybko.

```c
void count_up() {// przerwij zliczanie, gdy zostanie naciśnięty którykolwiek z przycisków
    for (int i = 0; i <= 255; i++) { // zliczaj w górę od 0 do 255
        LATA = i; // wyświetl i na diodach LED
        delay(200); // czekaj - inaczej za szybko
        if (BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)) {
            break;
        } // zakończ funkcję, jeśli zostaną naciśnięte przyciski
    }
}
```

### Liczenie w dół w kodzie binarnym

Po prostu odwróć pętlę for.

```c
void count_down() {
    for (int i = 255; i >= 0; i--) { // zliczanie w dół od 255 do 0
        LATA = i;
        delay(200);
        if (BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)) {
            break;
        }
    }
}
```

### Liczenie w górę w kodzie Graya

Jak widzieliście w powyższym podlinkowanym samouczku, konwersja liczby dziesiętnej na Graya polega na przesuwaniu bitów.

```c
void count_up_gray() {
    for (int i = 0; i < 256; i++) { // zliczaj w górę od 0 do 255
        int gray = i ^ (i >> 1); // konwersja na Graya - przesunięcie bitowe
        LATA = gray;
        delay(250);
        if (BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)) {
            break;
        }
    }
}
```

### Liczenie w dół w kodzie Graya

Ponownie, odwracamy pętlę for.

```c
void count_down_gray(){
    for(int i = 255; i >= 0; i--){ //w dół 255-0
        int gray = i ^ (i >> 1); //konwersja do graya
        LATA = gray;
        delay(250);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
    }
}
```

### Liczenie w górę w kodzie BCD

Ten jest nieco trudniejszy - BCD to kod binarny dziesiętny, który używa 4 bitów do zakodowania jednej cyfry. Dlatego nasz licznik to 2x4 - mamy wartość dziesiątek i jedności. Gdy wyświetlamy to na 8 diodach LED, najpierw przesuwamy dziesiątki do czterech skrajnych lewych bitów, a następnie dodajemy jedności.

```c
void count_up_bcd(){
    for(int i = 0; i < 100; i++) { // zliczaj w górę od 0-99
        int bcd1 = i / 10; // dziesiątki
        int bcd2 = i % 10; // jedności
        LATA = (bcd1 << 4) | bcd2; // dziesiątki na pierwsze 4 diody LED, a następnie jedności
        delay(250);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
    }
}
```

### Liczenie w dół w kodzie BCD

```c
void count_down_bcd(){
    for(int i = 99; i >= 0; i--) { // zliczaj w dół od 99-0
        int bcd1 = i / 10; // dziesiątki
        int bcd2 = i % 10; // jedności
        LATA = (bcd1 << 4) | bcd2; // dziesiątki na pierwsze 4 diody LED, a następnie jedności
        delay(250);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
    }
}
```

### Wąż 3-bitowy

Najpierw zadeklarowałam listę `numbers`, która zawiera wszystkie możliwe pozycje "węża". Ponieważ jest to blok 3-bitowy poruszający się na przestrzeni 8-bitowej, mamy tylko 6 możliwych kombinacji.
Aby kontrolować, która pozycja ma być wyświetlana, mamy zmienną `index` - jest ona przekazywana do listy `numbers` - a do kontrolowania kierunku odczytu listy mamy zmienną `direction` - albo w lewo, albo w prawo.

```c
void snake(){
    int numbers[] = {7, 14, 28, 56, 112, 224}; // wszystkie pozycje węża
    int index = 0; // która pozycja ma być wyświetlana
    int direction = 1; // 1 w lewo, -1 w prawo
    while (1){ // przerywa, jeśli przyciski są naciśnięte
        LATA = numbers[index]; // wyświetl pozycję diody LED
        delay(250);
        index += direction; // przeglądaj listę w zależności od kierunku ruchu
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
        if(index == 5) {
            direction = -1; // jeśli wszystkie pozycje zostały wyświetlone, zmień kierunek
        } else if (index == 0) { // jeśli doszliśmy do skrajnie lewej strony
            direction = 1; // idź w prawo
        }
    }
}
```

### Stos

Najpierw podzieliłam diody LED na dwie grupy - jedną zamocowaną na stosie `baza` i jedną, która będzie się "poruszać". Aby pokazać poruszającą się część, zadeklarowałam zmienną `index`, która będzie reprezentować aktualnie poruszającą się diodę LED. `base_index` to indeks skrajnie lewej wolnej pozycji (wolne oznacza, że nie są włączone), który zmieni się, gdy poruszająca się dioda zatrzyma się na tym indeksie.
Wyświetlamy zamocowane diody LED i poruszającą się - aż wszystkie diody LED będą włączone i wyświetlenie osiągnie wartość `=255`.

```c
void stack(){
    int index = 0; // potęga liczby 2 (dla "jedności")
    int baza = 0; // wartość już na końcu stosu
    int base_index = 7; // potęga zapisanej wartości
    int display = 0;
    while(display < 256){ // zatrzymaj, gdy stos jest pełny = wszystkie diody LED są włączone
        display = baza + (1 << index); // "zapisane" na stosie + poruszające się
        LATA = display;
        delay(250);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
        index++; // "poruszająca się" część na stosie
        if (index > base_index){ // jeśli dioda "poruszająca się" jest za swoim miejscem
            index = 0; // resetuj dla następnej poruszającej się diody
            baza = baza + (1 << base_index); // zapisz wartość z diody, która przesunęła się
            base_index--; // miejsce na zapisanie przesunięte do prawej
        }
    }
}
```

### Generator pseudolosowych liczb

Zadeklarowałam pierwsze ziarno (w systemie dziesiętnym) poza funkcją - za każdym razem, gdy wchodzimy do programu, zaczynamy od pierwszego ziarna.
Używane liczby i operacje pochodzą z powyższego samouczka.

```c
int seed = 115; //ziarno
void pseudo()
{
    while(1){ //stop jeśli naciśnięty przycisk
        int m = pow(2, 32);
        int a = 22695477; //losowe
        int new_num = (a * seed + 1) % m;
        new_num &= 63; //konwersja na 6-bit
        LATA = new_num; //pokaż na ekranie
        
        if(BUTTON_IsPressed(BUTTON_S5)){ //jeśli S5 - nowy numer
            seed = new_num;
            new_num = (a * seed + 1) % m;
            LATA = new_num;
        }
        delay(250);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
        break;
        }
    }
}
```

## Zakończenie

Bądźcie czujni na pozostałe zadania z wprowadzenia do mikrokontrolera :blush:
