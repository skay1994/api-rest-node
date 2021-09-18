import mongoose from 'mongoose';

interface User {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    document: String,
    gender: String,
    birthday: String,
    account_number: Number,
    current_balance: Number,
    is_active: Boolean,
    is_deleted: Boolean,
}

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    document: String,
    gender: String,
    birthday: String,
    account_number: Number,
    current_balance: Number,
    is_active: Boolean,
    is_deleted: Boolean,
});

export default mongoose.model<User & mongoose.Document>('User', userSchema);