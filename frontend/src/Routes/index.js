import Vue from "vue";
import Router from "vue-router";
import Projects from './projects.vue';
import Static from './static.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "",
      component: Static,
      children: [
        {
          path: "",
          component: () => import("../views/Main.vue")
        },
        {
          path: "/opportunities",
          component: () => import("../views/Opportunities.vue")
        },
        {
          path: "/resources",
          component: () => import("../views/Resources.vue")
        },
        {
          path: "/about",
          component: () => import("../views/About.vue")
        }
      ]
    },
    {
      path: "/projects",
      component: Projects,
      children: [
        {
          path: "",
          component: () => import("../views/ProjectList.vue")
        },
        {
          path: "activation/:token",
          component: () => import("../views/ActivationPage.vue")
        },
        {
          path: "registration",
          component: () => import("../views/Registration.vue")
        },
        {
          path: "login",
          component: () => import("../views/Login.vue")
        },
        {
          path: "new",
          component: () => import("../views/NewProject.vue")
        },
        {
          path: "buy",
          component: () => import("../views/Buy.vue")
        },
        {
          path: ":id/edit",
          component: () => import("../views/NewProject.vue")
        },
        {
          path: ":id",
          component: () => import("../views/SingleProject.vue")
        },
        {
          path: "users/:id",
          component: () => import("../views/Profile.vue")
        }
      ]
    }
    // {
    //   path: "/projects/registration",
    //   component: () => import("./views/Registration.vue")s
    // },
    // {
    //   path: "/projects/login",
    //   component: () => import("./views/Login.vue")
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
