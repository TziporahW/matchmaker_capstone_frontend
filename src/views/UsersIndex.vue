<template>
  <div>
    <h1>Users:</h1>

    <button v-if="userGender!='F'" v-on:click="showGirls()">Show Girls Only</button>

    <button v-if="userGender!='M'" v-on:click="showBoys()">Show Boys Only</button>

    <button v-if="userGender!=''" v-on:click="showAll()">Show Everyone</button>

    <div v-for="user in filterBy(users, `${userGender}`, 'gender', )">
      <img v-bind:src="user.image_url" width="100"/>
      <h1>Name: {{ user.first_name }} {{ user.last_name }}</h1>
      <h3 v-if="user.gender=='M'"> Male </h3>
      <h3 v-if="user.gender=='F'"> Female </h3>
      <h2> Birthday: {{ user.birthday }} </h2>
       <button v-if="girlMatch > '' || boyMatch > ''" v-on:click="finishMatch(user)">Match!</button>
      <button v-on:click="moreInfo(user)">View Profile</button>
      <br/> <br />
    </div>
    <dialog id="current-profile">
      <form method="dialog">
        <img v-bind:src="currentProfile.image_url" width="100"/>
        <h1>Name: {{ currentProfile.first_name }} {{ currentProfile.last_name }}</h1>
        <h3 v-if="currentProfile.gender=='M'"> Male </h3>
      <h3 v-if="currentProfile.gender=='F'"> Female </h3>
        <h2> Birthday: {{ currentProfile.birthday }} </h2>
        <p v-if="currentProfile.address"> Address: {{ currentProfile.address }}</p>
        <p v-if="currentProfile.phone_number"> Phone Number: {{ currentProfile.phone_number }}</p>
        <p v-if="currentProfile.currently_doing"> Currently Doing: {{ currentProfile.currently_doing }}</p>
        <p v-if="currentProfile.education"> Education: {{ currentProfile.education }}</p>
        <p v-if="currentProfile.references"> References: {{ currentProfile.references }}</p>
        <p v-if="currentProfile.additional_info"> Additional Info: {{ currentProfile.additional_info }}</p>
        <button v-if="girlMatch == '' && boyMatch == ''" v-on:click="matchWith(currentProfile)">Match with</button>
        <button v-if="girlMatch > '' || boyMatch > ''" v-on:click="finishMatch(currentProfile)">Match!</button>
        <button>Close</button>
      </form>
    </dialog>
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