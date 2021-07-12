// der Datenbankhandler enthaellt die Logic für die verarbeitung der Middle ware.

//Importieren der Schemes
const Sniff = require('./models/SniffResults');
const Profile = require('./models/UserProfiles');
const Event = require('./models/events');

//Sniffer Jsons in DB ablegen 
function savesnif(data) {
  return new Promise(async (resolve, reject) => {
    const snif = new Sniff({
      app_id: data.app_id,
      dev_id: data.dev_id,
      payload_fields: JSON.stringify(data.payload_fields),
      metadata: JSON.stringify(data.metadata),
    });
    console.log(snif)

    try {
      const savedSniff = await snif.save()
      resolve(savedSniff);
    } catch (err) {
      reject(err);
    }
  });
}

//Profile Jsons in Profile ablegen
function saveprof(data) {
    return new Promise(async (resolve, reject) => {
      const prof = new Profile({
        app_id: data.app_id,
        dev_id: data.dev_id,
        payload_fields: JSON.stringify(data.payload_fields),
        metadata: JSON.stringify(data.metadata),
      });
      console.log(prof);
  
      try {
        const savedProf = await prof.save()
        resolve(savedProf);
      } catch (err) {
        reject(err);
      }
    });
  }


  //Event jsons in Event ablegen
  function saveevent(data) {
    return new Promise(async (resolve, reject) => {
      const event = new Event({
        macadressen: req.body.macadressen,
        name: req.body.name,
        sniffer: req.body.sniffer
      });
      console.log(event);
  
      try {
        const savedEvent = await event.save()
        resolve(savedEvent);
      } catch (err) {
        reject(err);
      }
    });
  }

  
module.exports = {
  savesnif,
  saveevent,
  saveprof,
};