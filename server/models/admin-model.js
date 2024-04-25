const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    phone:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    isAdmin:{
        type:String,
        default: true
    }
});

// json web token 
AdminSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"30d",
            }
        )
    } catch (error) {
        console.error(error);
    }
}

const Admin = new mongoose.model('Admin', AdminSchema);

module.exports = Admin;