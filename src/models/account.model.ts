import mongoose, { ObjectId } from 'mongoose';

interface Account {
    user_id: ObjectId,
    number: Number,
    current_balance: Number,
}

const accountSchema = new mongoose.Schema({
    user_id: String,
    number: Number,
    current_balance: Number,
});

export default mongoose.model<Account & mongoose.Document>('Account', accountSchema);