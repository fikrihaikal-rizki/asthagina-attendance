import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "login",
      path: "/login",
      component: () => import("@/pages/Login.vue"),
    },
    {
      name: "dashboard",
      path: "/",
      component: () => import("@/pages/Dashboard.vue"),
    },
    {
      name: "attendance-scaner",
      path: "/attendance-scaner",
      component: () => import("@/pages/AttendanceScanner.vue"),
    },
    {
      name: "not-found",
      path: "/:pathMatch(.*)*",
      component: () => import("@/pages/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
