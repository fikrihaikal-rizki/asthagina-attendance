import axios from "axios";

const baseUrl = import.meta.env.VITE_WEB_SERVICE;

function getUrlRequest(url) {
  return baseUrl + url;
}

export async function sendRequest(url, body) {
  var result = null;

  if (url != "login") {
    var token = localStorage.getItem("token");
    axios.defaults.headers.common = { Authorization: "Bearer " + token };
  }

  await axios
    .post(getUrlRequest(url), body)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      result = err.response.data;
    });

  return result;
}
