<template>
    <div>        
        <h1>Création d'un utilisateur</h1>
        <p v-if="errors.length">
            <b>Merci de corriger les erreurs suivantes</b>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
        <form @submit.prevent="ajout">    
            <div class="formGroup">
                <label for="utilisateur_name">Nom</label>
                <input type="text" id="utilisateur_name" v-model="utilisateur.nom"/>
            </div>
            <div class="formGroup">
                <label for="utilisateur_prenom">Prénom</label>
                <input type="text" id="utilisateur_prenom" v-model="utilisateur.prenom"/>
            </div>
            <div class="formGroup">
                <label for="utilisateur_pseudo">Pseudo</label>
                <input type="text" id="utilisateur_pseudo" v-model="utilisateur.pseudo"/>
            </div>
            <div class="formGroup">
                <label for="utilisateur_email">Email</label>
                <input type="text" id="utilisateur_email" v-model="utilisateur.email"/>
            </div>
            <div class="formGroup">
                <label for="utilisateur_email">Mot de passe</label>
                <input type="text" id="utilisateur_email" v-model="utilisateur.password"/>
            </div>
            <div class="formGroup">
                <label for="confirme">Vérification</label>
                <input type="text" id="confirme" v-model="confirme"/>
            </div>
            <div class="formGroup">
                <button type="submit" class="button">Créer l'utilisateur</button>
            </div>
        </form>
    </div>
</template>

<script>
import { utilisateurService } from '@/_services'
export default {
    name: 'UtilisateurAdd',
    data(){
        return {
            utilisateur: {
                nom:'',
                prenom:'',
                pseudo:'',
                email:'',
                password:''
            },
            confirme:'',
            errors:[]
        }
    },
    methods: {
        ajout(){
            console.log(this.utilisateur, this.confirme)

            this.errors = []

            if(this.utilisateur.password != this.confirme){
                this.errors.push('Le mot de passe doit correspondre avec la vérification')
            }

            if(this.utilisateur.password.length < 6){
                this.errors.push('Le mot de passe doit avoir 6 caractères')
            }

            if(this.errors.length == 0){
                utilisateurService.createUtilisateur(this.utilisateur)
                    .then(res => this.$router.push({name: 'uList'}))
                    .catch(err => console.log(err))
            }
        }
    },
}
</script>

<style>
    
</style>