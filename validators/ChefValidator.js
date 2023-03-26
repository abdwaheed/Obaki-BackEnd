const z = require('zod');

const CreateChef = z
  .object({
    name: z.string(),
    country: z.string(),
    state: z.string(),
    experience: z.string().regex(new RegExp('[0-9]'),{message:"Enter Valid Number of Experience"}),
    foodCountry: z.string(),
    foodType: z.string(),
    dietaryType: z.string(),
    description: z.string(),
    dishImage: z.string().array().max(5).optional(),
    certificate: z.string().optional(),
    restaurantHouse:z.string().optional(),
  })
  .strict();


// -----   FUNCTIONS --------- //

function checkIfCreateChefIsValid(body) {
  return CreateChef.safeParse(body);
}


exports.checkIfCreateChefIsValid = checkIfCreateChefIsValid;
