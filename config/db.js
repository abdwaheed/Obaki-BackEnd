const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
global.url = 'mongodb+srv://waheed:obaki123@cluster0.ftz6h3k.mongodb.net/test';


// Connecting to the database
mongoose.connect(url, {
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