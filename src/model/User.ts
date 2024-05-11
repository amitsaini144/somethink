import mongoose, { Schema, Document } from "mongoose"

export interface User extends Document {
    username: string
    email: string
    password: string
    verifyCode: string
    isVerified: boolean
    verifyCodeExpiry: Date
    isAcceptingMessage: boolean
    messages: Message[]
}

export interface Message extends Document {
    content: string
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is reqiured'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is reqiured'],
        unique: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is reqiured'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify code is reqiured']
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Expiry Date is reqiured']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: false
    },
    messages: [MessageSchema]
})

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User', UserSchema)

export default UserModel