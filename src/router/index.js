import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("@/pages/Login.vue") },
    { path: "/sync", component: () => import("@/pages/Sync.vue") },
    { path: "/attendance-scaner", component: () => import("@/pages/AttendanceScanner.vue") },
],
});

export default router;
