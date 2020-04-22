const mongoose=require("mongoose");
const user= new mongoose.Schema({
    name:{
        type:String
    },
    position:{
        type:String
    },
    location:{
        type:String
    },
    salary:{
        type:Number
    }
});
User=mongoose.model('user', user);
module.exports=User;