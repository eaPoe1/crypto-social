import User from "../models/User.js";

import generateToken from "../helpers/generateToken.js";
import generateJWT from "../helpers/generateJWT.js";


export const signup = async(request, response) => {
    const { email } = request.body;

    const userExists = await User.findOne({email});
    if(userExists) {
        const error = new Error('User is already registered');
        return response.json({ msg: error.message });
    }

    const user = new User(request.body);
    user.token = generateToken();
    await user.save();
    return response.json(user);
}

export const login = async (request, response) => {

    const { email, password } = request.body;

    const user = await User.findOne({email});
    if(!user) {
        const error = new Error('User is not registered');
        return response.status(404).json({ msg: error.message });
    }   
    if(!user.confirmed) {
        const error = new Error('User is not confirmed');
        return response.status(401).json({ msg: error.message });
    }
    if(!await user.verifyPassword(password)) {
        const error = new Error('Incorrect password');
        return response.status(401).json({ msg: error.message });
    }
    
    response.json({
        name: user.name,
        email: user.email,
        id: user._id,
        token: generateJWT(user._id)
    });
}

export const confirm = async(request, response) => {
    const { token } = request.params;

    const user = await User.findOne({token});
    if(!user) {
        const error = new Error('invalid token');
        return response.status(400).json({ msg: error.message });
    }

    user.token = '';
    user.confirmed = true;
    await user.save();
    return response.json(user);

}

export const profile = async (request, response) => {
    return response.json(request.user);
}

// export const addFriend = async (request, response) => {
//     const { cryptoName } = request.body;
    
//     const user = await User.findById({_id: request.user.id});
//     if(user.crypto.includes(cryptoName)) {
//         user.crypto.pull(cryptoName);
//         await user.save();
//         return response.json(user);
//     }

//     user.crypto.push(cryptoName);
//     await user.save();
//     return response.json(user);
// }

