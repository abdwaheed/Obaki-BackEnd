const z = require('zod');

const CreateRestaurantHouse = z
  .object({
    isHouse:z.boolean(),
    location: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),//.regex(new RegExp('[0-9]'),{message:"Enter Valid ZipCode"}),
    image: z.string(),
    // userId: z.string(),
  })
  .strict();


// -----   FUNCTIONS --------- //

function checkIfCreateRestaurantHouseIsValid(body) {
  return CreateRestaurantHouse.safeParse(body);
}


exports.checkIfCreateRestaurantHouseIsValid = checkIfCreateRestaurantHouseIsValid;
