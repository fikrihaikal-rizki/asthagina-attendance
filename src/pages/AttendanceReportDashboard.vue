<script setup>
import AlertDialog from "@/components/ui/alert-dialog/AlertDialog.vue";
import AlertDialogCancel from "@/components/ui/alert-dialog/AlertDialogCancel.vue";
import AlertDialogContent from "@/components/ui/alert-dialog/AlertDialogContent.vue";
import AlertDialogDescription from "@/components/ui/alert-dialog/AlertDialogDescription.vue";
import AlertDialogFooter from "@/components/ui/alert-dialog/AlertDialogFooter.vue";
import AlertDialogHeader from "@/components/ui/alert-dialog/AlertDialogHeader.vue";
import AlertDialogTitle from "@/components/ui/alert-dialog/AlertDialogTitle.vue";
import AlertDialogTrigger from "@/components/ui/alert-dialog/AlertDialogTrigger.vue";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  reportDates,
  dateReport,
  reportSummary,
  openReportSummary,
} from "@/composables/reportState";
import { ReaderIcon } from "@radix-icons/vue";
</script>

<template>
  <Card class="w-full p-3">
    <div class="pb-2">
      <Label for="revokeSelect">Tanggal Laporan</Label>
      <Select id="revokeSelect" v-model="dateReport" class="w-full">
        <SelectTrigger>
          <SelectValue placeholder="Hapus Akses Link Sebelumnya" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="option in reportDates"
            :key="option"
            :value="option"
          >
            {{ option }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div class="pb-2">
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button class="w-full" @click="openReportSummary()">
            <ReaderIcon class="text-xl" bold /> Lihat Ringkasan
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle as-child>
              <div class="flex items-center">
                Ringkasan Laporan {{ dateReport }}
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div class="grid items-center w-full gap-4">
                <div class="flex flex-col space-y-1.5">
                  <Label for="hadir">Total Hadir</Label>
                  <Input id="hadir" v-model="reportSummary.present" readonly />
                </div>
                <div class="flex flex-col space-y-1.5">
                  <Label for="absen">Total Absen</Label>
                  <Input id="absen" v-model="reportSummary.absen" readonly />
                </div>
                <div class="flex flex-col space-y-1.5">
                  <Label for="total">Total Peserta</Label>
                  <Input id="total" v-model="reportSummary.total" readonly />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tutup</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </Card>
</template>
