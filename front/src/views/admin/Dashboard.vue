<template>
    <div>        
        <h1>Liste des Posts ({{ comptage }})</h1>
            <div class="post">
                <div v-for="(post, index) in posts" :key="post.id">
                    <span class="del_btn" @click="del(index)">X</span>
                    <div>{{ post.id }}</div>
                    <div class="edit" @click="goEdit(post.id)">{{ post.nom }}</div>
                    <div>{{ post.recette }}</div>
                    <div>{{ post.description }}</div>
                    <div>{{ dateFormat[index] }}</div>
                </div>
            </div>
    </div>
</template>

<script>
import { postService } from '@/_services'
export default {
    name: 'Accueil',
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
            postService.deletePost(this.posts[index].id)
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