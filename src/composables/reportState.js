import { ref } from "vue";
import { sendRequest } from "./requestHelper";
import { setLoadingState } from "./loadingState";

export const reportDates = ref([]);
export const dateReport = ref(tadayDate());
export const reportSummary = ref({ present: 0, absen: 0, total: 0 });

async function getReportDate() {
  const date = await sendRequest("reports/get-date");

  if (date.data === undefined) {
    reportDates.value = [];
    return;
  }

  var resultDate = [];
  date.data.forEach((element) => {
    resultDate.push(new Date(element));
  });
  resultDate.sort((a, b) => a - b);

  var sortedDate = [];
  resultDate.forEach((element) => {
    sortedDate.push(convertDate(element));
  });

  reportDates.value = sortedDate;
}

export async function initReportDate() {
  await getReportDate();
}

async function getReportSummary() {
  const summary = await sendRequest("reports/summary", {
    reportDate: dateReport.value,
  });

  if (summary.data === undefined) {
    return;
  }

  reportSummary.value = summary.data;
}

export async function openReportSummary() {
  setLoadingState(true);
  await getReportSummary();
  setLoadingState(false);
}

function tadayDate() {
  const date = new Date();
  var month = date.getMonth() + 1;
  month = month.toString().padStart(2, "0");
  var dayDate = date.getDate();
  dayDate = dayDate.toString().padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + dayDate;
}

function convertDate(dateString) {
  const date = new Date(dateString);
  var month = date.getMonth() + 1;
  month = month.toString().padStart(2, "0");
  var dayDate = date.getDate();
  dayDate = dayDate.toString().padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + dayDate;
}
