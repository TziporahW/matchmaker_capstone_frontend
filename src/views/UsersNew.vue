/* eslint-disable no-undef */

<template>
  <div class="container">
    <p>Welcome to MATCHMAKER!</p> 
    <p>Join the Orthodox shidduch resume database by filling out the following form.  <br>Once signed up, you will be contacted with shidduch ideas and resumes. <br>If you have any questions, comments or concerns <a href="mailto:matchmakershadchan@gmail.com">contact THE SHADCHAN</a>. <br>Thank you being a part of this movement!</p>
    <small> All required fields are marked with an asterisk (*)</small>
    <form v-on:submit.prevent="createUser()" class="form" role="form" autocomplete="off">
      <div class="form-group">
           <input type="text" class="form-control" id="inputFirstName" v-model="firstName" placeholder="First Name*" required="">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputLastName" v-model="lastName" placeholder="Last Name*" required="">
      </div>
      <div class="form-group">
          <input type="email" class="form-control" id="inputEmail3" v-model="email" placeholder="Email*" required="">
      </div>
      <div class="form-group">
          <input type="password" class="form-control" id="inputPassword3" v-model="password" placeholder="Password*" title="At least 6 characters with letters and numbers" required="">
      </div>
      <div class="form-group">
          <input type="password" class="form-control" id="inputVerify3" v-model="passwordConfirmation" placeholder="Password Confirmation*" required="">
      </div>
      <div>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{gender}}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" v-on:click="setMaleProfile()">Male</a>
            <a class="dropdown-item" v-on:click="setFemaleProfile()">Female</a>
          </div>
        </div>
      </div>
      <br />
      <div style="display:inline-block" class="form-group">
           <label class="">Birthday:<input type="date" class="form-control" id="inputBirthday" v-model="birthday" placeholder="Birthday*" required=""></label>
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputHeight" v-model="height" placeholder="Height*" required="">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputAddress" v-model="address" placeholder="Address">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputPhoneNumber" v-model="phone_number" placeholder="Phone Number">
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputParents" v-model="parents" placeholder="Parents">
      </div>
      <div class="form-group">
           <textarea rows="4" cols="50" class="form-control" id="inputSilbings" v-model="siblings" placeholder="Siblings/Family Info"></textarea>
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputShul" v-model="shul" placeholder="Shul">
      </div>
      <div class="form-group">
           <input type=text class="form-control" id="inputCurrentlyDoing" v-model="currently_doing" placeholder="Currently Doing">
      </div>
      <div class="form-group">
           <textarea rows="4" cols="50" class="form-control" id="inputEducation" v-model="education" placeholder="Education"></textarea>
      </div>
       <div class="form-group">
           <textarea rows="4" cols="50" class="form-control" id="inputSummers" v-model="summers" placeholder="Summers"></textarea>
      </div>
      <div class="form-group">
           <textarea rows="4" cols="50" class="form-control" id="inputAdditionalInfo" v-model="additionalInfo" placeholder="Additional Info (for resume)"></textarea>
      </div>
      <div class="form-group">
           <textarea rows="4" cols="50" class="form-control" id="inputShadchanInfo" v-model="shadchan_info" placeholder="Additional Info (for shadchan-eyes only)"></textarea>
      </div>
      <div class="form-group">
           <textarea rows="4" cols="50" class="form-control" id="inputReferences" v-model="references" placeholder="References"></textarea>
      </div>
      <div class="form-group">
           <textarea rows="4" cols="50" class="form-control" id="inputLookingFor" v-model="looking_for" placeholder="Looking for*" required=""></textarea>
      </div>
      <div class="form-group">
           <input type="text" class="form-control" id="inputPicture" v-model="imageUrl" placeholder="Image URL">
      </div>
      <small>If you wish to include a photo replace the default link with your own</small>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>
      <div class="form-group">
          <input type="submit" class="btn btn-primary" value="Create User">

      </div>
    </form>
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
      gender: "Select a gender*",
      birthday: "",
      address: "",
      phone_number: "",
      currently_doing: "",
      education: "",
      references: "",
      additionalInfo: "",
      imageUrl: "",
      parents: "",
      siblings: "",
      shul: "",
      summers: "",
      height: "",
      shadchan_info: "",
      looking_for: "",
      errors: []
    };
  },
  created: function() {
   
  },
  methods: {
    setMaleProfile: function() {
      this.imageUrl = "https://thumbs.dreamstime.com/b/male-silhoutte-avatar-default-profile-picture-photo-placeholder-vector-illustration-130555183.jpg";
      this.gender = "M";
      console.log("profile set to male");
    },
    setFemaleProfile() {
      this.imageUrl = "https://image.shutterstock.com/image-vector/female-silhoutte-avatar-default-profile-260nw-1219366543.jpg";
      this.gender = "F";
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
        image_url: this.imageUrl,
        parents: this.parents,
        siblings: this.siblings,
        shul: this.shul,
        summers: this.summers,
        height: this.height,
        shadchan_info: this.shadchan_info,
        looking_for: this.looking_for
      };
      axios
        .post("/api/users", params)
        .then(response => { 
          console.log("got here");
          this.$parent.flashMessage = "User Created!";
          this.$router.push("/");
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