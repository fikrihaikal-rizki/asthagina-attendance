<script setup>
import Loading from '@/pages/Loading.vue';
import { getLoadingState } from '@/composables/loadingState';
import AlertDialog from './pages/AlertInfo.vue';

</script>

<template>
  <Suspense>
    <div>
      <AlertDialog />
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
