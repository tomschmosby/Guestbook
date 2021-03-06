const mongoose = require('mongoose');

// anlegen des Json schemas für die Collection Profiles
const profilesSchema = mongoose.Schema({
      email: {
        type: String,
        unique: true,
      },
      macadresse: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      sniffer: {
        type: String,
      },
      friends: {
        type: String,
      },
      closefriends: {
        type: String,
      },
      passwordHash: String,
      ts: {
        type: String,
        default: Date.now(),
      }
});



module.exports = mongoose.model('profile', profilesSchema);