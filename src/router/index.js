import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("@/pages/Dashboard/Dashboard.vue") },
    { path: "/sync", component: () => import("@/pages/Sync.vue") },
    { path: "/login", component: () => import("@/pages/Login.vue") },
    {
      path: "/attendance-scaner",
      component: () => import("@/pages/AttendanceScanner.vue"),
    },
    {
      name: "scan-result",
      path: "/scan-result",
      component: () => import("@/pages/ScanResult/ScanResultPage.vue"),
      props: route => ({ attendance: route.params }),
    },
  ],
});

export default router;
