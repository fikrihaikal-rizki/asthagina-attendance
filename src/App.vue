<script setup>
import Loading from '@/pages/Loading.vue';
import { getLoadingState } from '@/composables/loadingState';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Cross1Icon, ExclamationTriangleIcon } from '@radix-icons/vue'
import { getErrorMessage, getErrorState, setErrorState } from './composables/errorState';

</script>

<template>
  <Suspense>
    <div>
      <div v-if="getErrorState()"
        class="absolute z-10 flex items-center justify-center max-h-full bg-white/30 backdrop-blur-sm inset-1"
        @click="setErrorState(!getErrorMessage())">
        <Alert variant="destructive" class="bg-red-100 w-[350px]">
          <ExclamationTriangleIcon class="w-4 h-4" />
          <AlertTitle>Error<Cross1Icon class="float-right" @click="setErrorState(!getErrorMessage())"></Cross1Icon>
          </AlertTitle>
          <AlertDescription>
            {{ getErrorMessage() }}
          </AlertDescription>
        </Alert>
      </div>
      <div>
        <RouterView></RouterView>
      </div>
      <div class="absolute z-10 flex items-center justify-center max-h-full bg-white/30 backdrop-blur-sm inset-1"
        v-if="getLoadingState()">
        <Loading></Loading>
      </div>
    </div>
  </Suspense>
</template>
