const mongoose=require("mongoose");


const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

mongoose.model("User",userSchema,"users");