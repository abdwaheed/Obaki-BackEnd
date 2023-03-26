var RestaurantHouse = require('../../models/RestaurantHouse');

const { checkIfCreateRestaurantHouseIsValid } = require("../../validators/RestaurantHouseValidator");


async function getRestaurantHouse(req, res) {
  try {
   const {user_id} = req.user;

     const isRestaurantHouse = await RestaurantHouse.findOne({
       user_id
     });

     if(isRestaurantHouse)
     {
       return res.status(200).send({
         success : true,
         data:  isRestaurantHouse
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
 exports.getRestaurantHouse = getRestaurantHouse;



async function CreateRestaurantHouse(req, res) {
 try {
  const {user_id} = req.user;
    const {success , error} = checkIfCreateRestaurantHouseIsValid(req.body);

    if(!success)
    {
    return res.status(400).send({
        success : false,
        message: error.issues,
        errorCode: 400,
      });
    }

    const isRestaurantHouse = await RestaurantHouse.findOne({
      user_id
    });

    if(isRestaurantHouse)
    {
      return res.status(400).send({
        success : false,
        message: "Restaurant or House is already created",
        errorCode: 400,
      });
    }

    const data= new RestaurantHouse({
      ...req.body,
      user_id
    });

    await data.save();

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
exports.CreateRestaurantHouse = CreateRestaurantHouse;


async function UpdateRestaurantHouse(req, res) {
  try {
   const {user_id} = req.user;
     const {success , error} = checkIfCreateRestaurantHouseIsValid(req.body);

     if(!success)
     {
     return res.status(400).send({
         success : false,
         message: error.issues,
         errorCode: 400,
       });
     }

     const isRestaurantHouse = await RestaurantHouse.findOne({
       user_id
     });

     if(!isRestaurantHouse)
     {
       return res.status(400).send({
         success : false,
         message: "No Restaurant or House Data exist.",
         errorCode: 400,
       });
     }

     const restaurantHouseUpdated = await RestaurantHouse.findOneAndUpdate(
      {
        user_id
      },
      {
        ...req.body,
      },
      { new: true }
     );

     if(!restaurantHouseUpdated)
     {
      return res.status(400).send(
        {
          success:false,
          message: "Data does not exist"
        }
      );
    }

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
 exports.UpdateRestaurantHouse = UpdateRestaurantHouse;



 async function DeleteRestaurantHouse(req, res) {
  try {
   const {user_id} = req.user;

     const isRestaurantHouse = await RestaurantHouse.findOne({
       user_id
     });

     if(!isRestaurantHouse)
     {
       return res.status(400).send({
         success : false,
         message: "No Restaurant or House Data exist.",
         errorCode: 400,
       });
     }

     const restaurantHouseDeleted = await RestaurantHouse.deleteOne(
      {
        user_id
      },
     );

     if(!restaurantHouseDeleted.deletedCount)
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
 exports.DeleteRestaurantHouse = DeleteRestaurantHouse;


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
