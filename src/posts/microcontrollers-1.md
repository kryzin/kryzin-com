---
slug: "microcontrollers-1"
title: "Microcontrollers 101"
date: "2023-05-18"
featured: "../images/post-0000.jpg"
altfeatured: "microcontrollers"
tags: ["pic24", 'microcontrollers', 'c']
---


## Introduction

As an introduction to working with microcontrollers I'll showcase 9 simple programs written in `c`.

Our microcontroller will switch trought these 9 programs with button `S4` - next program - and `S3` - previous program.

1. 8-bit counter that count up in binary code (0-255)
2. Reverse of p1 - count down in binary
3. 8-bit count up in Gray code
4. Reverse of p3 - count down in Gray
5. 2x4-bit count up in BCD code (0-99)
6. Reverse of p5 - count down in BCD
7. 3-bit snake moving side-to-side (3 LEDs next to each other moving in a block in an infinite loop)
8. Stack building up ('move' a LED from right to left and keep it at the end util all LEDs are on)
9. 6-bit random number generator with a `seed = 1110011`

## Prerequisites

Configured to run on PIC24FJ128GA010 (might need a few changes to outside functions to rework on a different controller).

Some tutorials I used:

- [for Decimal -> Gray conversion](https://stackoverflow.com/questions/5373276/how-to-get-gray-code-from-decimal-number)
- [for pseudo-random number generation](https://www.geeksforgeeks.org/pseudo-random-number-generator-prng/)

## Implementation

### Base (switching, buttons)

In an infinite loop I'm checking if any buttons were pressed - and if so - I'm changing the current program index in a `program` variable. Then using if-statements I'm checking which program to run.

```c
//main.c
int main ( void ){
    SYS_Initialize ( ) ; //initialize the app
    TIMER_SetConfiguration ( TIMER_CONFIGURATION_RTCC ) ;
    ADC_SetConfiguration ( ADC_CONFIGURATION_AUTO_SAMPLE_CONVERT ) ;
    int program = 1; //keep track of which program is running

    while ( 1 ){ //infinite loop
        if (BUTTON_IsPressed ( BUTTON_S3 )){ //previous program
            program--;
            if (program == 0) program = 9; //edge case
        }
        if (BUTTON_IsPressed ( BUTTON_S4 )){ //next program
            program++;
            if (program == 10) program = 1; //edge case
        }
        if (program == 1){//check which program to run
            count_up();
        }
        if (program == 2){
            count_down();
        }
        if (program == 3){
            count_up_gray();
        }
        if (program == 4){
            count_down_gray();
        }
        if (program == 5){
            count_up_bcd();
        }
        if (program == 6){
            count_down_bcd();
        }
        if (program == 7){
            snake();
        }
        if (program == 8){
            stack();
        }
        if (program == 9){
            pseudo();
        }
    }
    return 0;
}
```

### Count-up in binary

The PIC24 default config on MPLAB x IDE includes `LATA` - which controlls all 8 LEDs at the same time by converting a given value into binary and displaying it. Which means making a binary counter doesn't even inolve using binary code lol.

The `delay()` function is called so we are able to see the LEDs changing - without it the microcontroller work a little too fast.

```c
void count_up(){//abort counting when either button is pressed
    for(int i = 0; i <= 255; i++){ //count up 0-255
        LATA = i; //display i on leds
        delay(200); //wait - otherwise too quick
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            Break;
        } //exit func if buttons pressed
    }
}
```

### Count-down in binary

Simply reverse the for-loop.

```c
void count_down(){
    for(int i = 255; i >= 0; i--){ //count down 255-0
        LATA = i;
        delay(200);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
    }
}
```

### Count-up in Gray

As you've seen it the linked above tutorial, converting a decimal number to Gray involves moving bits.

```c
void count_up_gray(){
    for(int i = 0; i < 256; i++){ //count up 0-255
        int gray = i ^ (i >> 1); //convert to gray - move bit
        LATA = gray;
        delay(250);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
    }
}
```

### Count-down in Gray

Again lets just reverse the for-loop.

```c
void count_down_gray(){
    for(int i = 255; i >= 0; i--){ //count down 255-0
        int gray = i ^ (i >> 1); //convert to gray
        LATA = gray;
        delay(250);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
    }
}
```

### Count-up in BCD

This one is a little trickier - BCD is a binary-coded decimal, which uses 4 bits to code a sigle digit. That's why our counter is 2x4 - so we have a tens and an ints value. When displaying it on 8 LEDs we first push the tens to the far-left 4 bits and then add the ints.

```c
void count_up_bcd(){
    for(int i = 0; i < 100; i++) { //count up 0-99
        int bcd1 = i / 10; //tens
        int bcd2 = i % 10; //units
        LATA = (bcd1 << 4) | bcd2; //tens go on first 4 leds, then units
        delay(250);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
    }
}
```

### Count-down in BCD

```c
void count_down_bcd(){
    for(int i = 99; i >= 0; i--) { //count down 99-0
        int bcd1 = i / 10; //tens
        int bcd2 = i % 10; //units
        LATA = (bcd1 << 4) | bcd2; //tens go on first 4 leds, then units
        delay(250);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
    }
}
```

### 3-bit Snake

First I declared a list of `numbers` that containt all possible positions of the "snake". Since its a 3-bit block moving on an 8-bit space we only have 6 possible combinations.
To control which position to display we have `index` - it's passed to the numbers list - and to control the direction of reading the list we have `direction` - either to the left or to the right.

```c
void snake(){
    int numbers[] = {7, 14, 28, 56, 112, 224}; //all positions of snake
    int index = 0; //which position to display
    int direction = 1; //1 to the left, -1 to the right
    while (1){ //breaks if buttons=pressed
        LATA = numbers[index]; //display led position
        delay(250);
        index += direction; //traverse list based on move direction
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
        if(index == 5) {
            direction = -1; //if all positions displayed, change direction
        } else if (index == 0) { //if we went all the way to the left
            direction = 1; //go right
        }
    }
}
```

### Stack

I first divided my LEDs into two groups - one that is mounted on the stack `baza` and one that will be 'moving'. To showcase the moving part I declared `index` that will represent the currently moving LED. `base_index` is the index of the far-left free bit (free meaning not turned on) and will change once a moving bit stops at that index.
We are displaying the mounted LEDs and the moving one - until all LEDs are on and display reaches `=255`.

```c
void stack(){
    int index = 0; // power of 2 (for "units")
    int baza = 0; // value already on the end of stack
    int base_index = 7; // power of saved value
    int display = 0;
    while(display < 256){ //stop when stack is full = all leds on
        display = baza + (1 << index); // "saved" on stack + moving
        LATA = display;
        delay(250);
        if(BUTTON_IsPressed(BUTTON_S3) | BUTTON_IsPressed(BUTTON_S4)){
            break;
        }
        index++; //"moving" piece on stack
        if (index > base_index){ //if "moving" led is past his place
            index = 0; //reset for next moving piece
            baza = baza + (1 << base_index); //save value of saved led
            base_index--; //place for next to save moved to the right
        }
    }
}
```

### Pseudo Random Number Generator

I declared the first seed (in decimal) outside the function - each time we enter the program we will be starting with the first seed.
The numbers and operations used are from the tutorial I mentioned above.

```c
int seed = 115; //seed for first generation
void pseudo()
{
    while(1){ //break if buttons=pressed
        int m = pow(2, 32);
        int a = 22695477; //random number
        int new_num = (a * seed + 1) % m; //+see sources used
        new_num &= 63; //convert to 6-bit
        LATA = new_num; //display
        
        if(BUTTON_IsPressed(BUTTON_S5)){ //if S5 - generate new
            seed = new_num; //next num will be based on previous num
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

## Conclusion

Be on the lookout for the rest of my Introductory microcontroller tasks :blush:
