//die Index.js bildet das Haupt script um das Backend zu starten und zu erreichen, es fürt auch die verlinkten weiteren scripts aus

//Einbinden von Tools und Files
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', '.env')})
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const cors = require('cors');
const dbhandler = require('./databasehandler');

const port = 3001;


//Middlewares
app.use(cors());
app.use(bodyParser.json());


//Routes
const postsRoute = require('./routes/posts');



app.use(postsRoute);

//when you opne this endpoint in the browser the folling text will appear 
app.get('/', (req, res) => {
    res.send('Kellerzone');
});

//Connect To DB
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true}, (err)=> 
    console.log(err)
);

// //connect to MQTT 
// client.on('connect', function () {
//     client.subscribe(config.mqtt.namespace);
//     console.log("MQTT connected")
// });

//MQTT Sniffer daten zur Datenbank
/*client.on('message', function (topic, message) {
    // message is Buffer
    const data = JSON.parse(message.toString());
    console.log("data");
    console.log(data);
    dbhandler.savesnif({
     macadressen: data.macadressen,
     dev_id: data.dev_id,
     user_id: data.user_id
    })
    .then((res) => console.log(res)).catch((err) => console.error(err));
  });
  
*/
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });



