const mongoose = require('mongoose');

// anlegen des Json schemas für die Collection Events
const eventsSchema = mongoose.Schema({
        macadressen: [],
      name: {
        type: String,
        required: true
      },
      sniffer: {
        type: String,
        required: true
      },
      ts: String,
});



module.exports = mongoose.model('events', eventsSchema);