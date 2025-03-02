<script setup>
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import { SymbolIcon } from "@radix-icons/vue";
import {
  syncMaster,
  syncAttendances,
  syncMasterStatus,
  syncAttendancesStatus,
} from "@/composables/syncState.js";
</script>
<template>
  <Card class="w-full p-3">
    <div class="grid grid-flow-col grid-rows-2">
      <div class="col-span-2">
        <h1 bold>Sinkronisasi Master</h1>
      </div>
      <div class="col-span-2">
        <span class="text-xs italic text-black-300">{{
          syncMasterStatus.syncedDate
        }}</span>
      </div>
      <div class="flex items-center justify-end row-span-2">
        <Button
          class="bg-green-500"
          @click="syncMaster()"
          :disabled="!syncMasterStatus.status"
        >
          <SymbolIcon class="text-xl" bold />
        </Button>
      </div>
    </div>
  </Card>
  <Card class="w-full p-3">
    <div class="grid grid-flow-col grid-rows-2">
      <div class="col-span-2">
        <h1 bold>Sinkronisasi Peserta</h1>
      </div>
      <div class="col-span-2">
        <span class="text-xs italic text-black-300">{{
          syncAttendancesStatus.syncedDate
        }}</span>
      </div>
      <div class="flex items-center justify-end row-span-2">
        <Button
          class="bg-green-500"
          @click="syncAttendances()"
          :disabled="!syncAttendancesStatus.status"
        >
          <SymbolIcon class="text-xl" bold />
        </Button>
      </div>
    </div>
  </Card>
</template>
