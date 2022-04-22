import Follow from "../models/Follow.js"


export const follow = async(request, response) => {

    const follow = new Follow();
    follow.user = request.user.id;
    follow.followed = request.params.id;
    
    const isAlreadyFollow = await Follow.find({user: request.user.id, followed: request.params.id});
   
    if(isAlreadyFollow.length !== 0) {return response.json({msg: 'you already follow him'})}
    
    await follow.save()
    response.json(follow);

}

export const unfollow = async(request, response) => {

    const isAlreadyFollow = await Follow.find({user: request.user.id, followed: request.params.id});
    if(isAlreadyFollow.length === 0) return response.json({msg: 'invalid action (The user is not your friend, you cannot delete him)'});
    await isAlreadyFollow[0].deleteOne();
    response.json(isAlreadyFollow);

}

export const followings = async(request, response) => {

    const followings = await Follow.find({user: request.user.id}).populate({path: 'followed', select: '_id name email'});
    return response.json(followings);
     
}

