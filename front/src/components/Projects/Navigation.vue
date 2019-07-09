<template>
  <a-menu
    :style="{display: 'flex', justifyContent: 'center', maxWidth:'1050px', margin:'0 auto'}"
    v-model="current"
    mode="horizontal"
  >
    <a-menu-item key="about">
      <a-icon type="question" />
      <router-link tag="span" to="/about">{{ $t("navigation.about") }}</router-link>
    </a-menu-item>
    <a-menu-item key="opportunities">
      <a-icon type="rise" />
      <router-link tag="span" to="/opportunities">{{ $t("navigation.opportunities") }}</router-link>
    </a-menu-item>
    <a-menu-item key="resources">
      <a-icon type="book" />
      <router-link tag="span" to="/resources">{{ $t("navigation.resources") }}</router-link>
    </a-menu-item>
    <a-menu-item key="all-projects">
      <a-icon type="appstore" />
      <router-link tag="span" to="/projects">{{ $t("navigation.all_projects") }}</router-link>
    </a-menu-item>
    <a-menu-item v-if="$store.state.user" key="create-project">
      <a-icon type="plus-circle" />
      <router-link tag="span" to="/projects/new">{{ $t("navigation.create_project") }}</router-link>
    </a-menu-item>
    <a-menu-item v-if="$store.state.user" key="my-projects">
      <a-icon type="user" />
      <router-link tag="span" to="/users/me">{{ $t("navigation.my_projects") }}</router-link>
    </a-menu-item>
    <a-sub-menu v-if="!$store.state.user" :style="{marginLeft: 'auto'}">
      <span slot="title" class="submenu-title-wrapper">
        <a-icon type="import" />
        {{ $t("navigation.login") }}
      </span>
      <a-menu-item key="login">
        <a-icon type="login" />
        <router-link tag="span" to="/projects/login">{{ $t("navigation.login") }}</router-link>
      </a-menu-item>
      <a-menu-item key="registration">
        <a-icon type="user-add" />
        <router-link to="/projects/registration" tag="span">{{ $t("navigation.registration") }}</router-link>
      </a-menu-item>
    </a-sub-menu>
    <a-menu-item
      @click="logout"
      v-if="$store.state.user"
      :style="{marginLeft: 'auto'}"
      key="logout"
    >
      <a-icon type="logout" />
      {{ $t("navigation.logout") }}
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      current: null
    };
  },
  methods: {
    logout() {
      this.$store.commit("deleteUser");
    }
  }
};
</script>

<style>
</style>
