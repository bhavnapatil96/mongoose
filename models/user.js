var mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

var UserSchema=new mongoose.Schema({
    email:{
        required:true,
        type:String,
        minlength:1,
        trim:true,
        unique:true,
        // validate:{
        //     validator:validator.isEmail,
        //     message:'{value} not a email'
        // }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens:[{
        access:{
            type:String,

        },
        token:{
            type:String,

        }
    }]
})

UserSchema.methods.generateAuthToken=function(){
   // console.log(`gen`);
    var user=this;
   // console.log(this);
    var access='auth';
    var token=jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();

    user.tokens.push({access,token});
    return user.save().then(()=>{
       return token;
    });
};
var User=mongoose.model('user',UserSchema);
module.exports={User};