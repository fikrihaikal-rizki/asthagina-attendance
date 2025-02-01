<script setup>
import Loading from '@/pages/Loading.vue';
import { getLoadingState } from '@/composables/loadingState';

</script>

<template>
  <Suspense>
    <div>
      <div v-if="!getLoadingState()">
        <RouterView></RouterView>
      </div>
      <div class="flex items-center justify-center h-screen" v-if="getLoadingState()">
        <Loading></Loading>
      </div>
    </div>
  </Suspense>
</template>
