<template>
  <div class="Profile">
    <h1>{{ message }}</h1>
    <img v-bind:src="user.image_url" width="100" />
    <h2>Name: {{ user.first_name }} {{ user.last_name }}</h2>
   <h3 v-if="user.gender=='M'"> Male </h3>
      <h3 v-if="user.gender=='F'"> Female </h3>
    <h2> Birthday: {{ user.birthday }} </h2>
    <p v-if="user.address"> Address: {{ user.address }}</p>
    <p v-if="user.phone_number"> Phone Number: {{ user.phone_number }}</p>
    <p v-if="user.currently_doing"> Currently Doing: {{ user.currently_doing }}</p>
    <p v-if="user.education"> Education: {{ user.education }}</p>
    <p v-if="user.references"> References: {{ user.references }}</p>
    <p v-if="user.additional_info"> Additional Info: {{ user.additional_info }}</p>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      message: "This is my profile!",
      user: {}
    };
  },
  created: function() {
    axios
      .get("api/users/" + localStorage.getItem("user_id"))
      .then(response => {
        this.user = response.data;
        console.log("profile", response.data);
      });
  },
  methods: {}
};
</script>