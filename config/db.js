const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();
mongoose.Promise = global.Promise;

const MONGO_URI1="mongodb+srv:"
const MONGO_URI2="//waheed:obaki123@cluster0."
const MONGO_URI3="ftz6h3k.mongodb.net/test"

// Connecting to the database
mongoose.connect(MONGO_URI1+MONGO_URI2+MONGO_URI3, {
    useNewUrlParser: true,
    useFindAndModify:false,
    useUnifiedTopology: true,
    useCreateIndex:true,
    autoIndex: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});