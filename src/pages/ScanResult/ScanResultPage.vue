<script setup>
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import { checkLogin } from '@/composables/authHelper';
import { setLoadingState } from '@/composables/loadingState';
import { sendRequest } from '@/composables/requestHelper';
import { CheckCircledIcon } from '@radix-icons/vue';
import { onMounted, ref } from 'vue';

// var attendance = ref({});
checkLogin();

defineProps({
  attendance: Object,
})

</script>

<template>
  <!-- <div class="flex items-center justify-center h-screen"> -->
    <div >
      <Card class="w-full p-3">
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="name">Nama Lengkap</Label>
            <Input readonly id="name" v-model="attendance['Nama Lengkap']" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="nomor">Nomor Telepon</Label>
            <Input id="nomor" v-model="attendance['Nomor telepon']" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="email">Email</Label>
            <Input id="email" v-model="attendance['Email']" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="alamat">Alamat Kos</Label>
            <Input id="alamat" v-model="attendance['Alamat Kos']" />
          </div>
          <!-- <div class="flex flex-col space-y-1.5 mt-5">
            <Button class="bg-green-500">
              <CheckCircledIcon class="font-bold"></CheckCircledIcon>Catat Absen
            </Button>
          </div> -->
        </div>
      </Card>
    </div>
  <!-- </div> -->
</template>