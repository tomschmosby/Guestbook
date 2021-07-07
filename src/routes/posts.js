//einbinden von tools und Files
const express = require('express');
const router = express.Router();
const Sniffer = require('../models/sniffers');
const Profile = require('../models/profiles');
const events = require('../models/events');
const dbhandler = require('../databasehandler');
const profiles = require('../models/profiles');
const {
    insertMany
} = require('../models/sniffers');


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
        macadressen: req.body.macadressen,
        name: req.body.name,
        sniffer: req.body.name,
        freinds: req.body.friends,
        closefreinds: req.body.closefreinds,
        ts: req.body.ts,
    })
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
router.get('/:profilesId', async (req, res) => {
    try {
        Profile = await Post.findById(req.macadressen.profiles)
        res.json(Profile);
    } catch (err) {
        // res.json({ message: No Profile Found});
    }
});

router.post('/probe', async (req, res) => {
    // console.log("test",req.body)
    console.log(req.body.probes)
    //Finde Event das zum Snifferpasst
    try {
        //Finde Event das zum Snifferpasst
        const EventID = await events.findOne({
            sniffer: req.body.eventsrc
        }).exec();
        // console.log(EventID)



        //Finde User in Profiles liste wenn einer gefunden wird Update Event um das Profil als gast
        req.body.probes.forEach(async (p) => {
            // console.log(p);
            profiles.findOne({
                macadresse: p.address
            }).then((User) => {
                if (User) {  
                    console.log(User);
                    const newEvent = EventID;
                    if (!newEvent.macadressen) newEvent.macadressen = [];
                    newEvent.macadressen.push(User._id);
                    newEvent.ts = Date.now();
                    newEvent.save();
                }
            });
        });

        res.status(200).send();

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