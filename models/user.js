var mongoose=require('mongoose');

var user=mongoose.model('user',{
    email:{
        required:true,
        type:String,
        minlength:1,
        trim:true
    }
});
module.exports={user};