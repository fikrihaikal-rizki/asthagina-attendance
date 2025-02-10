import { ref } from "vue";
import { firestoreDoc } from "@/composables/initializeFirebase";
import { setLoadingState } from "@/composables/loadingState";
import router from "@/router";
import { sendRequest } from "./requestHelper";
import { setErrorMessage, setErrorState } from "./errorState";

export const user = ref({ username: "", password: "" });
export const logon = ref(false);
// const logonUser = ref({ username: '', session: '' });

export function checkLogin() {
  var token = localStorage.getItem("token");
  if (token == null) {
    router.push("/login");
  }
}

export function clear() {
  user.value.username = "";
  user.value.password = "";
}

export async function login() {
  setLoadingState(true);

  var users = await sendRequest("login", user.value);
  if (!users.status) {
    setErrorState(true);
    setErrorMessage(users.message);
    setLoadingState(false);
    return;
  }

  localStorage.setItem("token", users.data);

  setErrorState(false);
  setLoadingState(false);
  router.push("/");
}
