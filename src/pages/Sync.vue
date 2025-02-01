<script setup>
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import { SymbolIcon } from '@radix-icons/vue';
import { ref } from 'vue';
import { firestoreDb } from '@/composables/initializeFirebase';
import { collection, getDocs } from "firebase/firestore";

const db = firestoreDb();

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
            <Card class="w-full p-3">
                <div class="grid grid-flow-col grid-rows-2">
                    <div class="col-span-2">
                        <h1 bold>Sinkronisasi Pengguna</h1>
                    </div>
                    <div class="col-span-2">
                        <span class="text-xs italic text-black-300">Tersinkron 27/01/2025</span>
                    </div>
                    <div class="flex items-center justify-end row-span-2">
                        <Button class="bg-green-500"><SymbolIcon class="text-xl" bold /></Button>
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
                        <Button class="bg-green-500"><SymbolIcon class="text-xl" bold /></Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>