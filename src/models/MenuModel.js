const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const menuModel = new Schema({
    name: {type: String},
    parentID: {type: String},
    slug: { type:String, slug: 'name', unique: true }
}, {timestamps: true})

module.exports = mongoose.model('Menu', menuModel)