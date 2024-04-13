import mongoose from  'mongoose'

let isConnected = false


export const connectToDB = async () => {
    mongoose.set('strictQuery',true)
    if(isConnected){ 
        console.log( "Mongo DB is already connected.")
        return 
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share-prompt",
        })

        isConnected = true
        console.log("Successfully connected to MongoDB server")
    } catch (error) {
        console.log("error")
    }

}