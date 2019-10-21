<template>
  <div>
    <a-menu
      :theme="type"
      :style="{display: 'flex', justifyContent: 'center', maxWidth:'1050px', margin:'0 auto'}"
      v-model="current"
      mode="horizontal"
    >
      <a-menu-item @click="goHome" key='home'>
        <div class="nav-logo">MIRO</div>
      </a-menu-item>
      <a-menu-item key="about">
        <router-link tag="div" to="/about">
          <a-icon type="question" />
          {{ $t("navigation.about") }}
        </router-link>
      </a-menu-item>
      <a-menu-item key="opportunities">
        <router-link tag="div" to="/opportunities">
          <a-icon type="rise" />
          {{ $t("navigation.opportunities") }}
        </router-link>
      </a-menu-item>
      <a-menu-item key="resources">
        <router-link tag="div" to="/resources">
          <a-icon type="book" />
          {{ $t("navigation.resources") }}
        </router-link>
      </a-menu-item>
        <a-sub-menu class="projects-item" key="projects">
        <span slot="title" class="submenu-title-wrapper">
          <a-icon type="build" />
          {{ $t("headings.projects") }}
        </span>
            <a-menu-item key="projects">
                <router-link tag="div" to="/projects">
                    <a-icon type="appstore" />
                    {{ $t("navigation.all_projects") }}
                </router-link>
            </a-menu-item>
            <a-menu-item v-if="$store.state.user" key="create-project">
                <router-link tag="div" to="/projects/new">
                    <a-icon type="plus-circle" />
                    {{ $t("navigation.create_project") }}
                </router-link>
            </a-menu-item>
            <a-menu-item v-if="$store.state.user" key="my">
                <router-link tag="div" to="/projects/users/me">
                    <a-icon type="user" />
                    {{ $t("navigation.my_projects") }}
                </router-link>
            </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="community">
            <a target="_blank" href="https://gitter.im/mirorobot">
                <a-icon type="team" />
                {{ $t("navigation.community") }}
            </a>
        </a-menu-item>
        <a-menu-item key="buy">
            <router-link tag="div" to="/projects/buy">
                <a-icon type="shopping-cart" />
                {{ $t("navigation.buy") }}
            </router-link>
<!--            <a-icon type="shopping-cart"/>-->
        </a-menu-item>
      <!-- <div :style="{marginLeft: 'auto'}"> -->
        <locale-changer></locale-changer>
      <!-- </div> -->
      <a-sub-menu class="login-item" v-if="!$store.state.user" key="log">
        <span slot="title" class="submenu-title-wrapper">
          <a-icon type="import" />
          {{ $t("navigation.login") }}
        </span>
        <a-menu-item key="login">
          <a-icon type="login" />
          <router-link tag="div" to="/projects/login">{{ $t("navigation.login") }}</router-link>
        </a-menu-item>
        <a-menu-item key="registration">
          <a-icon type="user-add" />
          <router-link to="/projects/registration" tag="div">{{ $t("navigation.registration") }}</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item
        @click="logout"
        v-if="$store.state.user"
        key="logout"
      >
        <a-icon type="logout" />
        {{ $t("navigation.logout") }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo_white.png";
import LocaleChanger from "../LocaleChanger";

export default {
  props: ["type", "place"],
  components:{
    'locale-changer': LocaleChanger
  },
  data() {
    return {
      logo,
      logoWhite,
    };
  },
  computed:{
    current: function(){
      const path = this.$route.path;
      if(path.includes('about')) return 'about';
      if(path.includes('resources')) return 'resources';
      if(path.includes('opportunities')) return 'opportunities';
      if(path.includes('projects/users/me')) return 'my';
      if(path.includes('projects/new')) return 'create-project';
      if(path.includes('buy')) return 'buy';
      if(path.includes('projects')) return 'projects';
    }
  },
  methods: {
    logout() {
      this.$store.commit("deleteUser");
      this.$router.push('/');
    },
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
.login-item {
  height: 100%;
  margin-left: 25px;
}
.projects-item{
    height: 100%;
}
.login-item > div, .projects-item > div{
  height: 100%;
  display: flex;
  align-items: center;
}
.nav-logo{
  text-transform: uppercase;
  font-size: 30px;
  color:#fb0101;
  font-weight: 600;
}
.ant-menu.ant-menu-horizontal.ant-menu-root {
  width: 100vw;
  padding: 0 15px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  max-width: unset !important;

  align-items: center;
  height: 65px;
  font-size: 14px;
}
.ant-menu-item {
  height: 100%;
  display: flex !important;
  align-items: center;
}
.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected{
  background-color: transparent!important;
}
</style>
