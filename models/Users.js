const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
        email:{
            type:String,
            required:false,
            // unique: true
        },
        phone:{
            type:String,
            required:false,
            // unique: true
        },
        password:{
            type:String,
            required:true,
        },
        isVerified :{
            type:Boolean,
            default : false
        }
    // first_name : String,
    // last_name : String,
    // email : String,
    // password : String,
    // profile_pic : String,
    // mobile_numbre : String,
    // contact_number : String,
    // role_id  : String,
    // is_deleted : String,
    // is_active  : String,
    // created_at   : String,
    // updated_at  : String,
}, {
    timestamps: true
});

const User = new mongoose.model("User",UserSchema);

module.exports = User;