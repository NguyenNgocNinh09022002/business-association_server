const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postModel = new Schema({
    title: { type: String, require: true },
    postTypeID: {type: String},
    desription: {type: String},
    content: { type: String, require: true },
    attachments: { type: Array },
    state: {type: String},
    parentID: {type: String},
    slug: {type:String, slug:'title', unique: true},
    
},{timestamps:true} )

module.exports = mongoose.model("Post",postModel)