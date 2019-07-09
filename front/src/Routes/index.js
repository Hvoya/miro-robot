import Vue from "vue";
import Router from "vue-router";
import Projects from './projects.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/projects",
      component: Projects,
      children: [
        {
          path: "",
          component: () => import("../views/ProjectList.vue")
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
