<template>
  <div class="container">
    <Navigation place="static" />
    <ol>
    <full-page class="full" ref="fullpage" :options="options" id="fullpage">
      <div class="section">
      <h1>{{$t('navigation.about')}}</h1>
      <li v-html="$t('texts.about.1')"></li>
      <div class="image-wrapper">
        <img :src="about_1" alt />
        <h2 :class="'heading_1 ' + animations[0]" v-html="$t('headings.about.1')"></h2>
      </div>
      </div>
      <div class="section">
      <li class="second-section" v-html="$t('texts.about.2')"></li>
      <div class="image-wrapper">
        <h2 :class="'heading_2 ' + animations[1]" v-html="$t('headings.about.2')"></h2>
        <img :src="about_2" alt />
      </div>
      </div>
        <div class="section">

      <li class="third-section" v-html="$t('texts.about.3')"></li>
      <div class="image-wrapper">
        <h2 :class="'heading_3 ' + animations[2]" v-html="$t('headings.about.3')"></h2>
        <img :src="about_3" alt />
      </div>
        </div>
        </full-page>
    </ol>
  </div>
</template>

<script>
import Navigation from "../components/Projects/Navigation";
import about_1 from "../assets/about_1.jpg";
import about_2 from "../assets/about_2.jpg";
import about_3 from "../assets/about_3.jpg";

export default {
  components: {
    Navigation
  },
  data() {
    return {
      about_1,
      about_2,
      about_3,
      options: {
        onLeave: this.animate
      },
      animations: ["right", "", ""] // first, second and third heading
    };
  },
  methods:{
    animate(origin, item, dest){
      const newAnimations = [...this.animations];
      newAnimations[item.index] = item.index % 2 === 0 ? "right" : "left";
      this.animations = newAnimations;
    }
  }
};
</script>

<style scoped>
    li{
        margin-top: 10px;
    }
    .second-section, .third-section{
        padding-top: 30px;
    }
h1 {
  text-align: center;
  margin-bottom: 0!important;
}
.licens{
  margin-top: 10px!important;
}
.container {
  padding-top: 67px;
  max-width: 990px;
  margin: 0 auto;
  min-height: 80vh;
  margin-bottom: 100px;
    font-size: 14px;
}
img {
  width: 570px;
    margin-left: 40px;
}
.section:nth-child(2) .image-wrapper{
    margin-left: 30px;
}
.image-wrapper {
    max-height: 300px;
  text-align: center;
  position: relative;
  margin-top: 20px;
}
.section:nth-child(2) .image-wrapper{
  text-align: left;
}
h2 {
  backface-visibility: hidden;
  position: absolute;
  font-weight: 700;
  font-size: 60px;
  line-height: 1;
  text-transform: uppercase;
}
.heading_1{
  transform: rotate(-90deg);
  text-align: left;
    left: -45px;
    top: 130px;
}
.heading_2{
  transform: rotate(90deg);
  text-align: left;
    top: 145px;
    right: 35px;
}
.heading_3{
  transform: rotate(-90deg);
  text-align: left;
    left: -50px;
    top: 130px;
}

.right{
  animation: r .5s ease-in 0s 1 forwards;
}
.left{
  animation: l .5s ease-in 0s 1 forwards;
}

@keyframes l {
  0% {
    transform: rotate(90deg) translate3d(0, -1000px, 0);
  }
  100% {
    transform: rotate(90deg) translate3d(0, 0, 0);
  }
}
@keyframes r {
  0% {
    transform: rotate(-90deg) translate3d(0, -1000px, 0);
  }
  100% {
    transform: rotate(-90deg) translate3d(0, 0, 0);
  }
}
</style>
