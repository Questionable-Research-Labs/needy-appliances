#include <action.h>

void startAction() {
    // Turn the LED on (Note that LOW is the voltage level
    digitalWrite(BUILTIN_LED, LOW);
}

void stopAction() {
    // Turn the LED off by making the voltage HIGH
    digitalWrite(BUILTIN_LED, HIGH);
}

void setupAction() {
	pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
}