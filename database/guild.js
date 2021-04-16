const mongoose = require('mongoose');
const  config  = require('../config.json')

const guildConfigSchema = mongoose.Schema({

  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  prefix: {
    type: mongoose.SchemaTypes.String,
    required: true,
    default: config.prefix || 'rr!'
  },

  reactionDM: {
    type: Boolean,
    default: true
    },

  reactionLogs: {
      type: mongoose.SchemaTypes.String,
      default: null,
      required: false,
    },

});

module.exports = mongoose.model('guild', guildConfigSchema);