/* eslint-disable no-undef */

<template>
  <div>
    First Name:<input type="text" v-model="firstName" /> <br />
    Last Name:<input type="text" v-model="lastName" /> <br />
    Email:<input type="email" v-model="email" /> <br />
    Password:<input type="password" v-model="password" /> <br />
    Password Confirmation:<input type="password" v-model="passwordConfirmation" /> <br />
    Gender:<input type="text" v-model="gender" /> <br />
    Birthday:<input type="text" v-model="birthday" /> <br />
    Address:<input type="text" v-model="address" /> <br />
    Phone Number:<input type="text" v-model="phone_number" /> <br />
    Currently Doing:<input type="text" v-model="currently_doing" /> <br />
    Education:<input type="text" v-model="education" /> <br />
    References:<input type="text" v-model="references" /> <br />
   Additional Info:<input type="text" v-model="additionalInfo" /> <br />
    <button v-on:click="createUser()">Create User</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      gender: "",
      birthday: "",
      address: "",
      phone_number: "",
      currently_doing: "",
      education: "",
      references: "",
      additionalInfo: ""
    };
  },
  methods: {
    createUser: function() {
      var params = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        gender: this.gender,
        birthday: this.birthday,
        address: this.address,
        phone_number: this.phone_number,
        currently_doing: this.currently_doing,
        education: this.education,
        references: this.references,
        additional_info: this.additionalInfo
      };
      axios
        .post("/api/users", params)
        .catch(error => {
          this.errors = error.response.data.errors;
        })
        .then(response => { 
          this.$parent.flashMessage = "User Created!";
          this.$router.push("/login");
          console.log("successfully created user", response.data);
        });

      // firstName = "";
      // lastName = "";
      // email = "";
      // password = "";
      // passwordConfirmation = "";
      // gender = "";
      // birthday = "";
      // address = "";
      // phone_number = "";
      // currently_doing = "";
      // education = "";
      // references = "";
      // additionalInfo = "";

    }
  }
};
</script>