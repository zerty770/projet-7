<template>
    <div>        
        <h1>Liste des utilisateurs ({{ comptage }})</h1>
        <table>
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Création</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(utilisateur, index) in utilisateurs" :key="utilisateur.id">
                    <td><span class="del_btn" @click="del(index)">X</span></td>
                    <td>{{ utilisateur.id }}</td>
                    <td class="edit" @click="goEdit(utilisateur.id)">{{ utilisateur.nom }}</td>
                    <td>{{ utilisateur.prenom }}</td>
                    <td>{{ utilisateur.email }}</td>
                    <td>{{ dateFormat[index] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { utilisateurService } from '@/_services'
export default {
    name: 'UtilisateurIndex',  
    data(){
        return {
            utilisateurs: []
        }
    },
    methods: {
        goEdit(uid){
            this.$router.push({name: 'uEdit', params:{id:uid}})
        },
        del(index){
            utilisateurService.deleteUtilisateur(this.utilisateurs[index].id)
                .then(res => this.utilisateurs.splice(index, 1))
                .catch(err => console.log(err))
        }
    },
    mounted(){
        utilisateurService.getAllUtilisateurs()
            .then(res => {
                this.utilisateurs = res.data.data
            })
            .catch(err => console.log(err))
    },
    computed: {
        comptage(){
            return (this.utilisateurs.length == 0) ? ' Aucun utilisateur ' : ` Il y en a ${this.utilisateurs.length} `
        },
        dateFormat(){
            return this.utilisateurs.map(u => u.createdAt.split('T')[0].split('-').reverse().join('/'))
        }
    }
}
</script>

<style>
    table{
        width:100%;
    }
    .edit{
        cursor: pointer;
    }
    .edit:hover{
        font-weight: bold;
    }
    .del_btn{
        cursor: pointer;
        color:red;
    }
</style>