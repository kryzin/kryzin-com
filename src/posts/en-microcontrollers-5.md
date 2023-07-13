---
slug: "microcontrollers-5"
title: "Chess Clock on an LCD screen"
date: "2023-05-22"
tags: ["microcontrollers","c","lcd", "chess"]
altfeatured: "Chess Clock with LCD"
featured: "../images/post-0006.jpg"
locale: "en"
---

This is the code for a Chess Clock - with a timer for each player, turn indicators, and switches.

## Implementation

### Base-setting game time

Using the ADC channel (same as in this post! - [Temp measure on PIC24](https://kryzin.netlify.app/blog/microcontrollers-2/)) we can switch between 3 pre-set game times: 5min, 3min, and 1min. The time is displayed on the screen.

```c
#define TIME_5 300 // 5 min
#define TIME_3 180 // 3 min
#define TIME_1 60  // 1 min

int main ( void ){
    SYS_Initialize ( ) ;
    TIMER_SetConfiguration ( TIMER_CONFIGURATION_RTCC ) ;
    ADC_SetConfiguration ( ADC_CONFIGURATION_AUTO_SAMPLE_CONVERT ) ;
    int setting_time; // one of the options - 1,3,5
    int time; //read from ADC
    char message[10];

    while (1) {
        // read time setting 
        time = ADC_ReadPercentage(ADC_CHANNEL_POTENTIOMETER);
        //Set time based on setting
        if (time >= 66){ //move adc to the right for max time
            LCD_ClearScreen ( ) ;
            snprintf( message, sizeof(message), "time:5min" );
            LCD_PutString ( message, sizeof(message));
            setting_time = TIME_5;
        }
        if(time < 66 && time >= 33){//keep it in the middle to set to 3min
            LCD_ClearScreen ( ) ;
            snprintf(message, sizeof(message), "time:3min");
            LCD_PutString ( message, sizeof(message));
            setting_time = TIME_3;
        }
        if(time < 33){//move adc to the left to set time for 1min
            LCD_ClearScreen ( ) ;
            snprintf(message, sizeof(message), "time:1min");
            LCD_PutString ( message, sizeof(message));
            setting_time = TIME_1;
        }
        
        if (BUTTON_IsPressed ( BUTTON_S4 )){//start game - player1 S3
            start_game(setting_time);   
        }

    }
    return 0;
}
```

### Game Timer

This one was a little trickier. I feel like I added way too many side variables but couldn't figure out how to lower the number without losing functionality.
Let's try to get through this: `t1` and `t2` are the main variables keeping each player's time left - we set them to the chosen game time.
The `sec`/`sec2` and `min`/`min2` are for timer display formatting.
Player 1 sits on the left, and Player 2 on the right. In the `while` loop we are checking if either timer runs out and if so we turn on an alarm and display an ending message. If those `if` statements were omitted we start counting down the time left of the active player - the display shows both timers, and 4 far-right or far-left LEDs are turned on depending on which player is active.
Each player has a button to press after making a move - `S3` for player 1 and `S4` for player 2.

```c
void start_game(int t){
    int player=2; //first move is player2
    int t1 = t; //main - how much time left
    int t2 = t;
    int sec = t; //for visual - how much left
    int sec2 = t;
    char message2[13]; //for putstring func
    bool end = false;
    
    while(end != true){ //do until game ends
        if (t1 == 0){ //check if player1 lost the game
            LCD_ClearScreen ( ) ;
            LCD_PutString ( "PLAYER1 LOST", sizeof(message2));
            for ( int i = 0; i <= 5; i++){
                //flash fancy LEDs when time ends
                LATA = 170;
                delay(300);
                LATA = 85;
                delay(300);
            }  
            LATA = 0;
            end = true; //end loop
            break;
        }
        if (t2 == 0){ //check if player2 lost the game
            LCD_ClearScreen ( ) ;
            LCD_PutString ( "PLAYER2 LOST", sizeof(message2));
            for ( int i = 0; i <= 5; i++){
                //flash fancy LEDs when time ends
                LATA = 170;
                delay(300);
                LATA = 85;
                delay(300);
            }  
            LATA = 0;
            end = true; //end loop
            break;
        }
        
        if (player == 1){ //if it is p1’s turn
            LATA = 240; //4 LEDs on the left
            int min2 = sec2 / 60; //for LCD
            sec2 %= 60; //for LCD
            //t is the time setting (5,3,1)
            for (int i = 0; i <= t1; i++){
                t1 -= i; //for - for each second 
                sec = t1;
                int min = sec / 60;
                sec %= 60;
                char time_str2[19]; // display timers
                snprintf(time_str2, //sorry for the formatting
                         sizeof(time_str2), //limited space and
                         "%02d:%02d %02d:%02d", //long line
                         min, sec, min2, sec2);
                LCD_ClearScreen ( ) ;
                LCD_PutString ( time_str2, sizeof(time_str2));
                delay(1000); //1s
                if (BUTTON_IsPressed ( BUTTON_S3 )){
                    player = 2;
                    break;
                }
            }
        }
        if (player == 2){ //if it is p2’s turn
            LATA = 15; //4 LEDs on the right
            int min = sec / 60;
            sec %= 60;
            //t is the time setting
            for (int i = 0; i <= t2; i++){
                t2 -= i;
                sec2 = t2;
                int min2 = sec2 / 60;
                sec2 %= 60;
                char time_str2[19];
                snprintf(time_str2, //sorry for the formatting
                         sizeof(time_str2), //limited space and
                         "%02d:%02d %02d:%02d", //long line
                         min, sec, min2, sec2);
                LCD_ClearScreen ( ) ;
                LCD_PutString ( time_str2, sizeof(time_str2));
                delay(1000); //1s
                if (BUTTON_IsPressed ( BUTTON_S4 )){
                    player = 1;
                    break;
                }
            }
        }
    }
}
```

Thanks for reading! :heart:
