import * as mongoose from 'mongoose';

interface User {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
}

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

export default mongoose.model<User & mongoose.Document>('User', userSchema);