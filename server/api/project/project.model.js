'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  info: String,
    url: String,
    client: String,
    date: String,
    short_info: String,
    main_img: String,
    imgs: Array,
  active: Boolean,
    archived: Boolean,
    created: Date
});

module.exports = mongoose.model('Project', ProjectSchema);