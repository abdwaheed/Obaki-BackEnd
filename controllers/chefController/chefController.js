var RestaurantHouse = require('../../models/RestaurantHouse');
var Chef = require('../../models/Chef');
const mongoose = require('mongoose');

const { checkIfCreateChefIsValid } = require("../../validators/ChefValidator");
const { isNumber } = require('../../helperFunction/isNumber');


async function getAllChefs(req, res) {
  try {
     const allChefs = await Chef.find({});

     return res.status(200).send({
      success : true,
      data:  allChefs
    });

  }
  catch (error) {
     return res.status(400).send({
       success : false,
       message: error.message,
       errorCode: 400,
     });
  }
 };
 exports.getAllChefs = getAllChefs;



async function getChef(req, res) {
  try {
   const {user_id} = req.user;

     const isChef = await Chef.findOne({
       user_id
     });

     if(isChef)
     {
       return res.status(200).send({
         success : true,
         data:  isChef
       });
     }

     return res.status(400).send({
      success : false,
      error:  "No data exist",
      errorCode: 400,
    });

  }
  catch (error) {
     return res.status(400).send({
       success : false,
       message: error.message,
       errorCode: 400,
     });
  }

 };
 exports.getChef = getChef;


async function CreateChef(req, res) {
 try {
    const {user_id} = req.user;

    const {success , error} = checkIfCreateChefIsValid(req.body);

    if(!success)
    {
    return res.status(400).send({
        success : false,
        message: error.issues,
        errorCode: 400,
      });
    }

    const {restaurantHouse,experience, ...data }= req.body;

    const isValidExperience = isNumber(experience);

    if(!isValidExperience){
      return res.status(400).send({
        success : false,
        message: "Enter Valid Experience",
        errorCode: 400,
      });
    }

    const isChef = await Chef.findOne({
      user_id
    });

    if(isChef)
    {
      return res.status(400).send({
        success : false,
        message: "Data Already exist.",
        errorCode: 400,
      });
    }


    if(restaurantHouse){

      const isValidrestaurantHouseId = mongoose.Types.ObjectId.isValid(restaurantHouse);

      if(!isValidrestaurantHouseId){
       return res.status(400).send({
         success : false,
         message: "Invalid restaurant or House Id.",
         errorCode: 400,
       });
      }


      const isRestaurantHouse = await RestaurantHouse.findOne({
        _id : restaurantHouse
      });

      if(!isRestaurantHouse)
      {
        return res.status(400).send({
          success : false,
          message: "Restaurant or House does not exist for provided Id.",
          errorCode: 400,
        });
      }


    const restaurantHouseCreated= new Chef({
      ...data,
      experience: parseInt(experience),
      restaurantHouse,
      user_id
    });

    await restaurantHouseCreated.save();

    return res.status(200).send({
      success : true,
      message: "Data Added Successfully",
    });

    }


    const restaurantHouseCreated= new Chef({
      ...data,
      experience:parseInt(experience),
      user_id
    });

    await restaurantHouseCreated.save();

    return res.status(200).send({
      success : true,
      message: "Data Added Successfully",
    });

 }
 catch (error) {
    return res.status(400).send({
      success : false,
      message: error.message,
      errorCode: 400,
    });
 }

};
exports.CreateChef = CreateChef;


