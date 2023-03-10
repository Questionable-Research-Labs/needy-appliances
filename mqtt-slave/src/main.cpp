#include <Arduino.h>
#include <PubSubClient.h>
#include <WiFiManager.h>  //https://github.com/tzapu/WiFiManager

WiFiClient wifiClient;


void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    for (unsigned int i = 0; i < length; i++) {
	Serial.print((char)payload[i]);
    }
    Serial.println();

    // Switch on the LED if an 1 was received as first character
    if ((char)payload[0] == '1') {
		digitalWrite(BUILTIN_LED, LOW);	 // Turn the LED on (Note that LOW is the voltage level
						// but actually the LED is on; this is because
						// it is active low on the ESP-01)
    } else {
		digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
    }
}

IPAddress mqttServer = IPAddress(10, 42, 0, 1);
PubSubClient client(mqttServer, 1883, callback, wifiClient);

unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;


void reconnect() {
    // Loop until we're reconnected
    while (!client.connected()) {
		Serial.print("Attempting MQTT connection...");
		// Create a random client ID
		String clientId = "ESP8266Client-";
		clientId += String(random(0xffff), HEX);
		// Attempt to connect
		if (client.connect(clientId.c_str())) {
			Serial.println("connected");
			// ... and resubscribe
			client.subscribe("ACTION");
		} else {
			Serial.print("failed, rc=");
			Serial.print(client.state());
			Serial.println(" try again in 5 seconds");
			// Wait 5 seconds before retrying
			delay(5000);
		}
    }
}

void setup() {
	pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
    Serial.begin(115200);
    Serial.println("MQTT Slave Booting");
    Serial.println("Starting WiFiManager");
    // WiFiManager
    // Local intialization. Once its business is done, there is no need to keep it around
    WiFiManager wifiManager;

    // reset saved settings
    // wifiManager.resetSettings();
    wifiManager.setConnectRetries(6);
    wifiManager.setDarkMode(true);
    wifiManager.setCountry("NZ");
    wifiManager.autoConnect();

    Serial.println("Wifi Setup Complete");

	  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("no");

}

void loop() {

    if (!client.connected()) {
		reconnect();
    }
    client.loop();
}