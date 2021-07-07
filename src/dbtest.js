const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://d5K5Hf2wlybP8Ti9:CEjMjo2cSEv8WtAZ@cluster0.qnxj3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log(err)
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});