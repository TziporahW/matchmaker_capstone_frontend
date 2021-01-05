<template>
  <div id="app">
    <!-- navbar -->
<nav id="topNav" class="navbar navbar-default mb-3 navbar-expand-lg fixed-top" data-toggle="affix">
    <!-- this toggler only displays on offcanvas layout -->
    <a href="#" class="navbar-toggler-anim toggler-offcanvas my-auto collapsed border-0 mr-2" 
            data-toggle="collapse" 
            data-target="#offcanvasNavbar">
        <span></span>
        <span></span>
        <span></span>
    </a>
    <!-- text brand or logo image goes here -->
    <a class="navbar-brand page-scroll text-uppercase wide-space link" href="./">
        MatchMaker
    </a>
    <button class="navbar-toggler collapsed border-0" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span></span>
        <span></span>
        <span></span>
    </button>
    <div class="collapse navbar-collapse border-0" id="collapsingNavbar">
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <a class="nav-link page-scroll" v-if="isLoggedIn()" data-target="#one" href="/Matches">Matches</a>
            </li>
            <li class="nav-item">
                <a class="nav-link page-scroll" v-if="!isAdmin() && isLoggedIn()" data-target="#two" href="/Profile">Profile</a>
            </li>
            <li class="nav-item">
                <a class="nav-link page-scroll" v-if="!isLoggedIn()" data-target="#three" href="/UsersNew">Create Profile</a>
            </li>
            <li class="nav-item">
                <a class="nav-link page-scroll" v-if="isAdmin()" data-target="#blog" href="/UsersIndex">Profiles</a>
            </li>
            <li class="nav-item">
                <a class="nav-link page-scroll" v-if="!isLoggedIn()" data-target="#blog" href="/Login">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link page-scroll" v-if="isLoggedIn()" data-target="#blog" href="/Logout">Logout</a>
            </li>
        </ul>
    </div>
</nav>
<!-- /navbar -->
    <!-- <div id="nav">
     done  <router-link to="/">Home</router-link> |
      done <router-link v-if="isLoggedIn()" to="/Matches">Matches</router-link> |
      done <router-link v-if="!isLoggedIn()" to="/UsersNew">Create Profile</router-link> |
       done <router-link v-if="isAdmin()" to="/UsersIndex">View Profiles</router-link> |
       done <router-link v-if="!isLoggedIn()" to="/Login">Login</router-link> |
      done <router-link v-if="!isAdmin() && isLoggedIn()" to="/Profile">Profile</router-link> |
     done <router-link v-if="isLoggedIn()" to="/Logout">LogOut</router-link> |
    </div> -->
    <div class="alert alert-success" v-if="flashMessage" v-on:click="flashMessage= ''">
  {{ flashMessage }}
    </div>

    <router-view />

  </div>
</template>

<style>

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