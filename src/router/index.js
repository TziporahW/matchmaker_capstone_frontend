import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UsersNew from '../views/UsersNew.vue';
import UsersIndex from '../views/UsersIndex.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import Profile from '../views/Profile.vue';
import Matches from '../views/Matches.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/UsersNew',
    name: 'UsersNew',
    component: UsersNew
  },
  {
    path: '/UsersIndex',
    name: 'UsersIndex',
    component: UsersIndex
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path:'/Matches',
    name:'Matches',
    component: Matches
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
