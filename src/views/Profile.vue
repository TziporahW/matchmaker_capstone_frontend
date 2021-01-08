<template>
    <div class="container">
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
                                <p>
                                    <b>Email:</b> {{ user.email }}
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
                                <button class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto" v-on:click="updateProfileRequest(user.id)">Update Profile</button>
                            </div>
                        </div>
                        <!--/row-->
                    </div>
                </div>
            </div>
            <div class="col-lg-3 order-lg-1 text-center">
                <img v-bind:src="user.image_url" class="mx-auto mb-2 img-fluid rounded-circle" />
                <hr>
            </div>
             <dialog id="update">
                <form class="form" role="form" autocomplete="off">
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">First name</label>
                        <div class="col-lg-9">
                            <input v-model="user.first_name" class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Last name</label>
                        <div class="col-lg-9">
                            <input v-model="user.last_name" class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Birthday</label>
                        <div class="col-lg-9">
                            <input v-model="user.birthday" class="form-control" type="date" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Address</label>
                        <div class="col-lg-9">
                            <input v-model="user.address" class="form-control" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Phone Number</label>
                        <div class="col-lg-9">
                            <input v-model="user.phone_number" class="form-control" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Currently Doing</label>
                        <div class="col-lg-9">
                            <input v-model="user.currently_doing" class="form-control" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Education</label>
                        <div class="col-lg-9">
                            <input v-model="user.education" class="form-control" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">References</label>
                        <div class="col-lg-9">
                            <input v-model="user.references" class="form-control" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Additional Info</label>
                        <div class="col-lg-9">
                            <input v-model="user.additional_info" class="form-control" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Image URL</label>
                        <div class="col-lg-9">
                            <input v-model="user.image_url" class="form-control" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label"></label>
                        <div class="col-lg-9">
                            <button class="btn btn-secondary">Cancel</button>
                            <button class="btn btn-primary" v-on:click="updateProfile(user)">Save Changes</button>
                            <button class="btn btn-secondary" v-on:click="deleteProfile(user)">Delete Profile</button>
                        </div>
                    </div>
                </form>
            </dialog>
        </div>
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
      user: {},
      firstName: "",
      lastName: "",
      birthday: "",
      address: "",
      phone_number: "",
      currently_doing: "",
      education: "",
      references: "",
      additionalInfo: "",
      imageUrl: ""
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
  methods: {
    updateProfileRequest: function() {
      document.querySelector("#update").showModal();
    },
    updateProfile: function(user) {
      var params = {
        first_name: user.first_name,
        last_name: user.last_name,
        birthday: user.birthday,
        address: user.address,
        phone_number: user.phone_number,
        currently_doing: user.currently_doing,
        education: user.education,
        references: user.references,
        additional_info: user.additionalInfo,
        image_url: user.imageUrl
      }; 
      axios
        .patch("api/users/" + localStorage.getItem("user_id"), params)
        .then(response => {
          this.user = response.data;
          console.log("new profile", response.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
       
        });
    },
    deleteProfileRequest: function() {
      document.querySelector("#delete").showModal();
    },
    deleteProfile: function(user) {
      axios
        .delete("api/users/" + localStorage.getItem("user_id"))
        .then(response => {
          this.$parent.flashMessage = "Deleted!";
          console.log("deleted");
          this.$router.push("/Logout");
        });
    }
  }
};
</script>