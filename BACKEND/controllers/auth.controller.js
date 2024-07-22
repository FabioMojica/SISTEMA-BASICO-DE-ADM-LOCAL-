import generateJWT from '../libs/generateJwt.libs.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const userFound = await User.findOne({email: email});

        if(userFound) return res.json({message: `User ${email} already exist`})
        
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, 
            email,
            password: hashPassword,
            role: 'admin'
        });

        const userSaved = await newUser.save();

        const token = await generateJWT( { id: userSaved._id } );

        res.cookie('token', token);

        res.json({message: "register", userSaved});

    } catch (error) {
        res.json(error);
    }
};

export const login = async (req, res) => {
    const { email,  password } = req.body;

    try{
        const foundUser = await User.findOne({email: email});

        if(!foundUser) throw new Error("Email o contraseña incorrecta, vuelva a intentar");

        const coincidence = await bcrypt.compare(password, foundUser.password);

        // TODO: FIX descriptive message
        if(!coincidence) throw new Error("Email o contraseña incorrecta, vuelva a intentar");

        const token = await generateJWT( { id: foundUser._id } );

        res.cookie('token', token);

        res.json({message: "login", foundUser});

    } catch(error) {
        res.status(401).json({ message: error.message });
    }
};

export const logout = (req, res) => {

    try{
        res.cookie('token', '', {
            expires: new Date(0)
        }); 
        
        return res.status(200).json({message: "Logout successful"});
    } catch(e){
        res.status(500).json({message: "Logout failed", error: e});
    }
}

export const verifyToken = (req, res) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message: 'Unauthorized'});

    jwt.verify(token, 'SECRET', async (err, user) => {
        if(err) return res.status(401).json({message: 'Unauthorized'});

        const userFound = await User.findById(user.id);

        if(!userFound) return res.status(401).json({message: 'Unauthorized'});

        return res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email
        });

    }) 
};