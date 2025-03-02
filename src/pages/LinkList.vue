<script setup>
import Button from "@/components/ui/button/Button.vue";
import {
  CopyIcon,
  InfoCircledIcon,
  LinkBreak2Icon,
  SymbolIcon,
} from "@radix-icons/vue";
import Card from "@/components/ui/card/Card.vue";
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
import {
  activeLinks,
  pullActiveLink,
  inactiveLink,
} from "@/composables/linksState.js";
import { useClipboard } from "@vueuse/core";
import { ref } from "vue";
import Label from "@/components/ui/label/Label.vue";
import Input from "@/components/ui/input/Input.vue";

const { copy } = useClipboard();
const isInactiveDialog = ref(false);

function openInactiveDialog(open) {
  isInactiveDialog.value = open;
}

function doInactiveLink(link) {
  isInactiveDialog.value = false;
  inactiveLink(link);
}
</script>

<template>
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
                    <Label :for="'startDate_' + index">Link Mulai Aktif</Label>
                    <Input
                      :id="'startDate_' + index"
                      v-model="activeLinks[index].startDate"
                    />
                  </div>
                  <div class="flex flex-col space-y-1.5">
                    <Label :for="'endDate_' + index">Link Berakhir Aktif</Label>
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
                <Button class="bg-red-500" @click="openInactiveDialog(true)">
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
</template>
