import { createRouter, createWebHistory } from 'vue-router'


import * as Public from '@/views/public'

import * as Admin from '@/views/admin'

import Login from '@/views/auth/Login.vue'
import { authGuard } from '@/_helpers/auth-guard'

localStorage.setItem('token', 'marcel')


const routes = [
  {
    path: '/',
    name: 'public',
    component: Public.PublicLayout,
    children: [
      { path: '/', name: 'home', component: Public.Home },
      { path: '/posts', name: 'posts', component: Public.Post },
      { path: '/contact', name: 'contact', component: Public.Contact }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin.AdminLayout,    
    children: [
      { path: 'dashboard', name: 'dashboard', component: Admin.Dashboard },
      { path: 'utilisateurs/index', name: 'uList', component: Admin.UtilisateurIndex },
      { path: 'utilisateurs/edit/:id(\\d+)', name: 'uEdit', component: Admin.UtilisateurEdit, props: true },
      { path: 'utilisateurs/add', component: Admin.UtilisateurAdd },

      { path: 'posts/index', name: 'cList', component: Admin.PostIndex },
      { path: 'posts/edit/:id(\\d+)?', name:'cEdit', component: Admin.PostEdit, props: true },
      { path: '/:pathMatch(.*)*', redirect: '/admin/dashboard' }
    ]
  },
  {
    path: '/login', name: 'Login', component: Login
  },
  {
    path: '/:pathMatch(.*)*', redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Vérouillage de la partie admin (token)
router.beforeEach((to, from, next) => {
  if(to.matched[0].name == 'admin'){
    authGuard()
  }
  next()
})


export default router
