import { ref } from "vue";
import { sendRequest } from "./requestHelper";

export const reportDate = ref([]);

async function getReportDate() {
  const date = await sendRequest("reports/get-date");

  if (date.data === undefined) {
    reportDate.value = [];
    return;
  }

  reportDate.value = date.data;
}

export async function initReportDate() {
  await getReportDate();
}
