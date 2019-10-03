import Vue from "vue";
import App from "./App.vue";
import router from "./Routes";
import store from "./store/index";
import antd from "ant-design-vue";
import "./less/index.less";
import "./animate.css";
import VueI18n from "vue-i18n";
import VueFullPage from 'vue-fullpage.js';

import { messages, changePlurallizeRules } from "./i18n";

export const SERVER_ADDRESS = 'http://localhost:3001'

Vue.use(VueFullPage);

Vue.config.productionTip = false;

changePlurallizeRules(VueI18n);
Vue.use(VueI18n);

const lang = localStorage.getItem('lang');

const i18n = new VueI18n({
  locale: lang ? lang : 'ru',
  messages
});

Vue.use(antd);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
