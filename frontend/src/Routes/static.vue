<template>
  <div class="app">
    <div class="projects">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getTokenFromLocalStorage } from "../utils/LocalStorageFunctions";
import jwt from "jsonwebtoken";

export default {
  mounted() {
    const token = getTokenFromLocalStorage();
    if (token) {
      this.$store.commit("setUser", jwt.decode(token));
    }
  }
};
</script>

<style>
/* .ant-menu-item {
  color: red !important;
}
.ant-menu-submenu.ant-menu-submenu-horizontal {
  color: red !important;
} */
</style>
