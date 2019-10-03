<template>
  <div>
    <!-- <Navigation :style="{marginBottom: '50px'}" /> -->
    <router-view />
  </div>
</template>

<script>
const jwt = require("jsonwebtoken");

import { getTokenFromLocalStorage } from './utils/LocalStorageFunctions';

export default {
  mounted(){
    const token = getTokenFromLocalStorage();
    if(!token) return;

    const payload = jwt.decode(token);
    this.$store.commit("setUser", payload);
  }
}
</script>


<style lang="less">
body {
  font-family: "Chinese Quote";
}
</style>
