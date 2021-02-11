//einbinden von tools und Files
const express = require('express'); 
const router = express.Router();
const Sniffer = require('../models/sniffers');
const Profile = require('../modules/profiles');
const Events = require('../modules/events');
const dbhandler = require('../databasehandler');


//finde einen Bestimmten Sniffer Index in der Sniffer Collection
router.get('/',async (req,res) => {
    try {
        const sniffers = await Sniffer.find();
        res.json(sniffers);
    }catch(err){
        res.json({ message:err });
    }
});


//Post endpoint für Events anlegen Frontend
router.post('/event', async (req, res) => {
   dbhandler.saveevent({
       macadressen: req.body.macadressen,
       name: req.body.name,
       sniffer: req.body.sniffer
     })
     .then((res) => res.json(res)).catch((err) => res.json({
        message: err
   }));
});
  


//Post endpoint für Profiles anlegen Frontend
router.post('/profiles', async (req, res) => {
    dbhandler.saveprof({
        macadressen:req.body.macadressen,
        name:req.body.name,
        sniffer:req.body.name,
        freinds:req.body.friends,
        closefreinds:req.body.closefreinds,
        ts:req.body.ts,
    })
    });
  

//Post endpoint für sniffer anlegen Frontend
router.post('/sniffers', async (req, res) => {
    dbhandler.savesnif({
        macadressen:req.body.macadressen,
        dev_id:req.body.dev_id,
        user_id:req.body.user_id,
    })
    });


//Suche nach einem Profil index nach der macadresse
router.get('/:profilesId', async (req,res) =>{
    try{
        Profile = await Post.findById(req.macadressen.profiles)
        res.json(Profile);
    } catch (err) {
        // res.json({ message: No Profile Found});
    }  
});


//Event Index updaten 
router.patch('/:eventsId', async (req,res) => {
    try{
        const updatePost = await events.updateOne(
            { macadressen: req.macadressen.Profile },
            { $set: { Macadressen: req.body.title } }
        );
        res.json(updatePost);
     }catch (err){
         res.json({ message: err });    
    }
});

module.exports = router;
