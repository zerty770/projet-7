/** Import des modules nécessaires */
import Axios from './caller.service'


let getAllPosts = () => {
    return Axios.get('/auth/posts')
}

let getPost = (cid) => {
    return Axios.get('/auth/posts/'+cid)
}

let updatePost = (post) => {
    return Axios.patch('/auth/posts/'+post.id, post)
}

let createPost = (post) => {
    return Axios.put('/auth/posts', post)
}

let deletePost = (cid) => {
    return Axios.delete('/auth/posts/'+cid)
}

export const postService = {
    getAllPosts,
    getPost,
    updatePost,
    createPost,
    deletePost,
}