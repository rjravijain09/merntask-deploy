const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL ;
 

mongoose.connect(DB_URL).then(()=>{
    console.log('MONGO DB IS CONNECTED...');
}).catch((err)=>{
 console.log("ERROR IN MONGO DB...",err);
});