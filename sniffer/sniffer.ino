//Um diesen Sketch zu verwenden muessen dieses 6 Librarys eingebunden werden.

#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <vector>
#include <WiFiManager.h> 

//Der Sketch ist für ein ESP8266 Board ausgelegt nach dem flashen genügt es ihn über ein Usb Kabel an strom an zu schließen.
//Er Wifi Manager ist dann über ein beliebiges gerät als Wifi Client under dem namen "AutoConnect AP" sichtbar.
//Nach dem der Wifi-Client auswählt ist kann man über die Adresse: "192.168.4.1" Im browser das Dialog Fenster geöffnet werden.
//Dann einfach Under "Configure WiFi" die SSiD und das Passwort des Gewünschten Netztwerks eingeben und der Sniffer wird nach kurzer Zeit daten an das Backend schicken.



const char* apSsid     = "ap-ssid";
const char* apPassword = "ap-password";


HTTPClient http;

WiFiEventHandler probeRequestPrintHandler;

String macToString(const unsigned char* mac) {
  char buf[20];
  snprintf(buf, sizeof(buf), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
  return String(buf);
}

std::vector<WiFiEventSoftAPModeProbeRequestReceived> myList;

void onProbeRequestPrint(const WiFiEventSoftAPModeProbeRequestReceived& evt) {
  myList.push_back(evt);
}

void setup() {
  Serial.begin(115200);
  Serial.println("Hello!");

  Serial.println(WiFi.macAddress());

 // WiFiManager
  // Local intialization. Once its business is done, there is no need to keep it around
  WiFiManager wifiManager;
   // Uncomment and run it once, if you want to erase all the stored information
  //wifiManager.resetSettings();
  
  // set custom ip for portal
  //wifiManager.setAPConfig(IPAddress(10,0,1,1), IPAddress(10,0,1,1), IPAddress(255,255,255,0));

  // fetches ssid and pass from eeprom and tries to connect
  // if it does not connect it starts an access point with the specified name
  // here  "AutoConnectAP"
  // and goes into a blocking loop awaiting configuration

  wifiManager.autoConnect("AutoConnectAP");

  // Don't save WiFi configuration in flash - optional
  //WiFi.persistent(false);

  // http://192.168.4.1 Für die inbetreibnahme besuchen und ssid und passwort eingeben in dem der sniffer das event trackt
  

  //WiFi.mode(WIFI_AP_STA);
  //WiFi.softAP(apSsid, apPassword);
  //WiFi.begin(clientSsid, clientPassword);
  //while (WiFi.status() != WL_CONNECTED) {
   // Serial.print(".");
  //  delay(100);
  //}
  Serial.println("");
  probeRequestPrintHandler = WiFi.onSoftAPModeProbeRequestReceived(&onProbeRequestPrint);
}

void loop() {
  delay(3000);
  String json = "";
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  JsonArray& probes = root.createNestedArray("probes");
  for(WiFiEventSoftAPModeProbeRequestReceived w : myList){
    JsonObject& probe = probes.createNestedObject();
    probe["address"] = macToString(w.mac);
    probe["rssi"] = w.rssi;
  }
  root["eventsrc"] = WiFi.macAddress();
  myList.clear();
  root.printTo(json);
  Serial.println("json:" + json);

   http.begin("https://guestbookbe.ds.ava.hfg.design//probe");
  
  http.addHeader("Content-Type", "application/json");
  http.POST(json);
  http.end();
}
