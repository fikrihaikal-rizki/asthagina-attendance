<script setup>
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  getErrorMessage,
  getErrorState,
  setErrorState,
} from "@/composables/errorState";
import {
  getSuccessMessage,
  getSuccessState,
  setSuccessState,
} from "@/composables/successState";
import {
  Cross1Icon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-icons/vue";
</script>

<template>
  <div
    v-if="getErrorState()"
    class="absolute z-10 flex items-center justify-center max-h-full bg-white/30 backdrop-blur-sm inset-1"
    @click="setErrorState(!getErrorMessage())"
  >
    <Alert variant="destructive" class="bg-red-100 w-[350px]">
      <ExclamationTriangleIcon class="w-4 h-4" />
      <AlertTitle
        >Error<Cross1Icon
          class="float-right"
          @click="setErrorState(!getErrorMessage())"
        ></Cross1Icon>
      </AlertTitle>
      <AlertDescription>
        {{ getErrorMessage() }}
      </AlertDescription>
    </Alert>
  </div>
  <div
    v-if="getSuccessState()"
    class="absolute z-10 flex items-center justify-center max-h-full bg-white/30 backdrop-blur-sm inset-1"
    @click="setSuccessState(!getSuccessMessage())"
  >
    <Alert class="w-[350px]">
      <CheckCircledIcon class="w-4 h-4" />
      <AlertTitle
        >Info<Cross1Icon
          class="float-right"
          @click="setSuccessState(!getSuccessMessage())"
        ></Cross1Icon>
      </AlertTitle>
      <AlertDescription>
        {{ getSuccessMessage() }}
      </AlertDescription>
    </Alert>
  </div>
</template>
