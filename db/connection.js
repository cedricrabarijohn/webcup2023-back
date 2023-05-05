require(`dotenv`).config()
const mongoose = require(`mongoose`)

const URI = `mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/hiu?retryWrites=true&w=majority`
// console.log(URI)

const connectDB = async()=> {
    try{
        mongoose.set("strictQuery", false)
        await mongoose.connect(URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('db connected successfully')
    }catch(err){
        console.log(err)
    }
}
module.exports = connectDB