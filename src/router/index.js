import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Documents from '../views/Documents.vue';
import Bulletins from '../views/Bulletins.vue';
import Partenaires from '../views/Activites.vue';
import Profil from '../views/Profil.vue';
import Sign from '../views/Sign.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/documents',
    name: 'Documents',
    component: Documents
  },
  {
    path: '/bulletins',
    name: 'Bulletins',
    component: Bulletins
  },
  {
    path: '/partenaires',
    name: 'Partenaires',
    component: Partenaires
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign
  }
  // {
  //   path: '/register',
  //   name: 'Register',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
