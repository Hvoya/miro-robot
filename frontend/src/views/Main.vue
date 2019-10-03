<template>
  <div class="page-wrapper">
    <Navigation type="dark" place="main" />
    <div class="projects">
      <router-view></router-view>
    </div>
    <div class="container">
      <full-page class="full" ref="fullpage" :options="options" id="fullpage">
        <div class="section">
          <div class="section-content">
            <a-row type="flex" :gutter="20" class="row">
              <a-col order="1" span="12">
                <h1
                  :class="animations[0][1]"
                  @click="()=>animate({index: 0})"
                  v-html="$t('headings.main.1')"
                ></h1>
                <p :class="animations[0][2]" v-html="$t('texts.main.1')"></p>
                <a-button
                  @click="navigate('/about')"
                  :class="animations[0][3]"
                  size="large"
                  type="primary"
                  v-html="$t('buttons.main.1')"
                ></a-button>
              </a-col>
              <a-col :order="2" span="12">
                <img
                  :class="'image_' + 0 + ' ' + animations[0][0]"
                  :src="main_1"
                  alt="miro_image"
                />
              </a-col>
            </a-row>
            <img class="mouse animated bounce" :src="mouse" alt />
            <img :class="'line' + ' ' + animations[0][4]" :src="line" alt />
          </div>
        </div>
        <div class="section">
          <div class="section-content">
            <a-row type="flex" :gutter="20" class="row">
              <a-col order="2" span="12">
                <h1
                  :class="animations[1][1]"
                  @click="()=>animate({index: 0})"
                  v-html="$t('headings.main.2')"
                ></h1>
                <p :class="animations[1][2]" v-html="$t('texts.main.2')"></p>
                <a-button
                  @click="navigate('/opportunities')"
                  :class="animations[1][3]"
                  size="large"
                  type="primary"
                  v-html="$t('buttons.main.2')"
                ></a-button>
              </a-col>
              <a-col :order="1" span="12">
                <img
                  :class="'image_' + 1 + ' ' + animations[1][0]"
                  :src="main_2"
                  alt="miro_image"
                />
              </a-col>
            </a-row>
          </div>
        </div>
        <div class="section">
          <div class="section-content">
            <a-row type="flex" :gutter="20" class="row">
              <a-col order="1" span="12">
                <h1
                  :class="animations[2][1]"
                  @click="()=>animate({index: 0})"
                  v-html="$t('headings.main.3')"
                ></h1>
                <p :class="animations[2][2]" v-html="$t('texts.main.3')"></p>
                <a-button
                  @click="navigate('/resources')"
                  :class="animations[2][3]"
                  size="large"
                  type="primary"
                  v-html="$t('buttons.main.3')"
                ></a-button>
              </a-col>
              <a-col :order="2" span="12">
                <img
                  :class="'image_' + 2 + ' ' + animations[2][0]"
                  :src="main_3"
                  alt="miro_image"
                />
              </a-col>
            </a-row>
          </div>
        </div>
        <div class="section">
          <div class="section-content">
            <a-row type="flex" :gutter="20" class="row">
              <a-col order="2" span="12">
                <h1
                  :class="animations[3][1]"
                  @click="()=>animate({index: 0})"
                  v-html="$t('headings.main.4')"
                ></h1>
                <p :class="animations[3][2]" v-html="$t('texts.main.4')"></p>
                <a-button
                  @click="navigate('/projects')"
                  :class="animations[3][3]"
                  size="large"
                  type="primary"
                  v-html="$t('buttons.main.4')"
                ></a-button>
              </a-col>
              <a-col :order="1" span="12">
                <img
                  :class="'image_' + 3 + ' ' + animations[3][0]"
                  :src="main_4"
                  alt="miro_image"
                />
              </a-col>
            </a-row>
          </div>
        </div>
      </full-page>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Projects/Navigation";

import main_1 from "../assets/main_1.png";
import main_2 from "../assets/main_2.png";
import main_3 from "../assets/main_3.png";
import main_4 from "../assets/main_4.png";
import mouse from "../assets/mouse.png";
import line from "../assets/line.png";

export default {
  components: {
    Navigation
  },
  data() {
    return {
      main_1,
      main_2,
      main_3,
      main_4,
      line,
      mouse,
      options: {
        onLeave: this.animate
      },
      animations: [
        [
          "animated fadeInRight",
          "animated fadeInLeft",
          "animated fadeIn",
          "animated fadeInUp",
          "animated fadeInUpBig"
        ], // 0 - image, 1 - heading, 2 - paragraph 3 - button, 4 - line
        ["", "", "", "", ""], // change it on select full page section
        ["", "", "", "", ""],
        ["", "", "", "", ""]
      ]
    };
  },
  methods: {
    animate(origin, item, dest) {
      const newAnimations = [...this.animations];
      const imageAnimation =
        item.index % 2 === 0 ? "animated fadeInRight" : "animated fadeInLeft";
      const headingAnimation =
        item.index % 2 === 0 ? "animated fadeInLeft" : "animated fadeInRight";
      const textAnimation = "animated fadeIn";
      const buttonAnimation = "animated fadeInUp";
      const lineAnimation = "animated fadeInUpBig";

      newAnimations[item.index] = [
        imageAnimation,
        headingAnimation,
        textAnimation,
        buttonAnimation,
        lineAnimation
      ];
      this.animations = newAnimations;
    },
    navigate(path){
      this.$router.push(path)
    }
  }
};
</script>

<style scoped>
/* .active img {
  animation: fadeIn;
} */
.page-wrapper {
  background-color: rgb(0, 21, 41);

  padding-top: 50px;
}
.container {
  max-width: 990px;
  margin: 0 auto;
  color: #fff;
}
h1 {
  color: #fff;
  font-size: 30px;
  margin-bottom: 40px;
}
.section-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: radial-gradient(
      circle closest-side,
      rgba(0, 21, 41, 0.65),
      rgb(0, 21, 41)
    ),
    url("../assets/wire.png");
  background-size: contain;
}
.row {
  width: 100%;
}
img {
  animation-duration: 0.7s;
  width: 100%;
  height: auto;
}
.image_0 {
  position: absolute;
  top: -80px;
  right: -85px;
  width: 135%;
}
.image_1 {
  position: absolute;
  top: -80px;
  width: 85%;
}
.image_2 {
  position: absolute;
  width: 85%;
  right: 0;
}
.image_3 {
  position: absolute;
  top: -85px;
  width: 85%;
}
p {
  animation-delay: 0.5s;
  animation-duration: 1s;
  font-size: 22px;
  margin-bottom: 60px;
}
button {
  animation-delay: 1s;
  animation-duration: 0.3s;
}
.line {
  position: absolute;
  width: 600px;
  bottom: 90px;
}
.mouse {
  position: absolute;
  width: 25px;
  bottom: 110px;
  animation-delay: 1.3s;
}
</style>
