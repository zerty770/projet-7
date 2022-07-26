<template>
    <div>
        <ul>
            <li><router-link to='/'>Accueil</router-link></li>
            <li>&nbsp;</li>
            <li><router-link to='/admin/dashboard'>Dashboard</router-link></li>
            <li>&nbsp;</li>
            <li><router-link to='/admin/utilisateurs/index'>utilisateur list</router-link></li>
            <li><router-link to='/admin/utilisateurs/add'>utilisateur add</router-link></li>
            <li>&nbsp;</li>
            <li><router-link to='/admin/posts/index'>Post list</router-link></li>
            <li><router-link to='/admin/posts/edit'>Post add</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AdminNav'
}
</script>

<style>
    ul{
        list-style: none;
        padding-left:0px;
        margin-right:10px;
    }
    ul li{
        text-align:left;
    }
</style>
