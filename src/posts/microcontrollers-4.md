---
slug: "microcontrollers-4"
title: "Simulating a Microwave LCD screen"
date: "2023-05-21"
tags: ["microcontrollers","c","lcd"]
altfeatured: "microwave oven"
featured: "../images/post-0005.jpg"
---

I'm trying to get better at managing LCD screens so today I'll try creating a microwave oven display. Complete with choosing the power, setting the time, and the countdown timer.

## Implementation

### Timer func

Given a previously set time length the timer with count down and change the display screen each second - showing a formatted time left. If an `S4` button is pressed - the timer will pause and go back to the main function (from then it can either restart or reset to 0).

```c
int time = 0; //count down time
void timer(int t){
    unsigned int i;
    for (i = 0; i <= t; i++){
        int sec2 = t - i; //for visual representation
        int min2 = sec2 / 60;
        sec2 %= 60;
        char time_str2[9]; //to set how much space taken by display
        snprintf(time_str2, sizeof(time_str2), "%02d:%02d", min2, sec2);
        LCD_ClearScreen ( ) ;
        LCD_PutString ( time_str2, sizeof(time_str2));
        delay(1000); //check if stop/reset pressed after each second
        if (BUTTON_IsPressed ( BUTTON_S4 )){ //stop
            delay(200);
            time = t;
            break;    
        }
    }
    //timer-end alarm
    if (t == 0){
       time = 0;
       for ( i = 0; i <= 5; i++){ //flash fancy LEDs when alarm goes off
        LATA = 170; // blink all even LEDs or all not even
        delay(300);
        LATA = 85;
        delay(300);
        }  
    }
    time = t;   
}
```

### Main - choosing power

In an infinite loop in `main()` I declared `program=0` and `power[11]` (to use in formatting `sprintf`). Choosing the power starts when the button `S3` is pressed. In a simple switch case, we set the LEDs to showcase the power and also display it on the screen. If we are satisfied with the power, we press `S4` to exit the loop.

```c
if (BUTTON_IsPressed ( BUTTON_S3 )){
// setting power is stopped when we press S4
            while( !BUTTON_IsPressed ( BUTTON_S4 ) ){
                //choosing the power (800W-0,600W-1,350W-2,200W-3)
                switch (program){
                    case 0:
                        LATA = 255; //max power = max LEDs
                        snprintf(power, sizeof(power), "Power 800W");
                        LCD_ClearScreen ( ) ; //clear LCD screen
                        LCD_PutString ( power, sizeof(power)); //display
                        break;
                    case 1:
                        LATA = 63;
                        snprintf(power, sizeof(power), "Power 600W");
                        LCD_ClearScreen ( ) ;
                        LCD_PutString ( power, sizeof(power));
                        break;
                    case 2:
                        LATA = 15;
                        snprintf(power, sizeof(power), "Power 350W");
                        LCD_ClearScreen ( ) ;
                        LCD_PutString ( power, sizeof(power));
                        break;
                    case 3:
                        LATA = 3;
                        snprintf(power, sizeof(power), "Power 200W");
                        LCD_ClearScreen ( ) ;
                        LCD_PutString ( power, sizeof(power));
                        break;
                }
                delay(200);
                if (BUTTON_IsPressed ( BUTTON_S3 )){ //go to next setting
                    program ++; //if we are still holding S3
                    delay(300);
                }
                if (program == 4) program = 0;
            }
            LCD_ClearScreen();
        }
```

### Main - setting and running the timer

Pressing `S6` adds 1min to the clock, pressing `S5` adds 10 seconds, pressing `S4` starts the timer, and pressing it for longer than 2s resets the clock to 0.

```c
if (BUTTON_IsPressed ( BUTTON_S6 )){ //S6 add 1min to timer
    time += 60;
    delay(250);
}

if (BUTTON_IsPressed ( BUTTON_S5 )){ //S5 add 10s to timer
    time += 10;
    delay(250);
}
        
//display timer - same as in timer() func
int sec = time;
int min = sec / 60;
sec %= 60;
char time_str[9];
snprintf(time_str, sizeof(time_str), "%02d:%02d", min, sec);
LCD_ClearScreen ( ) ;
LCD_PutString ( time_str, sizeof(time_str));

//S4 start/stop/reset timer
if (BUTTON_IsPressed ( BUTTON_S4 )){
    //start timer
    timer(time);
    LATA = 0;
    delay(200);
    //stop inside timer func
    //reset if pressed again
    if (BUTTON_IsPressed ( BUTTON_S4 )){ //reset
        time = 0;
    }
}
```

The next post will also focus on LCD screens - I'll be implementing a chess clock.
