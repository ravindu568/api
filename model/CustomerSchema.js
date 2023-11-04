const mongoose=require('mongoose');

const CustomerSchema=new mongoose.Schema({
    nic:{type:String,require:true},
    name:{type:String,require:true},
    address:{type:String,require:true},
    salary:{type:String,require:true}
});

module.exports=mongoose.model('Customer',CustomerSchema);