/** Import des modules nécessaires */
import Axios from './caller.service'
import store from '../store'

let login = (credentials) => {
    return Axios.post('/login', credentials)
}

let logout = () => {
    localStorage.removeItem('token')
}

let getToken = () => {
    return localStorage.getItem('token')
}

let signup = (utilisateur) => {
    return Axios.put('/login', utilisateur)
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const accountService = {
    login,
    signup,
    logout,
    saveToken,
    getToken,
    isLogged
}