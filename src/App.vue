<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="isLoggedIn()" to="/Matches">Matches</router-link> |
      <router-link v-if="!isLoggedIn()" to="/UsersNew">Create Profile</router-link> |
      <router-link v-if="isAdmin()" to="/UsersIndex">View Profiles</router-link> |
      <router-link v-if="!isLoggedIn()" to="/Login">Login</router-link> |
      <router-link v-if="!isAdmin() && isLoggedIn()" to="/Profile">Profile</router-link> |
     <router-link v-if="isLoggedIn()" to="/Logout">LogOut</router-link> |
    </div>
    <div class="alert alert-success" v-if="flashMessage" v-on:click="flashMessage= ''">
  {{ flashMessage }}
  </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import axios from "axios"; 
export default {
  data: function() {
    return {
      flashMessage: "",
    };
  },
  created: function() {},
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    getUserId: function() {
      return localStorage.getItem("user_id");
      
    }, 
    isAdmin: function() {
      if (localStorage.getItem("user_id") == 2) {
        console.log("is admin");
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>