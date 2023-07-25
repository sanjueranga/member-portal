const mongoose = require('mongoose');




const connectDatabase =()=>{
   
     main().catch(err => console.log(err));
    async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB succesfully connected");

}
}

module.exports = connectDatabase