const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const chefSchema = new mongoose.Schema({
        // "_id": false,
        // date:{
        //     type: Date,
        //     required:true
        // },
        name:{
          type: String,
          required:true
        },
        country:{
          type: String,
          required:true
        },
        state:{
          type: String,
          required:true
        },
        experience:{
          type: Number,
          required:true
        },
        foodCountry:{
          type: String,
          required:true
        },
        foodType:{
        type: String,
        required:true
        },
        dietaryType:{
          type: String,
          required:true
        },
        description:{
          type: String,
          required:true
        },
        dishImage:{
          type: [String],
          maxlength: 5,
          default: undefined
        },
        certificate:{
          type: String,
        },
        restaurantHouse:{
          type: Schema.Types.ObjectId,
          ref : "RestaurantHouse",
        },
        user_id:{
          type: Schema.Types.ObjectId,
          ref : "User",
          required : true,
          unique: true
        },

}, {
    timestamps: true
});

chefSchema.set("toJSON", {
  virtuals: true,
});


const Chef = new mongoose.model("Chef", chefSchema);

module.exports = Chef;