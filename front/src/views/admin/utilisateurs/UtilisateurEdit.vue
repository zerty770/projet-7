<template>
    <div>        
        <h1>Edition Utilisateur</h1>
        <form @submit.prevent="edit">
       
            <input type="text" id="utilisateur_id" v-model="utilisateur.id" hidden/>
     
            <div class="formGroup">
                <label for="utilisateur_name">Nom</label>
                <input type="text" id="utilisateur_name" v-model="utilisateur.nom"/>
            </div>
            <div class="formGroup">
                <label for="utilisateur_prenom">Prénom</label>
                <input type="text" id="utilisateur_prenom" v-model="utilisateur.prenom"/>
            </div>
            <div class="formGroup">
                <label for="utilisateurutilisateur_pseudo">Pseudo</label>
                <input type="text" id="utilisateurutilisateur_pseudo" v-model="utilisateur.pseudo"/>
            </div>
            <div class="formGroup">
                <label for="utilisateurutilisateur_email">Email</label>
                <input type="text" id="utilisateurutilisateur_email" v-model="utilisateur.email"/>
            </div>
            <div class="formGroup">
                <button type="submit" class="button">Modifier</button>
            </div>
        </form>
    </div>
</template>

<script>
import { utilisateurService } from '@/_services'
export default {
    name: 'UtilisateurEdit',
    props: ['id'],
    data(){
        return {
            utilisateur: {}
        }
    },
    methods: {
        // Envoi à l'API pour modification
    edit(){
        utilisateurService.updateUtilisateur(this.utilisateur)
            .then(res => this.$router.push({name: 'uList'}))
            .catch(err => console.log(err))
        }
    },
    mounted(){
        // Récupération à l'affichage de l'utilisateur
        utilisateurService.getUtilisateur(this.id)
            .then(res => {
                this.utilisateur = res.data.data
            })
            .catch(err => console.log(err))
    },
}
</script>

<style>
    
</style>