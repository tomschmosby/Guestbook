//die Index.js bildet das Haupt script um das Backend zu starten und zu erreichen, es fürt auch die verlinkten weiteren scripts aus

//Einbinden von Tools und Files
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('../config.js');
const bodyParser =require('body-parser');
const cors = require('cors');
const dbhandler = require('./databasehandler');


//Middlewares
app.use(cors());
app.use(bodyParser.json());


//Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//Routes 
app.get('/', (req, res) => {
    res.send('We are on Home');
});

//Connect To DB
mongoose.connect(config.mongodb.constring, { useNewUrlParser: true}, ()=> 
    console.log('connected to DB!')
);

//connect to MQTT 
client.on('connect', function () {
    client.subscribe(config.mqtt.namespace);
    console.log("MQTT connected")
});

//MQTT Sniffer daten zur Datenbank
client.on('message', function (topic, message) {
    // message is Buffer
    const data = JSON.parse(message.toString());
    console.log(data);
    dbhandler.savesnif({
     macadressen: data.macadressen,
     dev_id: data.dev_id,
     user_id: data.user_id
    })
    .then((res) => console.log(res)).catch((err) => console.error(err));
  });
  
//Starte Server auf port 8181
app.listen(8181);





