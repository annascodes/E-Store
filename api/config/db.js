import mongoose from "mongoose";



const db_path = 'mongodb://127.0.0.1:27017/e_store_' 
const dbConnection = mongoose.connect('mongodb+srv://itsanascode:Whsm6meckbQ9y3C8@cluster0.pier6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log(` db connected `.bgGreen))
    .catch((e) => console.log(` err in db conn `.bgRed, e))

export default dbConnection;