import { ref } from "vue";
import { sendRequest } from "./requestHelper";
import { setLoadingState } from "./loadingState";
import { setErrorMessage, setErrorState } from "./errorState";
import { setSuccessMessage, setSuccessState } from "./successState";

export const activeLinks = ref([]);
export const activeHours = ref(12);

async function getActiveLink() {
  const link = await sendRequest("links/get-active");

  if (link.data === undefined) {
    activeLinks.value = [];
    return;
  }

  activeLinks.value = link.data;
}

export async function initActiveLink() {
  await getActiveLink();
}

export async function pullActiveLink() {
  setLoadingState(true);
  await getActiveLink();
  setLoadingState(false);
}

export async function generateLink(revokeAccess) {
  setLoadingState(true);

  const date = new Date();
  var month = date.getMonth() + 1;
  month = month.toString().padStart(2, "0");
  var dayDate = date.getDate();
  dayDate = dayDate.toString().padStart(2, "0");
  var newDate = date.getFullYear() + "-" + month + "-" + dayDate;

  var body = {
    date: newDate,
    duration: activeHours.value,
    revokePrevious: revokeAccess,
  };

  const generate = await sendRequest("links/generate", body);
  if (!generate.status) {
    setErrorState(true);
    setErrorMessage(generate.message);
    setLoadingState(false);
    return;
  }

  await getActiveLink();
  setLoadingState(false);
  setSuccessState(true);
  setSuccessMessage("Success genererate link");
}

export async function inactiveLink(link) {
  setLoadingState(true);
  var body = {
    link: link,
  };

  const inactive = await sendRequest("links/inactive", body);
  if (!inactive.status) {
    setErrorState(true);
    setErrorMessage(inactive.message);
    setLoadingState(false);
    return;
  }

  await getActiveLink();
  setLoadingState(false);
  setSuccessState(true);
  setSuccessMessage("Success inactive link");
}
