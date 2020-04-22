const mongoose=require("mongoose");

const dbUrl="mongodb+srv://dbuser:dbuser@cluster0-oplae.mongodb.net/test?retryWrites=true&w=majority";
const connectDB = async () =>{
    try {
        await mongoose.connect(dbUrl , {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Mongodb connected ....");

    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;