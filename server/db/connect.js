const { default: mongoose } = require("mongoose");
require("dotenv").config();
module.exports = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to DB");
        
    }catch(error){
        console.log("could not connect to DB", error);  
    }
}