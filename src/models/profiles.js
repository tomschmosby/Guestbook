const mongoose = require('mongoose');

// anlegen des Json schemas für die Collection Profiles
const profilesSchema = mongoose.Schema({
        macadresse: {
        type: string,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      sniffer: {
        type: String,
        required: true
      },
      freinds: {
        type: String,
        required: true
      },
      closefreinds: {
        type: String,
        required: true
      },
      ts: {
        type: Date,
        default: Date.now(),
      }
});



module.exports = mongoose.model('profiles', profilesSchema);