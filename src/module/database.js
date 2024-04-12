import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    dob: Date,
    city: String,
    address: String
})

export const Formdata = mongoose.model('Formdata', FormSchema); 

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }

}

