#include <action.h>

const int RELAY_ADDRESS = 12;

void startAction() {
    // Turn the LED on (Note that LOW is the voltage level
    digitalWrite(RELAY_ADDRESS, HIGH);

}

void stopAction() {
    // Turn the LED off by making the voltage HIGH
    digitalWrite(RELAY_ADDRESS, LOW);
}

void setupAction() {
	pinMode(RELAY_ADDRESS, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
    digitalWrite(RELAY_ADDRESS, LOW);

}