<template>
    <div class="ad_head">
        <nav>
        <router-link to='/admin/dashboard'>Accueil</router-link> |
        <router-link to='/admin/Posts/edit'>Ajouter un Posts </router-link> |
        <router-link to=''>Admin</router-link>
        <button @click="logout()">Logout</button>
    </nav>
        
    </div>
</template>

<script>
import { accountService } from '@/_services'
import { mapGetters } from 'vuex'

export default {
    name: 'AdminHeader',
    methods:{
        logout(){
            accountService.logout()
            this.$router.push('/')
        }
    },
    computed:{
        ...mapGetters(['getMarcel'])
    }
}
</script>

<style>
    a{ text-decoration: none;}
    .ad_head{
        border-bottom: solid 1px black;
    }
    button{
        float: right;
    }
</style>