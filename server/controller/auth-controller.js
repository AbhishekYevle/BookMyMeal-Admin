const Admin = require("../models/admin-model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/email");

// *------------------------
// Home Logic 
// *------------------------

const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("Hello, Welcome to Home Page.");
    } catch (error) {
        res.status(400).send( { msg:"Page Not Found" } );
    }
};

module.exports.home = home;

// *------------------------
// SignUp Logic 
// *------------------------

const signup = async (req,res) => {
    try {
        // console.log("Hello world");
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const adminExists = await Admin.findOne( { email } );
        
        if(adminExists){
            return res.status(400).json( { msg: "Admin already exists." } );
        }

        // encrypt password with bcryptjs
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash( password, saltRound );

        const adminCreated = await Admin.create( { 
            username, 
            email, 
            phone, 
            password: hashPassword 
        });
        
        res.status(200).json( 
            { 
                msg: "Registration Successfull",
                token: await adminCreated.generateToken(),
                userId: adminCreated._id.toString() 
            });

        // res.status(200).send("This is SignUp Page.");
    } catch (error) {
        res.status(400).send( { msg:"Page Not Found" } );
    }
}

module.exports.signup = signup;

// *------------------------
// Login Logic 
// *------------------------

const signIn = async (req,res) => {
    try {
        const { email, password } = req.body;

        const adminExists = await Admin.findOne( { email: email } );

        if(!adminExists) {
            res.status(200).send( { msg: "Admin not exists." } );
        }
        
        // const adminPassword = await Admin.findOne( { password: password } );
        const passwordMatch = await bcrypt.compare( password, adminExists.password );

        // const adminPassword = await Admin.findOne( { password: password } );
        // console.log(adminEmail);
        // console.log(adminPassword);

        if(passwordMatch) {
            res.status(200).json(
                {
                    msg: "Login Successfull",
                    token: await adminExists.generateToken(),
                    userId: adminExists._id.toString()
                });
            // res.status(200).json( { msg: "Signin Successfull." } );
        } else {
            res.status(400).json( { msg: "Error" } );
        }

        // res.status(200).send("This is Signin Page.");
    } catch (error) {
        res.status(400).send( { msg:"Page Not Found" } );
    }
}

module.exports.signIn = signIn;


// *------------------------
// Forgot Password Logic 
// *------------------------

const resetPassword = async (req,res) => {
    try {
        const { email } = req.body;
    
        if (!email) {
          return res.status(400).json({ msg: "Email is required." });
        }
    
        const adminExists = await Admin.findOne({ email: email });
    
        if (!adminExists) {
          return res.status(404).json({ msg: "Admin not found." });
        }

        // static password for test
        // const newPassword = "Admin@1234";
        
        // Generate a new password
        const newPassword = Math.random().toString(36).slice(-8); // Generate a random 8-character password

        // encrypt password with bcryptjs
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash( newPassword, saltRound );

        // Admin.updateOne({ email: email }, { $set: { password: newPassword } });
        adminExists.password = hashPassword;
        adminExists.save();
    
        const checkPassword = await Admin.findOne( { email: email, password: hashPassword } );
    
        if (!checkPassword) {
          return res.status(500).json({ msg: "Password update failed." });
        }else{
            return res.status(500).json({ msg: "Password updated Successfully." });
        }
                // Send Email
                const resetUrl = `${req.protocol}://${req.get('host')}/api/admin/resetPassword`;
                await sendEmail();
        }

     catch (error) {
        res.status(400).json(error);
    }
}
module.exports.resetPassword = resetPassword;


// *------------------------
// User List Logic 
// *------------------------

const userList = async (req,res) => {
    try {
        Admin.find().then(admins => res.json(admins)).catch( err => res.json(err))
    } catch (error) {
        res.status(404).json(error);
    }
}

module.exports.userList = userList;