<template>
    <div>
        <h1>
            <span v-if="log">Connexion</span>
            <span v-if="!log">Se créer un compte</span>
        </h1>
        <form @submit.prevent="cnx">
            <div v-if="!log" class="formGroup">
                <label for="user_nom">Nom</label>
                <input type="text" id="user_nom" v-model="user.nom"/>
            </div>
            <div v-if="!log" class="formGroup">
                <label for="user_prenom">Prénom</label>
                <input type="text" id="user_prenom" v-model="user.prenom"/>
            </div>
            <div class="formGroup">
                <label for="user_email">Email</label>
                <input type="text" id="user_email" v-model="user.email"/>
            </div>
            <div class="formGroup">
                <label for="user_password">Mot de passe</label>
                <input type="text" id="user_password" v-model="user.password"/>
            </div>
            <div class="formGroup">
                <button type="submit" class="button">
                    <span v-if="log">Connexion</span>
                    <span v-if="!log">Enregistrer</span>
                </button>
            </div>
            <div class="toggle">
                <span v-if="log" @click="toggle">Créer un compte</span>
                <span v-if="!log" @click="toggle">Se connecter</span>
            </div>
        </form>
    </div>
</template>

<script>
import { accountService } from '@/_services'
export default {
    name: 'Login',
    data() {
        return {
            user: {
                nom: '',
                prenom: '',
                email: '',
                password: ''
            },
            log: true
        }
    },
    methods: {
        toggle(){
            this.log = !this.log
        },
        login(){
            if(this.log){
                accountService.login(this.user)
                    .then(res => {
                        accountService.saveToken(res.data.access_token)
                        this.$router.push('/admin/dashboard')
                    })
                    .catch(err => console.log(err))
            }else{
                accountService.signup(this.user)
                    .then(res => {
                        this.log = true
                    })
                    .catch(err => console.log(err))
            }
        }
    },
}
</script>

<style>
    form{
        max-width: 300px;
        margin: 0 auto;
    }
    .formGroup{
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
    }
    .toggle{
        font-size:12px;
        font-style: italic;
        cursor: pointer;
        text-align: right;
    }
</style>