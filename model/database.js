import mongoose from 'mongoose';

// modelo usuário
const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
});

export const User = mongoose.model('User', UserSchema);

//modelo do formulario
const FormSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    name: String,
    email: String,
    number: String,
    dob: Date,
    city: String,
    address: String,
    message: String
});

export const FormData = mongoose.model('Formdata', FormSchema);

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
