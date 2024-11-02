import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"; // import jwt
import bcrypt from "bcrypt"; // import bcrypt

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
        required: true,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    password: {
        type: String,
        required: [true, 'Password Is Required']
    },
    refreshToken: {
        type: String,
    }

},
{
    timestamps: true,
}
);

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next(); // if password is not modified, skip this middleware

    this.password = await bcrypt.hash(this.password, 10); // hash password
    next(); // call next middleware
});

userSchema.methods.comparePassword = async function (password) { // compare password
    return await bcrypt.compare(password, this.password); // return true or false
};

userSchema.methods.generateAccessToken = function () {  // generate access token
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET, // access token secret
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY, //  access token expiry
        }
    )
}

userSchema.methods.generateRefreshToken = function () { // generate refresh token
    return jwt.sign( // sign jwt
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.REFRESH_TOKEN_SECRET, // refresh token secret
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // refresh token expiry
        }
    )
}

export const User = mongoose.model("User", userSchema); // export User model