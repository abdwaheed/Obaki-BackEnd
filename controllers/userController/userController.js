var Request = require("request");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

var User = require('../../models/Users');
const { checkIfCreateUserIsValid } = require("../../validators/UserValidator");
const myMiddleware  =  require("../../middleware/new");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isNumber } = require("../../helperFunction/isNumber");

// const dotenv = require('dotenv');
// dotenv.config();

const SMS_ACCOUNTSID1="AC1d66a";
const SMS_ACCOUNTSID2="8809f6b38d2a25c";
const SMS_ACCOUNTSID3="463f37a90d54";

const SMS_AUTHTOKEN1="194691993";
const SMS_AUTHTOKEN2="c89179ffcf0cf";
const SMS_AUTHTOKEN3="2e3fd1fa95";

const EMAILANDSMS_OTP1="VA663bbc";
const EMAILANDSMS_OTP2="81afa7b8dd6a88887";
const EMAILANDSMS_OTP3="c8c914a8b";

const client = require("twilio")(SMS_ACCOUNTSID1+SMS_ACCOUNTSID2+SMS_ACCOUNTSID3, SMS_AUTHTOKEN1+SMS_AUTHTOKEN2+SMS_AUTHTOKEN3);

const { checkIfOtpIsValid } = require("../../validators/VerifyOtp");


