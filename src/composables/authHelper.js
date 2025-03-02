import { ref } from "vue";
import { setLoadingState } from "@/composables/loadingState";
import router from "@/router";
import { sendRequest } from "./requestHelper";
import { setErrorMessage, setErrorState } from "./errorState";

export const role = ref("");
export const loginForm = ref({ username: "", password: "" });

export function clear() {
  loginForm.value.username = "";
  loginForm.value.password = "";
}

function validate() {
  if (loginForm.value.username == "" || loginForm.value.password == "") {
    setErrorState(true);
    setErrorMessage("username or password cannot be blank");
    return false;
  }

  return true;
}

export async function login() {
  if (!validate()) {
    return;
  }

  setLoadingState(true);

  var user = await sendRequest("login", loginForm.value);
  if (!user.status) {
    setErrorState(true);
    setErrorMessage(user.message);
    setLoadingState(false);
    return;
  }

  role.value = user.data.role;
  localStorage.setItem("user", user.data.token);
  clear();

  setErrorState(false);
  setLoadingState(false);
  router.push("/");
}
