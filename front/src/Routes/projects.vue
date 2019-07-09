<template>
  <div>
    <div class="nav-container">
      <Navigation />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
import Navigation from "../components/Projects/Navigation";
import { getTokenFromLocalStorage } from "../utils/LocalStorageFunctions";

export default {
  components: {
    Navigation
  },
  mounted() {
    const token = getTokenFromLocalStorage();
    if (token) {
      console.log(token);
      this.$store.commit("setUser", jwt.decode(token));
    }
  }
};
</script>

<style scoped>
.nav-container {
  margin-bottom: 40px;
}
</style>
