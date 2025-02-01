<script setup>
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue';

import { firestoreDoc } from '@/composables/initializeFirebase';
import { setLoadingState } from '@/composables/loadingState';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref({ username: '', password: '' });

function clear() {
  user.value.username = '';
  user.value.password = '';
}

function validate() {

}

async function login() {
  setLoadingState(true);
  const docSnap = await firestoreDoc('Users', user.value.username);

  if (docSnap.exists()) {
    router.push('/sync');
  } else {
    console.log("No such document!");
  }

  setLoadingState(false);
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Masukan username dan password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Username</Label>
              <Input id="name" placeholder="Masukan username" v-model="user.username" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Password</Label>
              <Input type="password" id="password" placeholder="Masukan password" v-model="user.password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6">
        <Button variant="outline" @click="clear()">
          Clear
        </Button>
        <Button @click="login()">Login</Button>
      </CardFooter>
    </Card>
  </div>
</template>
