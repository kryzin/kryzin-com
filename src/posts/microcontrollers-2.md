---
title: "Measuring temperature with Microcontrollers"
date: "2023-05-19"
tags: ["microcontrollers","c"]
---

Working on PIC24FJ128GA010 I wrote a program that checks the current temperature and if it reaches a certain limit (25 degrees Celcius) it triggers an alarm (flashing LEDs).

## Prerequisites

Instead of actually working with a TC1047A temperature meter the code uses the manual Potentiometer (I have commented out input from the temp meter)
I will also implement simple tests - to test `LED_10` and to test all LEDs.
