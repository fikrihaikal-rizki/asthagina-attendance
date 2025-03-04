import { ref } from "vue";
import { sendRequest } from "./requestHelper";
import { setLoadingState } from "./loadingState";
import { setErrorMessage, setErrorState } from "./errorState";
import { setSuccessMessage, setSuccessState } from "./successState";

export const activeLinks = ref([]);
export const linkForm = ref({
  date: "",
  startDate: "",
  startTime: "00:00",
  duration: 12,
  revokePrevious: false,
});

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
  var newLinkForm = {};
  newLinkForm.date = linkForm.value.date;
  newLinkForm.duration = linkForm.value.duration;
  newLinkForm.startDate =
    linkForm.value.startDate + " " + linkForm.value.startTime + ":00";
  newLinkForm.revokePrevious = revokeAccess;

  setLoadingState(true);

  const generate = await sendRequest("links/generate", newLinkForm);
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
