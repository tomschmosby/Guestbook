const mongoose = require('mongoose');

// anlegen des Json schemas für die Collection Sniffers
const snifferSchema = mongoose.Schema({
       macadressen: {
        type: Array,
        
      },
      dev_id: {
        type: String,
        required: true
      },
      user_id: {
        type: String,
      },
});



module.exports = mongoose.model('sniffers', snifferSchema);