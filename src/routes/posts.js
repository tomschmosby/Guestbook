//einbinden von tools und Files
const express = require('express');
const router = express.Router();
const Sniffer = require('../models/SniffResults');
const Profile = require('../models/UserProfiles');
const Event = require('../models/events');
const dbhandler = require('../databasehandler');




//finde einen Bestimmten Sniffer Index in der Sniffer Collection
router.get('/', async (req, res) => {
    try {
        const sniffers = await Sniffer.find();
        res.json(sniffers);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.get('/events', async (req, res) => {
    Event.find()
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});

//Post endpoint für Events anlegen Frontend
router.post('/event', async (req, res) => {
    Event({
            name: req.body.name,
            sniffer: req.body.sniffer,
            longitude: req.body.longitude,
            latitude: req.body.latitude,         
            maxguests: req.body.maxguests,
        })
        .save()
        .then((res) => res.json(res)).catch((err) => res.json({
            message: err
        }));
});



//Post endpoint für Profiles anlegen Frontend
router.post('/profiles', async (req, res) => {
    Profile({
        name: req.body.name,
        address: req.body.address,
        macadresse: req.body.userMacadresse,
    }).save().then(() => res.status(200).send());
});


//Post endpoint für sniffer anlegen Frontend
router.post('/sniffers', async (req, res) => {
    dbhandler.savesnif({
        macadressen: req.body.macadressen,
        dev_id: req.body.dev_id,
        user_id: req.body.user_id,
    })
});


//Suche nach einem Profil index nach der macadresse
router.get('/profiles/:profilesId', async (req, res) => {
        Profile.findById(req.macadressen.profiles).then((data)=> res.json(data))
        .catch((err) => console.log(err));
   
});

router.post('/probe', async (req, res) => {
    // console.log("test",req.body)
    console.log(req.body.probes);
    //Finde Event das zum Snifferpasst
    try {
        //Finde Event das zum Snifferpasst
        const EventID = await Event.findOne({
            sniffer: req.body.eventsrc
        }).exec();
        // console.log(EventID)
        const newEvent = EventID;

        const probes = req.body.probes;
        for await (const p of probes) {
            const user = await Profile.findOne({
                macadresse: p.address
            });
            if (user) {  
                console.log(user);
                if (!newEvent.macadressen) newEvent.macadressen = [];
                if (!newEvent.macadressen.includes(user._id)) newEvent.macadressen.push(user._id);
                newEvent.ts = Date.now();
            }
        }
        
        await newEvent.save();

        await res.status(200).send();

// ee:fb:67:37:2a:e0
// 6c:c7:ec:82:03:e8
// 6a:89:e7:dd:5e:ac
    } catch (err) {
        res.json({
            message: err
        });
        console.log(err);
    };


});


//Event Index updaten 
router.patch('/:eventsId', async (req, res) => {
    try {
        const updatePost = await events.updateOne({
            macadressen: req.macadressen.Profile
        }, {
            $set: {
                Macadressen: req.body.title
            }
        });
        res.json(updatePost);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;