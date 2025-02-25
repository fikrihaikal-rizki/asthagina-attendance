<script setup>
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import { CopyIcon, Link1Icon, SymbolIcon } from '@radix-icons/vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { onMounted, ref } from 'vue';
import router from '@/router';
import { syncMaster, syncAttendances, syncMasterStatus, syncAttendancesStatus, loadSync } from '@/composables/syncState.js';
import { activeHours, activeLink, initActiveLink, pullActiveLink, generateLink } from '@/composables/linksState.js';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useClipboard } from '@vueuse/core';

const { copy } = useClipboard({ activeLink })

var dateSelected = ref('02-02-2024');
const dateOptions = [
  { label: '02-02-2024', text: '02-02-2024' },
  { label: '03-02-2024', text: '03-02-2024' },
];

var revokeAccess = ref('No');
const revokeAccessOptions = [
  'No',
  'Yes',
];

onMounted(() => {
  loadSync();
  initActiveLink();
});

</script>
<template>
  <div class="flex items-center justify-center p-5">
    <div class="w-[350px] grid gap-4">
      <p>Scanner Absensi</p>
      <Card class="w-full p-3">
        <Button class="w-full" @click="router.push('/attendance-scaner')">Ambil Absensi</Button>
      </Card>
      <p>Sinkronisasi Data</p>
      <Card class="w-full p-3">
        <div class="grid grid-flow-col grid-rows-2">
          <div class="col-span-2">
            <h1 bold>Sinkronisasi Master</h1>
          </div>
          <div class="col-span-2">
            <span class="text-xs italic text-black-300">{{ syncMasterStatus.syncedDate }}</span>
          </div>
          <div class="flex items-center justify-end row-span-2">
            <Button class="bg-green-500" @click="syncMaster()" :disabled="!syncMasterStatus.status">
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
            <span class="text-xs italic text-black-300">{{ syncAttendancesStatus.syncedDate }}</span>
          </div>
          <div class="flex items-center justify-end row-span-2">
            <Button class="bg-green-500" @click="syncAttendances()" :disabled="!syncAttendancesStatus.status">
              <SymbolIcon class="text-xl" bold />
            </Button>
          </div>
        </div>
      </Card>
      <p>Link Kupon Harian</p>
      <Card class="w-full p-3">
        <div class="grid grid-flow-col grid-rows-1">
          <div class="flex items-center justify-start row-span-1">
            <Button class="bg-green-500" @click="pullActiveLink()">
              <SymbolIcon class="text-xl" bold />
            </Button>
          </div>
          <div class="col-span-3 row-span-2">
            <Input id="linkCoupon" placeholder="Link Kupon" v-model="activeLink" readonly />
          </div>
          <div class="flex items-center justify-end row-span-1">
            <Button class="bg-green-500" @click="copy(activeLink)" :disabled="activeLink == ''">
              <CopyIcon class="text-xl" bold />
            </Button>
          </div>
        </div>
      </Card>
      <Card class="w-full p-3">
        <div class="pb-2">
          <Label for="activeHours">Waktu Link Aktif</Label>
          <Input type="number" id="activeHours" placeholder="Masukan Lama Link Aktif" v-model="activeHours" />
        </div>
        <div class="pb-4">
          <Label for="revokeSelect">Hapus Akses Link Sebelumnya</Label>
          <Select id="revokeSelect" v-model="revokeAccess">
            <SelectTrigger>
              <SelectValue placeholder="Hapus Akses Link Sebelumnya" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in revokeAccessOptions" :key="option" :value="option">
                {{ option }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="pb-0">
          <Button class="w-full bg-green-500" @click="generateLink(revokeAccess == 'Yes')">
            <Link1Icon class="text-xl" bold /> Generate Link
          </Button>
        </div>
      </Card>
      <!-- <p>Laporan Absensi</p> -->
      <!-- <Card class="w-full p-3">
                <div class="grid grid-flow-col grid-rows-2">
                    <div class="col-span-3 row-span-2">
                        <Select name="dateSelect" v-model="dateSelected">
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Tanggal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="option in dateOptions" :key="option.label"
                                    :value="option.text">
                                    {{ option.label }}
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