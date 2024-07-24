const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PartnerModel = new Schema({
    name: { type: String },
    address: { type: String },
    email: { type: String },
    website: {type: String},
    logo: { type: String },
    phone: { type: String},
    slug: {type:String, slug: 'name', unique: true}
   
},{timestamps: true})

module.exports = mongoose.model("Partner",PartnerModel)
