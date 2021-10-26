// Used for connecting the database
const mongoose = require('mongoose')

exports.connDB = async ()=> {
    try{
        const conn = await mongoose.connect(process.env.db_uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`Connected to the database`); 

    }catch(e){
        console.log(e);
        process.exit(1);
    }
};
