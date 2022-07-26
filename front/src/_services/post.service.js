/** Import des modules nécessaires */
import Axios from './caller.service'


let getAllPosts = () => {
    return Axios.get('/posts')
}

let getPost = (cid) => {
    return Axios.get('/posts/'+cid)
}

let updatePost = (post) => {
    return Axios.patch('/posts/'+post.id, post)
}

let createPost = (post) => {
    return Axios.put('/posts', post)
}

let deletePost = (cid) => {
    return Axios.delete('/posts/'+cid)
}

export const postService = {
    getAllPosts,
    getPost,
    updatePost,
    createPost,
    deletePost,
}