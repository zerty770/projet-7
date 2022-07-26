/** Import des modules nécessaires */
import Axios from './caller.service'


let getAllUtilisateurs = () => {
    return Axios.get('/utilisateurs')
}

let getUtilisateur = (uid) => {
    return Axios.get('/utilisateurs/'+uid)
}

let updateUtilisateur = (utilisateur) => {
    return Axios.patch('/utilisateurs/'+utilisateur.id, utilisateur)
}

let createUtilisateur = (utilisateur) => {
    return Axios.put('/utilisateurs', utilisateur)
}

let deleteUtilisateur = (uid) => {
    return Axios.delete('/utilisateurs/'+uid)
}

export const utilisateurService = {
    getAllUtilisateurs,
    getUtilisateur,
    updateUtilisateur,
    createUtilisateur,
    deleteUtilisateur,
}