<template>
  <div class="Matches">
    <h1>{{ message }}</h1>
    <ul>
    <div v-for="match in matches">
      <li>
        <h3>{{ match.girl_first_name }} {{ match.girl_last_name }} and {{ match.boy_first_name }} {{ match.boy_last_name }}</h3>
        <button v-on:click="moreInfo(match.girl_id)">See {{match.girl_first_name}}'s Info</button>
        <button v-on:click="moreInfo(match.boy_id)">See {{match.boy_first_name}}'s Info</button>
      </li>
    </div>
    </ul>
    <dialog id="user">
      <form method="dialog">
        <h1>Name: {{ user.first_name }} {{ user.last_name }}</h1>
        <h3 v-if="user.gender=='M'"> Male </h3>
      <h3 v-if="user.gender=='F'"> Female </h3>
        <h2> Birthday: {{ user.birthday }} </h2>
        <p> Address: {{ user.address }}</p>
        <p> Phone Number: {{ user.phone_number }}</p>
        <p> Currently Doing: {{ user.currently_doing }}</p>
        <p> Education: {{ user.education }}</p>
        <p> References: {{ user.references }}</p>
        <p> Additional Info: {{ user.additional_info }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      message: "See Matches Here!",
      matches: [],
      user: {}
    };
  },
  created: function() {
    axios
      .get("api/matches")
      .then(response => {
        this.matches = response.data;
        console.log("matches", response.data);
      });
  },
  methods: {
    moreInfo: function(id) {
      axios
        .get("api/users/" + id)
        .then(response => {
          this.user = response.data;
          console.log("user", this.user);
          document.querySelector("#user").showModal();
        });
      
    },
  }
};
</script>