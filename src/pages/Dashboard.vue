<script setup>
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";

import { onMounted } from "vue";
import router from "@/router";
import { loadSync } from "@/composables/syncState.js";
import { initActiveLink } from "@/composables/linksState.js";
import { initReportDate, reportDate } from "@/composables/reportState.js";
import LinkList from "./LinkList.vue";
import GenerateLink from "./GenerateLink.vue";
import SyncMaster from "./SyncMaster.vue";

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
      <p>Sinkronisasi Data</p>
      <SyncMaster />
      <p>Link Kupon Harian</p>
      <LinkList />
      <div>
        <p>Generate Link Kupon</p>
        <GenerateLink />
      </div>
      <!-- <p>Laporan Absensi</p>
      <Card class="w-full p-3">
        <div class="grid grid-flow-col grid-rows-2">
          <div class="col-span-3 row-span-2">
            <Select name="dateSelect" v-model="dateSelected">
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tanggal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="date in reportDate"
                  :key="date"
                  :value="date"
                >
                  {{ date }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center justify-end row-span-2">
            <Button class="bg-green-500">
              <SymbolIcon class="text-xl" bold />
            </Button>
          </div>
        </div>
      </Card> -->
    </div>
  </div>
</template>
