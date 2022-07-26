/** Import des modules nécessaires */
import Axios from './caller.service'


let getAllUtilisateurs = () => {
    return Axios.get('/auth/utilisateurs')
}

let getUtilisateur = (uid) => {
    return Axios.get('/auth/utilisateurs/'+uid)
}

let updateUtilisateur = (utilisateur) => {
    return Axios.patch('/auth/utilisateurs/'+utilisateur.id, utilisateur)
}

let createUtilisateur = (utilisateur) => {
    return Axios.put('/auth/utilisateurs', utilisateur)
}

let deleteUtilisateur = (uid) => {
    return Axios.delete('/auth/utilisateurs/'+uid)
}

export const utilisateurService = {
    getAllUtilisateurs,
    getUtilisateur,
    updateUtilisateur,
    createUtilisateur,
    deleteUtilisateur,
}