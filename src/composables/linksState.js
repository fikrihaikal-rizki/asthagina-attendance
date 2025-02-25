import { ref } from "vue";
import { sendRequest } from "./requestHelper";
import { setLoadingState } from "./loadingState";
import { setErrorMessage, setErrorState } from "./errorState";

export const activeLink = ref("");
export const activeHours = ref(12);

async function getActiveLink() {
  const link = await sendRequest("links/get-active");

  if (link.data === undefined) {
    return;
  }

  activeLink.value = link.data;
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
}
