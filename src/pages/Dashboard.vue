<script setup>
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";

import { onMounted, ref } from "vue";
import router from "@/router";
import { loadSync } from "@/composables/syncState.js";
import { initActiveLink } from "@/composables/linksState.js";
import { initReportDate } from "@/composables/reportState.js";
import LinkList from "./LinkList.vue";
import GenerateLink from "./GenerateLink.vue";
import SyncMaster from "./SyncMaster.vue";
import AttendanceReportDashboard from "./AttendanceReportDashboard.vue";

onMounted(() => {
  loadSync();
  initActiveLink();
  initReportDate();
});
</script>
<template>
  <div class="flex items-center justify-center p-5">
    <div class="w-[350px] grid gap-4">
      <p>Scanner Absensi</p>
      <Card class="w-full p-3">
        <Button class="w-full" @click="router.push('/attendance-scaner')"
          >Ambil Absensi</Button
        >
      </Card>
      <p>Laporan Absensi</p>
      <AttendanceReportDashboard />
      <p>Sinkronisasi Data</p>
      <SyncMaster />
      <p>Link Kupon Harian</p>
      <LinkList />
      <div>
        <p>Generate Link Kupon</p>
        <GenerateLink />
      </div>
    </div>
  </div>
</template>
