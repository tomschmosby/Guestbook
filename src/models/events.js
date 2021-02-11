const mongoose = require('mongoose');

// anlegen des Json schemas für die Collection Events
const eventsSchema = mongoose.Schema({
        macadressen: {
        type: array,
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
});



module.exports = mongoose.model('events', eventsSchema);