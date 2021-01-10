<template>
  <div class="container">
    <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
     <br />
    <small class="link" v-on:click="newUser()">New User? Click here to create an account!</small>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          if (localStorage.getItem("user_id") == 2) {
            console.log("testing");
            this.$parent.flashMessage = "Logged In!";
            this.$router.push("/UsersIndex");
          } else {
            this.$parent.flashMessage = "Logged In!";
            this.$router.push("/Profile");
          }
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    newUser: function() {
      this.$router.push("/UsersNew");
    }
  }
};
</script>