async function createUser(req, res) {
  try {
     const {success , error} = checkIfCreateUserIsValid(req.body);

     if(!success)
     {
      return res.status(400).send({
         success : false,
         message: error.issues,
         errorCode: 400,
       });
     }

     const {email , password , phone} = req.body;

     if((email && phone) || (!email && !phone)){
      return res.status(400).send({
        success : false,
        message: "Provide either Email or Phone",
        errorCode: 400,
      });
     }

     //FOR PHONE OTP
     async function sendOtp() {
      try {

        //TODO: FOR SENDING OTP-CODE
        const verification = await client.verify.v2.services(EMAILANDSMS_OTP1+EMAILANDSMS_OTP2+EMAILANDSMS_OTP3).verifications.create({
          to: phone,
          channel: "sms"
        });
        console.log("verification ",verification);

        if(verification){
         await User.create({
          phone,
          password: encryptedPassword,
        });

        return res.send({success : true, message:"User the Otp send on the provided Phone number to active your account"});
      }

      } catch (err) {
        console.error(err);
        return res.status(400).send({
          success : false,
          message: "Please provide a valid Phone Number",
          errorCode: 400,
        });
      }
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    // For Sending Email Verfication Link
    if(email){

      const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(400).send({
        success : false,
        message: "User Already Exist. Please Login",
        errorCode: 409,
      });
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      //TODO: use your gmail account credentials below
      auth: {
          user: 'waheed.2ndyearelegant@gmail.com',
          pass: 'lthfiwgozszxhfyq'
      }
  });

  const token = jwt.sign({
          data: email
      }, 'anyspecificKey', { expiresIn: '10m' }
  );

  const mailConfigurations = {
      from: 'waheed.2ndyearelegant@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Below is Your Email Verification Link
            http://13.48.6.148:8081/verify/${token}
             Thanks`
  };

  transporter.sendMail(mailConfigurations, async function(error, info){
      if (error){
        return res.status(400).send({
          success : false,
          message: "Failed to send Email Verification Link",
          errorCode: 400,
        });
      }
      console.log('Email Sent Successfully');
      console.log(info);
      await User.create({
        email,
        password: encryptedPassword,
      });
      return res.status(200).send({
        success : true,
        message: "Please use the activation link send to your email",
      });
  });

    }

  if(phone){
    const isExistingUserPhone = await User.findOne({ phone });

    if (isExistingUserPhone) {
      return res.status(400).send({
        success : false,
        message: "User Already Exist. Please Login",
        errorCode: 409,
      });
    }
     sendOtp();
  }

  } catch (error) {
   return res.status(400).send({
    success : false,
    message: error.message,
    errorCode: 400,
  });
  }

 };
 exports.createUser = createUser;



 async function verifyOtp(req, res) {
  try {

     const {success , error} = checkIfOtpIsValid(req.body);

     if(!success)
     {
      return res.status(400).send({
         success : false,
         message: error.issues,
         errorCode: 400,
       });
     }

     const { phone , otp} = req.body;

     if(!phone){
      return res.status(400).send({
        success : false,
        message: "Provide Provide Valid Phone Number",
        errorCode: 400,
      });
     }

    const isValidOtp = isNumber(otp);

    if(!isValidOtp){
      return res.status(400).send({
        success : false,
        message: "Enter Valid 6 digit Otp ",
        errorCode: 400,
      });
    }

  try {
           //TODO: FOR VERIFYING OTP CODE via Phone
    const verification_check = await client.verify.v2.services(EMAILANDSMS_OTP1+EMAILANDSMS_OTP2+EMAILANDSMS_OTP3).verificationChecks.create({
      to: phone,
      code: parseInt(otp)
    });
    console.log("phone verify ",verification_check);

    if(verification_check.status == "approved")
    {

       await User.findOneAndUpdate(
        {
          phone
        },
        {
          isVerified : true
        },
        {
          new: true,
        },
      );

    return res.status(200).send({
      success : true,
      message : "Account is activated successfully."
    });
    }

    return res.status(400).send({
      success : false,
      message : "Please enter correct 6 digit Otp."
    });

      } catch (error) {
        return res.status(400).send({
          success : false,
          message : "Invalid Otp or Phone Number provided."
        });
      }

  } catch (error) {
    console.log("error ",error);
   return res.status(400).send({
     success : false,
    message: error.message,
    errorCode: 400,
  });
  }

 };
 exports.verifyOtp = verifyOtp;





 async function login(req, res) {
  try {

     const {success , error} = checkIfCreateUserIsValid(req.body);

     if(!success)
     {
      return res.status(400).send({
         success : false,
         message: error.issues,
         errorCode: 400,
       });
     }

     const {email,phone , password} = req.body;


     if((email && phone) || (!email && !phone)){
      return res.status(400).send({
        success : false,
        message: "Provide either Email or Phone",
        errorCode: 400,
      });
     }


     let isExistingUser;
     if(email)
     isExistingUser = await User.findOne({email});
     else
     isExistingUser = await User.findOne({phone});

     if (isExistingUser && (await bcrypt.compare(password, isExistingUser.password)) && isExistingUser.isVerified) {

      const token = jwt.sign(
        { user_id: isExistingUser._id, ...(email && {email}), ...(phone && {phone}) },
        "anyspecificKey",
        {
          expiresIn: "2h",
        }
      );

      const message= {...isExistingUser?._doc, token};

      return res.status(400).send({
        success : true,
        message
      });

    }

    return res.status(400).send({
      success : false,
      message: "Invalid Credentials",
      errorCode : 409
    });
  } catch (error) {
  //  console.log("error");
   return res.status(400).send({
     success : false,
    message: error.message,
    errorCode: 400,
  });
  }

 };
 exports.login = login;




 async function EmailConfirmation(req, res) {
  try {

    const {token} = req.params;
    console.log("here is token ",token);

    // Verifying the JWT token
    jwt.verify(token, 'anyspecificKey',async function(err, decoded) {
        if (err) {
            console.log("error---->",err);
            const html= `
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="UTF-8">
                  <title>Verification Error</title>
                </head>
                <body>
                  <h1>Verification Error</h1>
                  <p>The verification link you clicked is incorrect or expired. Please try again with a valid link.</p>
                </body>
                </html>
               `

            res.set('Content-Type', 'text/html');
            return res.status(400).send(html);
        }
        else {
          console.log("here is decoded", decoded);
          await User.findOneAndUpdate(
            {
              email : decoded.data
            },
            {
              isVerified : true
            },
            {
              new: true,
            },
          );
          const html = `<!DOCTYPE html>
                      <html>
                      <head>
                        <meta charset="UTF-8">
                        <title>Account Verification</title>
                      </head>
                      <body>
                        <h1>Account Activated!</h1>
                        <p>Thank you for verifying your account. Your account is now active and you can start using it.</p>
                      </body>
                      </html>`;

          res.set('Content-Type', 'text/html');
          return res.status(200).send(html);
        }
    });
  } catch (error) {
    return res.status(400).send({
      success : false,
      message: error.message,
      errorCode: 400,
    });
  }

 };
 exports.EmailConfirmation = EmailConfirmation;

