const z = require('zod');

const CheckOtp = z
  .object({
    //email:z.string().email({ message: "Invalid email address" }).optional(),
    phone: z.string().regex(new RegExp('[0-9]'),{message:"Enter Valid Phone Number"}),
    otp: z.string().regex(new RegExp('[0-9]'),{message:"Enter valid 6 digit Otp"}).length(6, { message: "Enter valid 6 digit Otp" })
  })
  .strict();


// -----   FUNCTIONS --------- //

function checkIfOtpIsValid(body) {
  return CheckOtp.safeParse(body);
}


exports.checkIfOtpIsValid = checkIfOtpIsValid;
