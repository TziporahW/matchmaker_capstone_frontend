<template>
  <div class="text-center">
    <div class="container">
      <div class="card card-default">
        <div class="card-header" v-if="!matchesDontExist() && !isAdmin()">
            <h1>You've Been Matched!</h1>
        </div>
        <h1 v-if="matchesDontExist()">{{ message }}</h1>
        <div v-if="!matchesDontExist()" v-for="match in matches" class="card-body">
          <div class="row">
            <div class="col-lg-12">
             <h3>{{ match.girl_first_name }} {{ match.girl_last_name }} & {{ match.boy_first_name }} {{ match.boy_last_name }}</h3> 
             <div class="inline">
             <span v-if="match.girl_approval && !match.boy_approval" class="badge bg-success">She said yes!</span> <span v-if="match.boy_approval && !match.girl_approval" class="badge bg-success">He said yes!</span> <span v-if="match.girl_approval && match.boy_approval" class="badge bg-success">IT'S A DATE!</span> <br />
             <small v-if="match.girl_approval && match.boy_approval && !isAdmin()">Check your email for further details</small>
             <a :href="'mailto:' + match.girl_email" class="link" v-if="isAdmin() && match.girl_approval && match.boy_approval">Email {{ match.girl_first_name }}</a>
             </div>
              <button v-if="match.girl_id != getUserId()" class="btn btn-outline-secondary btn-lg btn-block text-truncate" v-on:click="moreInfo(match.girl_id)">See {{match.girl_first_name}}'s Info</button> <button v-if="!isAdmin() && match.girl_id != getUserId() && !match.boy_approval" v-on:click="sayYes(match)" class="btn btn-secondary btn-sm">Say yes!</button> <a :href="'mailto:' + match.boy_email" class="link" v-if="isAdmin() && match.girl_approval && match.boy_approval">Email {{ match.boy_first_name }}</a>
              <button v-if="match.boy_id != getUserId()" class="btn btn-outline-secondary btn-lg btn-block text-truncate" v-on:click="moreInfo(match.boy_id)">See {{match.boy_first_name}}'s Info</button> <button v-if="!isAdmin() && match.boy_id != getUserId() && !match.girl_approval" v-on:click="sayYes(match)" class="btn btn-secondary btn-sm">Say yes!</button>
            </div>
          </div>
        </div>                    
      </div>
    </div>
    <dialog id="user" ref="content">
      <form method="dialog">
        <img v-bind:src="user.image_url" width="100" class="rounded-circle"/>
        <div id="print_this">
          <h1>Name: {{ user.first_name }} {{ user.last_name }}</h1>
          <h3 v-if="user.gender=='M'"> Male </h3>
          <h3 v-if="user.gender=='F'"> Female </h3>
          <h2> Birthday: {{ user.birthday }} </h2>
          <h4> Email: {{ user.email }} </h4>
          <p v-if="user.address"> Address: {{ user.address }}</p>
          <p v-if="user.phone_number"> Phone Number: {{ user.phone_number }}</p>
          <p v-if="user.parents"> Parents: {{ user.parents }}</p>
          <p v-if="user.siblings"> Siblings/Family Info: {{ user.siblings }}</p>
          <p v-if="user.shul"> Shul: {{ user.shul }}</p>
          <p v-if="user.currently_doing"> Currently Doing: {{ user.currently_doing }}</p>
          <p v-if="user.education"> Education: {{ user.education }}</p>
          <p v-if="user.references"> References: {{ user.references }}</p>
          <p v-if="user.summers"> Summers: {{ user.summers }}</p>
          <p v-if="user.additional_info"> Additional Info: {{ user.additional_info }}</p>
        </div>
          <p v-if="user.shadchan_info && isAdmin()"> Shadchan Info: {{ user.shadchan_info }}</p>
          <p v-if="isAdmin()"> Looking For: {{ user.looking_for }}</p>
        
        <button class="btn btn-secondary btn-sm">CLOSE</button> <button class="btn btn-secondary btn-sm" v-on:click="generatePDF(user.last_name)">SAVE RESUME AS A PDF</button>
      </form>
    </dialog>
    <!-- <script type="application/javascript" src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
    <script type="application/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script> -->
    <script type="application/javascript" src="https://code.jquery.com/jquery-2.1.3.js"></script>
    <script type="application/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.debug.js"></script>
  </div>
</template>

<style>
 button {
   text-align: center;
 }
</style>

<script>
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import axios from 'axios';
export default {
  data: function() {
    return {
      message: "",
      matches: [],
      user: {}
    };
  },
  beforeCreate: function() {
    console.log("attempting matches");
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
    matchesDontExist: function() {
      if (this.matches.length === 0 ) {
        console.log("matches not loaded");
        this.message = "Sorry, you have no matches yet.";
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
        return true;
      } else {
        return false;
      }
    },
    sayYes: function(match) {
      var matchId = match.id;
      if (match.girl_id == localStorage.getItem("user_id")) {
        console.log("girl is signed in");
        var params = {
          girl_approval: true
        };
        axios
          .patch("api/matches/" + matchId, params)
          .then(response => {
            console.log("updated");
          });
      } else {
        console.log("boy is logged in");
        var param = {
          boy_approval: true
        };
        axios
          .patch("api/matches/" + matchId, param)
          .then(response => {
            console.log("updated");
          });
      }
      this.$router.go();

      //   var params = {

      //   }
      //   axios
      //     .patch("api/matches/" + matchId, params)
    },
    generatePDF: function(name) {
      const doc = new jspdf('p', 'px', 'a4');
      const docName = name;
      const html = document.getElementById("print_this").innerHTML;
      console.log(html);
      doc.fromHTML(html, 15, 15, {
        width: html.width
      });
      doc.save(docName + "Resume.pdf");
    },
  }
};
</script>