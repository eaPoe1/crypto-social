import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkAuth = async(request, response, next) => {

    let token;
    const simple = request.headers.authorization;

    if(simple && simple.startsWith('Bearer')){
        
        token = simple.split(' ')[1];
        
        const decoded = jwt.verify(token, process.env.SECRET_JWT);

        request.user = await User.findById({_id: decoded.id}).select('-token -confirmed -password -updatedAt -createdAt -__v')
        
        return next();
    }

    if(!token) {
        const error = new Error('invalid token');
        return response.status(400).json({msg: error.message});
    }
}

export default checkAuth;