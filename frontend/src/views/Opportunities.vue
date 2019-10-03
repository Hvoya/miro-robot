<template>
  <div class="opp-page-wrapper">
    <Navigation place="static" />
    <div class="opp-content">
      <a-card class="opp-wrapper-card">
        <h1 class="opp-heading">{{$t('headings.opps_heading')}}</h1>
        <a-tabs defaulActiveKey="1">
          <a-tab-pane :tab="$t(`headings.opps.${tab.name}.short`)" v-for="tab in tabs" :key="tab">
            <h3 class="opp-sub-heading">{{$t(`headings.opps.${tab.name}.main`)}}</h3>
            <div class="card-container">
              <a-card
                hoverable
                class="opp-card"
                v-for="card of tab.name === 'mentor' ? 2 : 3"
                :key="card"
              >
                <h4 class="opp-card-heading">
                  <a-icon
                    :style="{color: 'rgb(251, 1, 1)', fontSize: '25px', marginRight: '15px'}"
                    :type="tab.icons[card - 1]"
                  />
                  <span>{{$t(`headings.opps.${tab.name}.${card}`)}}</span>
                </h4>
                <p>{{$t(`texts.opps.${tab.name}.${card}`)}}</p>
              </a-card>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Projects/Navigation";

export default {
  components: {
    Navigation
  },
  data() {
    return {
      tabs: [
        { name: "begginer", icons: ["snippets", "book", "robot"] },
        { name: "gik", icons: ["share-alt", "unlock", "team"] },
        { name: "inst", icons: ["inbox", "sync", "cluster"] },
        { name: "mentor", icons: ["dollar", "gift"] }
      ]
    };
  }
};
</script>
<style >
.opp-page-wrapper {
  padding-top: 120px;
}
.opp-content {
  max-width: 990px;
  margin: 0 auto;
}
.opp-heading {
  backface-visibility: hidden;
  position: absolute;
  transform: rotate(-90deg);
  font-weight: 500;
  font-size: 80px;
  line-height: 0;
  text-transform: uppercase;
  color: rgb(251, 1, 1);

  left: -235px;
  top: 332px;
  animation: up 0.5s ease-in 0s both;
}
@keyframes up {
  0% {
    transform: rotate(-90deg) translate3d(0, -1000px, 0);
  }
  100% {
    transform: rotate(-90deg) translate3d(0, 0, 0);
  }
}
.opp-sub-heading {
  font-size: 30px;
  font-weight: 400;
  margin: 20px 0;
}
.opp-card-heading {
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(232, 232, 232);
  margin-bottom: 15px;
  font-weight: 400;
}
.opp-wrapper-card {
  padding-left: 110px;
  position: relative;
  min-height: 80vh;
}
.opp-page-wrapper .ant-tabs-nav-scroll {
  display: flex;
  justify-content: flex-end;
  animation: down 0.5s ease-in 0.5s forwards;
  position: relative;
  transform: translateY(150px);
}
@keyframes down {
  0% {
    transform: translateY(150px);
  }
  100% {
    transform: translateY(0);
  }
}
.opp-card {
  flex-basis: 300px;
  margin-bottom: 50px;
}
.card-container {
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
