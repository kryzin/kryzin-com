---
slug: "microcontrollers-2"
title: "Measuring Temperature with Microcontrollers"
date: "2023-05-19"
tags: ["microcontrollers","c"]
altfeatured: "technical drawing of a TC1047A temp sensor"
featured: "../images/post-0004.png"
locale: "en"
---

Working on PIC24FJ128GA010 I wrote a program that checks the current temperature and if it reaches a certain limit (25 degrees Celcius) it triggers an alarm (flashing LEDs).

## Prerequisites

Instead of working with a TC1047A temperature meter, the code uses the manual Potentiometer (I have commented out input from the temp meter)
I will also implement simple tests (to test `LED_10` and to test all LEDs) and a manual switch for the alarm.

## Implementation

### Base

To keep track of the alarm I declared two bool variables, `alarm` that sets true once the temperature reaches our limit and `was_alarm` that sets true after one alarm trigger and resets if the temperature goes down. `manual` controls if the alarm trigger is active. The `S3` button controls the LED_10 test, `S6` controls all LEDs test, and `S4` controls the manual/auto alarm trigger.
If we are not in manual mode, we read the temperature from the ADC channel, format it using `sprintf` and display it on the LCD screen. If the measured temperature is higher than our limit, we set the alarm to true.
All the `if` statements should be put in an infinite loop.
Under the temp input, there is a commented-out input from the actual temp sensor.

```c
//main() in main.c
SYS_Initialize ( ) ;
TIMER_SetConfiguration ( TIMER_CONFIGURATION_RTCC ) ;
ADC_SetConfiguration ( ADC_CONFIGURATION_AUTO_SAMPLE_CONVERT ) ;
bool alarm = false; //true if limit is reached
bool was_alarm = false; //alarm won't repeat if temp=same or higher
bool manual = false; //S4 to activate manual control
int temperature = 0;

if (BUTTON_IsPressed ( BUTTON_S3 )){
     manual = false;
     alarm = false;
     was_alarm = false;
     test_d10(); //start testing d10
}
//Test all LEDs
if (BUTTON_IsPressed ( BUTTON_S6 )){
     //reset alarm
     manual = false;
     alarm = false;
     was_alarm = false;
     test_all(); //start testing all LEDs
}
// manual control = on
if (BUTTON_IsPressed ( BUTTON_S4 )){
     LATA = 0;
     alarm = !alarm;
     manual = !manual;
}
if (manual == false){//check if manual control
     temperature = ADC_ReadPercentage(ADC_CHANNEL_POTENTIOMETER);
//   temperature = ADC_ReadPercentage(ADC_CHANNEL_TEMPERATURE_SENSOR);
     char str[12];
     sprintf(str, "% Temp: %d", temperature); //format temp
     LCD_ClearScreen ();
     LCD_PutString(str, sizeof(str)); //display measured temp
            
     if (temperature >= 75) alarm = true; //on a scale 0-100 limit=75
     else alarm = false;
}
```

### The Alarm

Still, in an infinite loop, this is how our alarm works. If we should initiate it, first the LED_10 is flashing for 3s, and then all LEDs turn on. After the alarm, we set `was_alarm` to true.

```c
//main()
//Initiate alarm
        if (alarm == true){
            if (was_alarm == false){
                for (int i = 0; i <= 6; i++){ //blink for 3s(250*2*6=3000)
                LED_On(LED_D10);
                delay(250);
                LED_Off(LED_D10);
                delay(250);
            }           
            LATA = 255;
            }
            was_alarm = true; //for not repeating after each measure
        }
        if (alarm == false){//if temp is down
            was_alarm = false;
            LATA = 0;
        }
```

### Tests

The functions for testing LEDs.

```c
void test_d10(){
    LATA = 0;
    while(1){
        LED_On(LED_D10); //blink on
        delay(300);
      
        if (BUTTON_IsPressed ( BUTTON_S3 )){
            Break;
        } //check if we want to exit the test
        
        LED_Off(LED_D10); //blink off
        delay(300);
    }
}

void test_all(){
    LATA = 255; //all on
    bool on = true; //are they on?
    while(1){
        if (BUTTON_IsPressed ( BUTTON_S6 )){//S6 to turn on/off
            on = !on; //if on then off, else on
        }
        delay(350);
        if (on == true) LATA = 255;
        else LATA = 0;
        
        if (BUTTON_IsPressed ( BUTTON_S3 )){
            break;
        }
    }
}
```
