<template>
  <div class="logout">
    <p> {{ message }} </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: ""
    };
  },
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("admin");
    localStorage.removeItem("user_id");
    this.$parent.flashMessage = "Logged Out!";
    this.$router.push("/");
  }
};
</script>