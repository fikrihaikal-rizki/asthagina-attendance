import { ref } from "vue";

const isError = ref(false);
const errorMessage = ref("");

function getErrorState() {
  return isError.value;
}

function getErrorMessage() {
  return errorMessage.value;
}

function setErrorState(param) {
  isError.value = param;
  return isError.value;
}

function setErrorMessage(param) {
  errorMessage.value = param;
  return errorMessage.value;
}

export { getErrorState, setErrorState, setErrorMessage, getErrorMessage };
