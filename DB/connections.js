const mongoose = require('mongoose')

const connectionString = process.env.DATABASE;
mongoose.connect(connectionString).then((res)=>{
    console.log('Mongo DB connected successfully');  
})
.catch((err)=>{
    console.log('Mongo DB connection failed');
    console.log(err);
})