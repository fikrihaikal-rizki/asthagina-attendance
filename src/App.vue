<script setup>
import Loading from '@/pages/Loading.vue';
import { getLoadingState } from '@/composables/loadingState';
import { checkLogin } from '@/composables/authHelper'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ButtonIcon, Cross1Icon, ExclamationTriangleIcon } from '@radix-icons/vue'
import { getErrorMessage, getErrorState, setErrorState } from './composables/errorState';
import Button from './components/ui/button/Button.vue';

checkLogin()

</script>

<template>
  <Suspense>
    <div>
      <div v-if="getErrorState()" class="absolute z-10 flex items-start justify-center h-6 inset-1">
        <Alert variant="destructive" class="bg-red-100 w-[350px]">
          <ExclamationTriangleIcon class="w-4 h-4" />
          <AlertTitle>Error<Cross1Icon class="float-right" @click="setErrorState(!getErrorMessage())"></Cross1Icon></AlertTitle>
          <AlertDescription>
            {{ getErrorMessage() }}
          </AlertDescription>
        </Alert>
      </div>
      <div v-if="!getLoadingState()">
        <RouterView></RouterView>
      </div>
      <div class="flex items-center justify-center h-screen" v-if="getLoadingState()">
        <Loading></Loading>
      </div>
    </div>
  </Suspense>
</template>
