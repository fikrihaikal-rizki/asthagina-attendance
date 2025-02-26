import { ref } from "vue";

const isSuccess = ref(false);
const successMessage = ref("");

function getSuccessState() {
  return isSuccess.value;
}

function getSuccessMessage() {
  return successMessage.value;
}

function setSuccessState(param) {
  isSuccess.value = param;
  return isSuccess.value;
}

function setSuccessMessage(param) {
  successMessage.value = param;
  return successMessage.value;
}

export { getSuccessState, setSuccessState, setSuccessMessage, getSuccessMessage };
