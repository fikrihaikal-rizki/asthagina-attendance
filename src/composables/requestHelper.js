import axios from "axios";
import { getToken } from "./authHelper";
import router from "@/router";
import { setErrorMessage, setErrorState } from "./errorState";

const baseUrl = import.meta.env.VITE_WEB_SERVICE;

function getUrlRequest(url) {
  return baseUrl + url;
}

export async function sendRequest(url, body) {
  var result = null;

  var token = null;
  if (url != "login") {
    token = getToken();
    axios.defaults.headers.common = { Authorization: "Bearer " + token };
  }

  await axios
    .post(getUrlRequest(url), body)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      if (err.response.status == 401 && token != null) {
        router.push("/login");
        setErrorState(true);
        setErrorMessage("Unautorized, Please Log In!");
      }

      result = err.response.data;
    });

  return result;
}
