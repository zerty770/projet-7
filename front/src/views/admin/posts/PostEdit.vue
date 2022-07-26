<template>
    <div>        
       
        <h1>Ajouter un post</h1>
        {{ roger }}
        <div v-if="roger">Edition</div>
        <form @submit.prevent="ajout">               

            <div class="formGroup">
                <label for="post_titre">Titre</label>
                <input type="text" id="post_titre" v-model="post.titre"/>
            </div>
            <div class="formGroup">
                <label for="post_description">Description</label>
                <input type="text" class="description" id="post_description" v-model="post.description"/>
            </div>
            <div class="formGroup">
                <label for="post.image">Image</label>
                <input type="text" id="post.image" v-model="post.image"/>
            </div>
            <div class="formGroup">
                <label for="post.imageURL">Image</label>
                <input type="text" id="post.imageURL" v-model="post.imageURL"/>
            </div>

            <div class="formGroup">
                <button type="submit" class="button">Ajouter le post</button>
            </div>
        </form>
    </div>
</template>

<script>
//utilisateur_id, titre , description, imageUrl, likes
import { postService } from '@/_services'
import { watch, ref } from 'vue'
export default {
    name: ' PostEdit',
    props: ['id'],
    data(){
        return {
            post: {
                utilisateur_id:4,
                titre: '',
                description:'',
                imageURL:'',
                likes:''
            }
        }
    },
    setup(props){
        console.log(props)
        let roger = ref(false)
        watch(props, (value, old) => {
            console.log(value.id)
            roger.value = true
        
        })
        return {roger}
    },
    
    mounted(){        
        console.log(this.id)
        if(this.id == ''){
            this.roger = true
        }
    },
    methods: {
        test(){
            console.log('test')
        },
        ajout(){
            postService.createPost(this.post)
                .then(res => this.$router.push({name: 'cList'}))
                .catch(err => console.log(err))
        }
    },
}
</script>

<style>
    .description{
        height: 100px;
    }
</style>