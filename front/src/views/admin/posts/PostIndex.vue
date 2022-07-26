<template>
    <div>        
        <h1>Liste des posts ({{ comptage }})</h1>
        <table>
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>ID</th>
                    <th>titre  </th>
                    <th>Description</th>
                    <th>image</th>
                    <th>likes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(post, index) in posts" :key="post.id">
                    <td><span class="del_btn" @click="del(index)">X</span></td>
                    <td>{{ post.id }}</td>
                    <td class="edit" @click="goEdit(post.id)">{{ post.titre }}</td>
                    <td>{{ post.description }}</td>
                    <td>{{ post.imageURL }}</td>
                    <td>{{ dateFormat[index] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { postService } from '@/_services'
export default {
    name: 'postIndex',
    data(){
        return {
            posts: []
        }
    },
    methods: {
        goEdit(uid){
            this.$router.push({name: 'cEdit', params:{id:uid}})
        },
        del(index){
            postService.deletepost(this.posts[index].id)
                .then(res => this.posts.splice(index, 1))
                .catch(err => console.log(err))
        }
    },
    mounted(){
        postService.getAllposts()
            .then(res => {
                this.posts = res.data.data
            })
            .catch(err => console.log(err))
    },
    computed: {
        comptage(){
            return (this.posts.length == 0) ? ' Aucun post ' : ` Il y en a ${this.posts.length} `
        },
        dateFormat(){
            return this.posts.map(c => c.createdAt.split('T')[0].split('-').reverse().join('/'))
        }
    }
}
</script>

<style>
    
</style>