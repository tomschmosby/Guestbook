//in der Confic werden die Verbindungsdaten Zentral gelistet, Diese enthalten meist zugangs informationen, wesshalb sie im Funktionsprototyp in der Gitignore verschwindet. 

var config = {};

config.debug = process.env.DEBUG || false;

//Verbindung zum MQTT Broker 
config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || 'macadress';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || 'mqtt.hfg.design';
config.mqtt.port      = process.env.MQTT_PORT      || 1883;

//"mongodb+srv://d5K5Hf2wlybP8Ti9:<password>@cluster0.qnxj3.mongodb.net/<dbname>?retryWrites=true&w=majority"


//Verbindung zur Mongodb Datenbank Guestbook 
config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || 'd5K5Hf2wlybP8Ti9';
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'guestbook';
config.mongodb.collectionp = process.env.MONGODB_COLLECTION || 'profiles';
config.mongodb.collectione = process.env.MONGODB_COLLECTION || 'events';
config.mongodb.collections = process.env.MONGODB_COLLECTION || 'sniffers';


config.mongodb.constring = "mongodb+srv://d5K5Hf2wlybP8Ti9:CEjMjo2cSEv8WtAZ@cluster0.qnxj3.mongodb.net/guestbook?retryWrites=true&w=majority"
module.exports = config;


