<template>
    <div class="container">
    <div class="row">
            <div class="col-lg-9 order-lg-2">
                <div class="tab-content py-3">
                    <div class="tab-pane py-2 active" id="profile">
                        <div class="row my-2">
                            <div class="col-md-6">
                                <div id="save_this">
                                    <h2>{{user.first_name}} {{user.last_name}}</h2>
                                    <p v-if="user.gender=='M'"> Male </p>
                                    <p v-if="user.gender=='F'"> Female </p>
                                    <p>
                                        <b>Birthday:</b> {{ user.birthday }}
                                    </p>
                                    <p>
                                        <b>Height:</b> {{ user.height }}
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
                                    <p v-if="user.parents">
                                        <b>Parents:</b> {{ user.parents }}
                                    </p>
                                    <p v-if="user.siblings">
                                        <b>Siblings/Family Info:</b> {{ user.siblings }}
                                    </p>
                                    <p v-if="user.shul">
                                        <b>Shul:</b> {{ user.shul }}
                                    </p>
                                    <p v-if="user.currently_doing">
                                        <b>Currently Doing:</b> {{ user.currently_doing }}
                                    </p>
                                    <p v-if="user.education">
                                        <b>Education:</b> {{ user.education }}
                                    </p>
                                    <p v-if="user.summers">
                                        <b>Summers:</b> {{ user.summers }}
                                    </p>
                                    <p v-if="user.references">
                                        <b>References:</b> {{ user.references }}
                                    </p>
                                    <p v-if="user.additional_info">
                                        <b>Additional Info:</b> {{ user.additional_info }}
                                    </p>
                                </div>
                                    <p v-if="user.shadchan_info">
                                        <b>Additional Info (for shadchan only):</b> {{ user.shadchan_info }}
                                    </p>
                                    <p v-if="user.looking_for">
                                        <b>Looking For:</b> {{ user.looking_for }}
                                    </p>
                                
                                <button class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto" v-on:click="updateProfileRequest(user.id)">UPDATE PROFILE</button>
                                <button class="btn btn-outline-secondary btn-lg btn-block text-truncate mt-auto" v-on:click="generatePDF()">SAVE RESUME AS PDF</button>
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
             <dialog id="update" v-on:submit.prevent="updateProfile(user)">
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
                        <label class="col-lg-3 col-form-label form-control-label">Height</label>
                        <div class="col-lg-9">
                            <input v-model="user.height" class="form-control" type="text" />
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
                        <label class="col-lg-3 col-form-label form-control-label">Parents</label>
                        <div class="col-lg-9">
                            <input v-model="user.parents" class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Siblings/Family Info</label>
                        <div class="col-lg-9">
                            <input v-model="user.siblings" class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Shul</label>
                        <div class="col-lg-9">
                            <input v-model="user.shul" class="form-control" type="text" />
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
                        <label class="col-lg-3 col-form-label form-control-label">Summers</label>
                        <div class="col-lg-9">
                            <input v-model="user.summers" class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">References</label>
                        <div class="col-lg-9">
                            <input v-model="user.references" class="form-control" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Additional Info (on resume)</label>
                        <div class="col-lg-9">
                            <input v-model="user.additional_info" class="form-control" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Additional Info (for shadchan only)</label>
                        <div class="col-lg-9">
                            <input v-model="user.shadchan_info" class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Looking For</label>
                        <div class="col-lg-9">
                            <input v-model="user.looking_for" class="form-control" type="text" />
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
                        <div class="col-lg-9-">
                            <button class="btn btn-primary" type="submit" value="submit">Done</button> <button class="btn btn-secondary" v-on:click="deleteProfile(user)">Delete Profile</button>
                            
                        </div>
                    </div>
                </form>
            </dialog>
        </div>
    <script type="application/javascript" src="https://code.jquery.com/jquery-2.1.3.js"></script>
    <script type="application/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.debug.js"></script>
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
    };
  },
  created: function() {
    axios
      .get("api/users/" + localStorage.getItem("user_id"))
      .then(response => {
        if (localStorage.getItem("user_id") == 2) {
          this.$router.push("/UsersIndex");
        } else {
          this.user = response.data;
          console.log("profile", response.data);
        }
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
        additional_info: user.additional_info,
        image_url: user.image_url,
        parents: user.parents,
        siblings: user.siblings,
        shul: user.shul,
        summers: user.summers,
        height: user.height,
        shadchan_info: user.shadchan_info,
        looking_for: user.looking_for,
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
      document.querySelector("#update").close();
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
          localStorage.removeItem("jwt");
          localStorage.removeItem("user_id");
          this.$router.push("/UsersNew");
        });
    },
    generatePDF: function(id) {
      const doc = new jspdf('p', 'px', 'a4');
	  const html = document.getElementById("save_this").innerHTML;
      doc.fromHTML(html, 15, 15, {
        width: html.width
      });
      doc.save("myresume.pdf");
    },

  }
};
</script>