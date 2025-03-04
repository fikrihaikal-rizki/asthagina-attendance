<script setup>
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
} from "@/components/ui/alert-dialog";
import Card from "@/components/ui/card/Card.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import { Link1Icon } from "@radix-icons/vue";
import { generateLink, linkForm } from "@/composables/linksState";
import { ref } from "vue";
import Button from "@/components/ui/button/Button.vue";
import DatePicker from "@/components/DatePicker.vue";
import TimePicker from "@/components/TimePicker.vue";

const revokeAccessOptions = ["No", "Yes"];

var revokeAccess = ref("No");
const isRevokeDialog = ref(false);

function openRevokeDialog(open) {
  isRevokeDialog.value = open;
}

function generateRevokeLink() {
  isRevokeDialog.value = false;
  generateLink(true);
}
</script>
<template>
  <Card class="w-full p-3">
    <div class="pb-2">
      <Label class="pb-1">Tanggal Link</Label>
      <DatePicker class="w-full" v-model="linkForm.date" />
    </div>
    <div class="pb-2">
      <Label class="pb-1">Tanggal Link Aktif</Label>
      <DatePicker class="w-full" v-model="linkForm.startDate" />
    </div>
    <div class="pb-2">
      <Label class="pb-1">Waktu Link Aktif</Label>
      <TimePicker v-model="linkForm.startTime" />
    </div>
    <div class="pb-2">
      <Label for="activeHours">Durasi Link Aktif</Label>
      <Input
        type="number"
        id="activeHours"
        placeholder="Masukan Lama Link Aktif"
        v-model="linkForm.duration"
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
          revokeAccess == 'Yes' ? openRevokeDialog(true) : generateLink(false)
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
            Peserta yang sudah mengambil kupon dengan link aktif sebelumnya akan
            di hapus dan semua link aktif akan di non aktif.
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
</template>
