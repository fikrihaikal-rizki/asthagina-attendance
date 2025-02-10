<script setup>
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import { SymbolIcon } from '@radix-icons/vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ref } from 'vue';
import { firestoreDb } from '@/composables/initializeFirebase';
import { collection, getDocs } from "firebase/firestore";
import router from '@/router';
import { checkLogin } from '@/composables/authHelper';

checkLogin();

const db = firestoreDb();

var dateSelected = ref('02-02-2024');
const dateOptions = [
    {label: '02-02-2024', text: '02-02-2024'},
    {label: '03-02-2024', text: '03-02-2024'},
];

const sync = ref({});


// const querySnapshot = await db.collection('Sync');
const querySnapshot = await getDocs(collection(db, 'Sync'));
querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
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
                        <h1 bold>Sinkronisasi Pengguna</h1>
                    </div>
                    <div class="col-span-2">
                        <span class="text-xs italic text-black-300">Tersinkron 27/01/2025</span>
                    </div>
                    <div class="flex items-center justify-end row-span-2">
                        <Button class="bg-green-500">
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
                        <span class="text-xs italic text-black-300">Tersinkron 27/01/2025</span>
                    </div>
                    <div class="flex items-center justify-end row-span-2">
                        <Button class="bg-green-500">
                            <SymbolIcon class="text-xl" bold />
                        </Button>
                    </div>
                </div>
            </Card>
            <p>Laporan Absensi</p>
            <Card class="w-full p-3">
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
            </Card>
        </div>
    </div>
</template>