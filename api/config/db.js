import mongoose from "mongoose";



const db_path = 'mongodb://127.0.0.1:27017/e_store_' 
const dbConnection = mongoose.connect(db_path)
    .then(() => console.log(` db connected `.bgGreen))
    .catch(() => console.log(` err in db conn `.bgRed))

export default dbConnection;