const mongoose = require('mongoose');
const { Schema } = mongoose;

const SchemaUser = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: { // Corrected field name
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
  
   
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', SchemaUser);
