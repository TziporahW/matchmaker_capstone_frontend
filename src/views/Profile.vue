<template>
 <div class="row">
        <div class="col-lg-12">
            <h2 class="my-1">My Profile</h2>
        </div>
        <div class="col-lg-9 order-lg-2">
            <div class="tab-content py-3">
                <div class="tab-pane py-2 active" id="profile">
                    <div class="row my-2">
                        <div class="col-md-6">
                            <h6>{{user.first_name}} {{user.last_name}}</h6>
                            <p v-if="user.gender=='M'"> Male </p>
                            <p v-if="user.gender=='F'"> Female </p>
                            <p>
                                <b>Birthday:</b> {{ user.birthday }}
                            </p>
                            <p v-if="user.address">
                                <b>Address:</b> {{ user.address }}
                            </p>
                            <p v-if="user.phone_number">
                                <b>Phone Number:</b> {{ user.phone_number }}
                            </p>
                            <p v-if="user.currently_doing">
                                <b>Currently Doing:</b> {{ user.currently_doing }}
                            </p>
                            <p v-if="user.education">
                                <b>Education:</b> {{ user.education }}
                            </p>
                            <p v-if="user.references">
                                <b>References:</b> {{ user.references }}
                            </p>
                            <p v-if="user.additional_info">
                                <b>Additional Info:</b> {{ user.additional_info }}
                            </p>
                        </div>
                    </div>
                    <!--/row-->
                </div>
            </div>
        </div>
        <div class="col-lg-3 order-lg-1 text-center">
            <img v-bind:src="user.image_url" class="mx-auto mb-2 img-fluid img-rounded" />
            <hr>
        </div>
    </div>
  <!-- <div class="Profile">
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
  </div> -->
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