async function UpdateChef(req, res) {
  try {
     const {user_id} = req.user;

     const {success , error} = checkIfCreateChefIsValid(req.body);

     if(!success)
     {
     return res.status(400).send({
         success : false,
         message: error.issues,
         errorCode: 400,
       });
     }

     const {restaurantHouse,experience, ...data }= req.body;

     const isValidExperience = isNumber(experience);

     if(!isValidExperience){
       return res.status(400).send({
         success : false,
         message: "Enter Valid Experience",
         errorCode: 400,
       });
     }

     const isChef = await Chef.findOne({
       user_id
     });

     if(!isChef)
     {
       return res.status(400).send({
         success : false,
         message: "Data Does not exist",
         errorCode: 400,
       });
     }


     if(restaurantHouse){

       const isValidrestaurantHouseId = mongoose.Types.ObjectId.isValid(restaurantHouse);

       if(!isValidrestaurantHouseId){
        return res.status(400).send({
          success : false,
          message: "Invalid restaurant or House Id.",
          errorCode: 400,
        });
       }


       const isRestaurantHouse = await RestaurantHouse.findOne({
         _id : restaurantHouse
       });

       if(!isRestaurantHouse)
       {
         return res.status(400).send({
           success : false,
           message: "Restaurant or House does not exist for provided Id.",
           errorCode: 400,
         });
       }


     await Chef.findOneAndUpdate(
      {
        user_id
      },
      {
        ...data,
        experience: parseInt(experience),
        restaurantHouse,
        user_id
      },
      { new: true }
      );


     return res.status(200).send({
       success : true,
       message: "Data Updated Successfully",
     });

     }


     await Chef.findOneAndUpdate(
      {
        user_id
      },
      {
        ...data,
        experience:parseInt(experience),
        user_id
      },
      { new: true }
     );



     return res.status(200).send({
       success : true,
       message: "Data Updated Successfully",
     });

  }
  catch (error) {
     return res.status(400).send({
       success : false,
       message: error.message,
       errorCode: 400,
     });
  }

 };
 exports.UpdateChef = UpdateChef;


 async function DeleteChef(req, res) {
  try {
   const {user_id} = req.user;

     const isChef = await Chef.findOne({
       user_id
     });

     if(!isChef)
     {
       return res.status(400).send({
         success : false,
         message: "Data does not exist.",
         errorCode: 400,
       });
     }

     const chefDeleted = await Chef.deleteOne(
      {
        user_id
      },
     );

     if(!chefDeleted.deletedCount)
     {
      return res.status(400).send(
        {
          success:false,
          message: "Data does not exist",
          errorCode: 400,
        });
    }

    return res.status(200).send(
      {
        success:true,
        message:"Data deleted successfully."
      });

  }
  catch (error) {
     return res.status(400).send({
       success : false,
       message: error.message,
       errorCode: 400,
     });
  }

 };
 exports.DeleteChef = DeleteChef;


// async function updateReciept(req, res) {
//   try {
//     const {success , error} = checkIfUpdateRecieptIsValid(req.body);
//     if(!success)
//     {
//       return res.status(400).send({
//         success : false,
//         message: error.issues,
//         errorCode: 400,
//       });
//     }

//     const {_id, date, receivedFrom, amount, amountFor, zakatType, sadqaType, pledge, email, contact, amountDue, amountReceived, paymentReceivedIn, chequeNumber} = req.body;

//     if(sadqaType && zakatType){
//       return res.status(400).send({
//         success : false,
//         message: [{message: "Cant have both SadqaType and ZakatType"}],
//         errorCode: 400,
//       });
//     }

//     if(!sadqaType && !zakatType){
//       return res.status(400).send({
//         success : false,
//         message: [{message:"SadqaType or ZakatType is required"}],
//         errorCode: 400,
//       });
//     }

//     const parsedContact = parseInt(contact);
//     const parsedCheque = parseInt(chequeNumber);

//     const isValidRecieptId = mongoose.Types.ObjectId.isValid(_id);
//     const isValidPledgeId = mongoose.Types.ObjectId.isValid(pledge);
//     const isValidPaymentReceivedInId = mongoose.Types.ObjectId.isValid(paymentReceivedIn);

//     if(!isValidRecieptId){
//       return res.status(400).send({
//         success : false,
//         message: [{message:"Invalid RecieptId"}],
//         errorCode: 400,
//       });
//      }

//   if(zakatType){
//    const isValidZakatTypeId = mongoose.Types.ObjectId.isValid(zakatType);
//    if(!isValidZakatTypeId){
//     return res.status(400).send({
//       success : false,
//       message: [{message:[{message:"Invalid ZakatTypeId"}]}],
//       errorCode: 400,
//     });
//    }
//   }

//   if(sadqaType){
//    const isValidSadqaTypeId = mongoose.Types.ObjectId.isValid(sadqaType);
//    if(!isValidSadqaTypeId){
//     return res.status(400).send({
//       success : false,
//       message: [{message:"Invalid SadqaTypeId"}],
//       errorCode: 400,
//     });
//    }
//   }

//    if(!isValidPledgeId){
//     return res.status(400).send({
//       success : false,
//       message: [{message:"Invalid PledgeId"}],
//       errorCode: 400,
//     });
//    }

