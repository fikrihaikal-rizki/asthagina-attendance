<script setup>
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import {
  CopyIcon,
  InfoCircledIcon,
  Link1Icon,
  LinkBreak2Icon,
  SymbolIcon,
} from "@radix-icons/vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { onMounted, ref } from "vue";
import router from "@/router";
import {
  syncMaster,
  syncAttendances,
  syncMasterStatus,
  syncAttendancesStatus,
  loadSync,
} from "@/composables/syncState.js";
import {
  activeHours,
  activeLinks,
  initActiveLink,
  pullActiveLink,
  generateLink,
  inactiveLink,
} from "@/composables/linksState.js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClipboard } from "@vueuse/core";

const { copy } = useClipboard();

var revokeAccess = ref("No");
const revokeAccessOptions = ["No", "Yes"];

const isRevokeDialog = ref(false);

function openRevokeDialog(open) {
  isRevokeDialog.value = open;
}

function generateRevokeLink() {
  isRevokeDialog.value = false;
  generateLink(true);
}

const isInactiveDialog = ref(false);

function openInactiveDialog(open) {
  isInactiveDialog.value = open;
}

function doInactiveLink(link) {
  isInactiveDialog.value = false;
  inactiveLink(link);
}

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
        <Button class="w-full" @click="router.push('/attendance-scaner')"
          >Ambil Absensi</Button
        >
      </Card>
      <p>Sinkronisasi Data</p>
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
      <p>Link Kupon Harian</p>
      <Card class="w-full p-3">
        <div class="grid grid-flow-col grid-rows-1 pb-4">
          <div class="flex items-center justify-start row-span-3">
            <p>List Link Kupon</p>
          </div>
          <div class="flex items-center justify-end row-span-1">
            <Button class="bg-green-500" @click="pullActiveLink()">
              <SymbolIcon class="text-xl" bold />
            </Button>
          </div>
        </div>
        <div
          v-if="activeLinks.length == 0"
          class="grid grid-flow-col grid-rows-1 pb-2"
        >
          <div class="flex items-center justify-center row-span-3">
            Tidak ada link aktif
          </div>
        </div>
        <div
          v-for="(activeLink, index) in activeLinks"
          class="grid grid-flow-col grid-rows-1 pb-2"
        >
          <div class="col-span-3 row-span-2">
            <Input
              id="linkCoupon"
              placeholder="Link Kupon"
              v-model="activeLinks[index].link"
              readonly
            />
          </div>
          <div class="flex items-center justify-end row-span-1">
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button>
                  <InfoCircledIcon class="text-xl" bold />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle as-child>
                    <div class="flex items-center">Info Link Aktif</div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div class="grid items-center w-full gap-4">
                      <div class="flex flex-col space-y-1.5">
                        <Label :for="'date_' + index">Tanggal</Label>
                        <Input
                          :id="'date_' + index"
                          v-model="activeLinks[index].date"
                        />
                      </div>
                      <div class="flex flex-col space-y-1.5">
                        <Label :for="'startDate_' + index"
                          >Link Mulai Aktif</Label
                        >
                        <Input
                          :id="'startDate_' + index"
                          v-model="activeLinks[index].startDate"
                        />
                      </div>
                      <div class="flex flex-col space-y-1.5">
                        <Label :for="'endDate_' + index"
                          >Link Berakhir Aktif</Label
                        >
                        <Input
                          :id="'endDate_' + index"
                          v-model="activeLinks[index].endDate"
                        />
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction as-child>
                    <Button
                      class="bg-red-500"
                      @click="openInactiveDialog(true)"
                    >
                      <LinkBreak2Icon class="text-xl" bold />Inactive Link
                    </Button>
                  </AlertDialogAction>
                  <AlertDialogAction
                    as-child
                    @click="copy(activeLinks[index].link)"
                  >
                    <Button class="bg-green-500">
                      <CopyIcon class="text-xl" bold />Copy Link
                    </Button>
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <AlertDialog :open="isInactiveDialog">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi</AlertDialogTitle>
                <AlertDialogDescription>
                  Ubah status link aktif menjadi inactive?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel @click="openInactiveDialog(false)"
                  >Cancel</AlertDialogCancel
                >
                <AlertDialogAction
                  as-child
                  @click="doInactiveLink(activeLinks[index].link)"
                >
                  <Button class="bg-red-500">
                    <LinkBreak2Icon class="text-xl" bold />Inactive Link
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
      <Card class="w-full p-3">
        <div class="pb-2">
          <Label for="activeHours">Waktu Link Aktif</Label>
          <Input
            type="number"
            id="activeHours"
            placeholder="Masukan Lama Link Aktif"
            v-model="activeHours"
          />
        </div>
        <div class="pb-4">
          <Label for="revokeSelect">Hapus Akses Link Sebelumnya</Label>
          <Select id="revokeSelect" v-model="revokeAccess">
            <SelectTrigger>
              <SelectValue placeholder="Hapus Akses Link Sebelumnya" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in revokeAccessOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="pb-0">
          <Button
            class="w-full bg-green-500"
            @click="
              revokeAccess == 'Yes'
                ? openRevokeDialog(true)
                : generateLink(false)
            "
          >
            <Link1Icon class="text-xl" bold /> Generate Link
          </Button>
        </div>
        <AlertDialog :open="isRevokeDialog">
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi</AlertDialogTitle>
              <AlertDialogDescription>
                Peserta yang sudah mengambil kupon dengan link aktif sebelumnya
                akan di hapus dan semua link aktif akan di non aktif.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel @click="openRevokeDialog(false)"
                >Cancel</AlertDialogCancel
              >
              <AlertDialogAction as-child>
                <Button class="bg-green-500" @click="generateRevokeLink()">
                  <Link1Icon class="text-xl" bold /> Generate Link
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
