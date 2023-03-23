const z = require('zod');

const CreateUser = z
  .object({
    email:z.string().email({ message: "Invalid email address" }).optional(),
    phone: z.string().regex(new RegExp('[0-9]'),{message:"Enter Valid Phone Number"}).optional(),
    password: z.string().regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&_*-]).{8,}$'),{message:"Password must include Capital Letter, Number and Special Character"}),
  })
  .strict();


// -----   FUNCTIONS --------- //

function checkIfCreateUserIsValid(body) {
  return CreateUser.safeParse(body);
}


exports.checkIfCreateUserIsValid = checkIfCreateUserIsValid;
