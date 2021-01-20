<template>
  <div class="container">

    <button class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto" v-if="userGender!='F'" v-on:click="showGirls()">Show Girls Only</button>

    <button class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto" v-if="userGender!='M'" v-on:click="showBoys()">Show Boys Only</button>

    <button class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto" v-if="userGender!=''" v-on:click="showAll()">Show Everyone</button>
   <div class="container">
    <div class="mt-2 wow fadeIn">
            <div v-for="user in filterBy(users, `${userGender}`, 'gender')" class="card-deck">
                <!-- card -->
                <div class="card card-default text-center">
                    <div class="card-img-top card-zoom">
                        <a href="./blog-detail.html"><img v-bind:src="user.image_url" width="200" class="img-fluid rounded-circle mx-auto d-block" alt="card image 3"></a>
                    </div>
                    <div class="card-body">
                        <h1 class="card-text">Name: {{ user.first_name }} {{ user.last_name }}</h1>
              <h4 class="card-text" v-if="user.gender=='M'"> Male </h4><h4 class="card-text" v-if="user.gender=='F'"> Female </h4>
              <h5 class="card-text"> Birthday: {{ user.birthday }} </h5>
              <h5 class="card-text"> Height: {{ user.height }} </h5>
              <button v-on:click="moreInfo(user)" class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto">View Profile</button>
              <button v-if="girlMatch > '' || boyMatch > ''" v-on:click="finishMatch(user)" class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto">Match!</button>
                    </div>
                </div>
            </div>
    </div>
   </div>
    <div class="text-center"> 
      <dialog id="current-profile">
        <form method="dialog">
          <img v-bind:src="currentProfile.image_url" width="100" class="rounded-circle"/>
          <h1>Name: {{ currentProfile.first_name }} {{ currentProfile.last_name }}</h1>
          <h3 v-if="currentProfile.gender=='M'"> Male </h3>
        <h3 v-if="currentProfile.gender=='F'"> Female </h3>
          <h2> Birthday: {{ currentProfile.birthday }} </h2>
          <h2> Height: {{ currentProfile.height }} </h2>
          <h4> Email: {{ currentProfile.email }} </h4>
          <p v-if="currentProfile.address"> Address: {{ currentProfile.address }}</p>
          <p v-if="currentProfile.phone_number"> Phone Number: {{ currentProfile.phone_number }}</p>
          <p v-if="currentProfile.parents"> Parents: {{ currentProfile.parents }}</p>
          <p v-if="currentProfile.siblings"> Siblings/Family Info: {{ currentProfile.siblings }}</p>
          <p v-if="currentProfile.shul"> Shul: {{ currentProfile.shul }}</p>
          <p v-if="currentProfile.currently_doing"> Currently Doing: {{ currentProfile.currently_doing }}</p>
          <p v-if="currentProfile.education"> Education: {{ currentProfile.education }}</p>
          <p v-if="currentProfile.references"> References: {{ currentProfile.references }}</p>
          <p v-if="currentProfile.summers"> Summers: {{ currentProfile.summers }}</p>
          <p v-if="currentProfile.additional_info"> Additional Info: {{ currentProfile.additional_info }}</p>
          <p v-if="currentProfile.shadchan_info && isAdmin()"> Shadchan Info: {{ currentProfile.shadchan_info }}</p>
          <p v-if="isAdmin()"> Looking For: {{ currentProfile.looking_for }}</p>
          <button v-if="girlMatch == '' && boyMatch == ''" v-on:click="matchWith(currentProfile)" class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto">Match with</button>
          <button class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto" v-if="girlMatch > '' || boyMatch > ''" v-on:click="finishMatch(currentProfile)">Match!</button>
          <button class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto">Close</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from 'vue';
import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);

export default {
  mixins: [Vue2Filters.mixin],

  data: function() {
    return {
      users: [],
      currentProfile: {},
      userGender: "",
      girlMatch: "",
      boyMatch: "",
    };
  },
  created: function() {
    axios
      .get("api/users")
      .then(response => {
        this.users = response.data;
      });
  },
  methods: {
    moreInfo: function(user) {
      this.currentProfile = user;
      console.log("currentProfile", this.currentProfile);
      document.querySelector("#current-profile").showModal();
    },
    matchWith: function(currentProfile) {
      if (currentProfile.gender === "M") {
        console.log("male");
        this.userGender = "F";
        this.boyMatch = currentProfile.id;
        console.log("boy match", this.boyMatch);
      } else {
        console.log("female");
        this.userGender = "M";
        this.girlMatch = currentProfile.id;
        console.log("girl match", this.girlMatch);
      }
    },
    showGirls: function() {
      this.userGender = "F";
      console.log("girls shown");
    },
    showBoys: function() {
      this.userGender = "M";
      console.log("boys shown");
    },
    showAll: function() {
      this.userGender = "";
      console.log("everyone shown");
    },
    isAdmin: function() {
      if (localStorage.getItem("user_id") == 2) {
        console.log("is admin");
        return true;
      } else {
        return false;
      }
    },
    finishMatch: function(currentProfile) {
      if (currentProfile.gender === "M") {
        console.log("male");
        this.boyMatch = currentProfile.id;
        console.log("boy match", this.boyMatch);
      } else {
        console.log("female");
        this.girlMatch = currentProfile.id;
        console.log("girl match", this.girlMatch);
      }
      var params = {
        boy_id: this.boyMatch,
        girl_id: this.girlMatch
      };
      axios
        .post("/api/matches", params)
        .catch(error => {
          this.errors = error.response.data.errors;
        })
        .then(response => { 
          this.$parent.flashMessage = "Match Created!";
          this.$router.push("/matches");
          console.log("successfully created match", response.data);
        });
    }
  }
};
</script>