const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const restaurantOrHouseSchema = new mongoose.Schema({
        isHouse:{
          type: Boolean,
          required:true
       },
        location:{
          type: String,
          required:true
        },
        address:{
          type: String,
          required:true
        },
        city:{
          type: String,
          required:true
        },
        state:{
          type: String,
          required:true
        },
        zipCode:{
          type: String,
          required:true
        },
        image:{
          type: String,
          required:true
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

restaurantOrHouseSchema.set("toJSON", {
  virtuals: true,
});


const RestaurantHouse = new mongoose.model("RestaurantHouse", restaurantOrHouseSchema);

module.exports = RestaurantHouse;