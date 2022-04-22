import Post from "../models/Post.js"

export const getPost = async(request, response) => {

    const posts = await Post.find();
        response.json(posts);

}
export const createPost = async(request, response) => {

    const { title, description } = request.body;

    const post = new Post();
    if([title, description].includes('')) {
        const error = new Error('all field is required');
        return response.json({ msg: error.message });
    }
    
    post.title = title;
    post.description = description;
    post.owner = request.user.id;

    await post.save();
    return response.json(post);
    

}
export const updatePost = async(request, response) => {

    const { id } = request.params;

    const post = await Post.findById({_id: id});
    if(!post) {
        const error = new Error('post does not exist');
        return response.json({ msg: error.message });
    }
    if(post.owner.toString() !== request.user.id.toString()) {
        const error = new Error('your are no admin');
        return response.json({ msg: error.message });
    }

    post.title = request.body.title || post.title;
    post.description = request.body.description || post.description;

    await post.save();
    return response.json(post);


}
export const deletePost = async(request, response) => {

    const { id } = request.params;

    const post = await Post.findById({_id: id});
    if(!post) {
        const error = new Error('post does not exist');
        return response.json({ msg: error.message });
    }

    if(post.owner.toString() !== request.user.id.toString()){
        const error = new Error('your are no admin');
        return response.json({ msg: error.message });
    }

    await post.deleteOne();
    return response.json({ msg: `delete: ${id}`});
}