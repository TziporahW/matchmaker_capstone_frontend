/* eslint-disable no-undef */

<template>
  <div>
    <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>
    <form class="form" role="form" autocomplete="off">
      <div class="form-group">
           <input type="text" class="form-control" id="inputFirstName" v-model="firstName" placeholder="First Name">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputLastName" v-model="lastName" placeholder="Last Name">
      </div>
      <div class="form-group">
          <input type="email" class="form-control" id="inputEmail3" v-model="email" placeholder="Email" required="">
      </div>
      <div class="form-group">
          <input type="password" class="form-control" id="inputPassword3" v-model="password" placeholder="Password" title="At least 6 characters with letters and numbers" required="">
      </div>
      <div class="form-group">
          <input type="password" class="form-control" id="inputVerify3" v-model="passwordConfirmation" placeholder="Password Confirmation " required="">
      </div>
      <div class="form-group">
           <label for="male"><input type="radio" v-on:click="setMaleProfile()" class="form-control" id="male" value="M" v-model="gender" name="male">Male</label>
      </div>
      <div>
           <label for="female"><input v-on:click="setFemaleProfile()" type="radio" class="form-control" id="female" name="gender" value="F" v-model="gender">Female</label>
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputBirthday" v-model="birthday" placeholder="Birthday">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputAddress" v-model="address" placeholder="Address">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputPhoneNumber" v-model="phone_number" placeholder="Phone Number">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputCurrentlyDoing" v-model="currently_doing" placeholder="Currently Doing">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputEducation" v-model="education" placeholder="Education">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputReferences" v-model="references" placeholder="References">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputAdditionalInfo" v-model="additionalInfo" placeholder="Additional Info">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputPicture" v-model="imageUrl" placeholder="Image URL">
      </div>
      <div class="form-group">
          <button v-on:click="createUser()" type="submit" class="btn btn-success btn-lg float-right">Create User</button>
      </div>
    </form>
    <!-- First Name:<input type="text" v-model="firstName" /> <br />
    Last Name:<input type="text" v-model="lastName" /> <br /> -->
    <!-- Email:<input type="email" v-model="email" /> <br /> -->
    <!-- Password:<input type="password" v-model="password" /> <br /> -->
    <!-- Password Confirmation:<input type="password" v-model="passwordConfirmation" /> <br /> -->
    <!-- Gender:<input v-on:click="setMaleProfile()" type="radio" id="male" name="gender" value="M" v-model="gender"/><label for="male">Male</label><input v-on:click="setFemaleProfile()" type="radio" id="female" name="gender" value="F" v-model="gender"><label for="female">Female</label> <br /> -->
    <!-- Birthday:<input type="date" v-model="birthday" /> <br /> -->
    <!-- Address:<input type="text" v-model="address" /> <br /> -->
    <!-- Phone Number:<input type="text" v-model="phone_number" /> <br /> -->
    <!-- Currently Doing:<input type="text" v-model="currently_doing" /> <br /> -->
    <!-- Education:<input type="text" v-model="education" /> <br /> -->
    <!-- References:<input type="textbox" v-model="references" /> <br />
    Additional Info:<input type="text" v-model="additionalInfo" /> <br /> -->
    <!-- Picture:<input type="text" v-model="imageUrl" /> <br /> -->
    <!-- <button v-on:click="createUser()">Create User</button> -->
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
      additionalInfo: "",
      imageUrl: "",
      errors: []
    };
  },
  created: function() {
   
  },
  methods: {
    setMaleProfile: function() {
      this.imageUrl = "https://cdn2.vectorstock.com/i/thumb-large/23/81/default-avatar-profile-icon-vector-18942381.jpg";
      console.log("profile set to male");
    },
    setFemaleProfile() {
      this.imageUrl = "https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231712/thesomeday123171200008.jpg";
      console.log("profile set to female");
    },
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
        additional_info: this.additionalInfo,
        image_url: this.imageUrl
      };
      axios
        .post("/api/users", params)
        .then(response => { 
          this.$parent.flashMessage = "User Created!";
          this.$router.push("/login");
          console.log("successfully created user", response.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
  }
};
</script>