//    if(!isValidPaymentReceivedInId){
//     return res.status(400).send({
//       success : false,
//       message: [{message:"Invalid PaymentReceivedInId"}],
//       errorCode: 400,
//     });
//    }

//    if(zakatType){
//     const isZakatType = await ZakatTypes.findById({
//       _id: zakatType,
//     });

//     if(!isZakatType){
//       return res.status(400).send({
//         success : false,
//         message: [{message:[{message:"Invalid ZakatTypeId"}]}],
//         errorCode: 400,
//       });
//     }
//   }

//     const isReciept = await Reciept.findById({
//       _id,
//     });

//     if(!isReciept){
//      return res.status(400).send({
//         success : false,
//         message: [{message:"Invalid RecieptId"}],
//         errorCode: 400,
//       });
//     }

//     if(sadqaType){
//     const isSadqaType = await SadqaTypes.findById({
//       _id: sadqaType,
//     });

//     if(!isSadqaType){
//      return res.status(400).send({
//         success : false,
//         message: [{message:"Invalid SadqaTypeId"}],
//         errorCode: 400,
//       });
//     }
//   }

//     const isPledge = await Pledge.findById({
//       _id: pledge,
//     });

//     if(!isPledge){
//       return res.status(400).send({
//         success : false,
//         message: [{message:"Invalid PledgeId"}],
//         errorCode: 400,
//       });
//     }

//     const isPaymentReceivedIn = await PaymentReceivedIn.findById({
//       _id: paymentReceivedIn,
//     });

//     if(!isPaymentReceivedIn){
//       return res.status(400).send({
//         success : false,
//         message:[{message: "Invalid PaymentReceivedInId"}],
//         errorCode: 400,
//       });
//     }


//     if(chequeNumber){
//       const recieptUpdated = await Reciept.findOneAndUpdate(
//         {
//           _id
//         },
//         {
//          _id, date, receivedFrom, amount, amountFor, ...(zakatType) && {zakatType:zakatType},
//          ...(sadqaType) && {sadqaType:sadqaType}, pledge, email, contact:parsedContact, amountDue, amountReceived, paymentReceivedIn,chequeNumber:parsedCheque
//         },
//         {
//           new: true,
//         },
//       );

//       if(!recieptUpdated){
//         return res.status(404).json({success:false, message: [{message:"Data does not exist"}] });
//       }
//       return  res.send({success:true});
//     }

//     const recieptUpdated = await Reciept.findOneAndUpdate(
//       {
//         _id
//       },
//       {
//         date, receivedFrom, amount, amountFor,
//         ...(zakatType) && {zakatType:zakatType},
//         ...(sadqaType) && {sadqaType:sadqaType},
//          pledge, email, contact:parsedContact, amountDue, amountReceived, paymentReceivedIn
//       },
//       { new: true }
//     );

//     if(!recieptUpdated){
//       return res.status(404).json({success:false, message: [{message:"Data does not exist"}] });
//     }
//     return  res.send({success:true});

//   } catch (error) {
//      return res.status(400).send({
//       success : false,
//       message: error.message,
//       errorCode: 400,
//     });
//   }

//  };
//  exports.updateReciept = updateReciept;



//  async function deleteReciept(req, res) {
//   try {
//     const {success , error} = checkIfDeleteRecieptIsValid(req.body);

//     if(!success)
//     {
//      return  res.status(400).send({
//         success : false,
//         message: error.issues,
//         errorCode: 400,
//       });
//     }
//     const { _id } = req.body;

//     const isValidRecieptId = mongoose.Types.ObjectId.isValid(_id);

//     if(!isValidRecieptId){
//       return res.status(400).send({
//         success : false,
//         message: "Invalid RecieptId",
//         errorCode: 400,
//       });
//      }

//     const recieptDeleted = await Reciept.deleteOne({
//       _id
//     });

//     if(!recieptDeleted.deletedCount){
//       return res.status(404).json({success:false, message: "Data does not exist" });
//     }

//     return res.send({success:true});
//   } catch (error) {
//    return  res.status(400).send({
//       success : false,
//       message: error.message || "can not delete data",
//       errorCode: 400,
//     });
//   }

//  };
//  exports.deleteReciept = deleteReciept;
