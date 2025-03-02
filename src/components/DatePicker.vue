<script setup>
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { ref } from "vue";

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const model = defineModel({ type: String });
const value = ref("");
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'justify-start text-left font-normal w-full',
            !value && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class="w-4 h-4 mr-2" />
        {{
          value ? df.format(value.toDate(getLocalTimeZone())) : "Pilih Tanggal"
        }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        v-model="value"
        initial-focus
        :min-value="today(getLocalTimeZone())"
        @update:model-value="
          (v) => {
            if (v) {
              model = v.toString();
            }
          }
        "
      />
    </PopoverContent>
  </Popover>
</template>
