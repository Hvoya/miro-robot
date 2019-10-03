<template>
  <div class="app">
    <Navigation place="projects" />
    <div class="projects">
      <router-view></router-view>
    </div>
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
      this.$store.commit("setUser", jwt.decode(token));
    }
  }
};
</script>

<style scoped>
.projects {
  margin-top: 100px;
}
.nav-container {
  /* margin-bottom: 40px; */
  position: fixed;
  top: 0;
  left: calc((100vw - 990px) / 2);
  /* transform: translateX(-50%); */
}
</style>
