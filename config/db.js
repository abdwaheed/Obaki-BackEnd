const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGO_URI, {
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