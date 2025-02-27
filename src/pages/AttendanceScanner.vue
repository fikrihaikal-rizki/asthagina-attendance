<script setup>
import { ref, computed } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Label from "@/components/ui/label/Label.vue";
import { sendRequest } from "@/composables/requestHelper";
import { setErrorMessage, setErrorState } from "@/composables/errorState";
import ScanResultPage from "./ScanResultPage.vue";
import { setSuccessMessage, setSuccessState } from "@/composables/successState";
// /*** select camera ***/
const selectedConstraints = ref({ facingMode: "environment" });
const defaultConstraintOptions = [
  { label: "rear camera", constraints: { facingMode: "environment" } },
  { label: "front camera", constraints: { facingMode: "user" } },
];
const constraintOptions = ref(defaultConstraintOptions);

const result = ref("");
const lastResult = ref("");
const attendance = ref({
  "Nama Lengkap": "",
  "Nomor telepon": "",
  Email: "",
  "Alamat Kos": "",
});

async function onDetect(detectedCodes) {
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));

  result.value = JSON.parse(result.value);

  if (result.value.length > 1) {
    return;
  }

  result.value = result.value[0];
  var checkAttendance = await sendRequest("attendances/take", {
    qrId: result.value,
  });

  if (!checkAttendance.status) {
    setErrorState(true);
    setErrorMessage(checkAttendance.message);
    return;
  }

  if (result.value != lastResult.value) {
    attendance.value = checkAttendance.data;
    lastResult.value = result.value;
  }

  if (result.value == lastResult.value) {
    setSuccessState(true);
    setSuccessMessage("Peserta sebelumnya sudah di absen");
    return;
  }

  setSuccessState(true);
  setSuccessMessage("Peserta berhasil absen");
}

async function onCameraReady() {
  // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
  // camera access permission. `QrcodeStream` internally takes care of
  // requesting the permissions. The `camera-on` event should guarantee that this
  // has happened.
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(({ kind }) => kind === "videoinput");

  constraintOptions.value = [
    ...defaultConstraintOptions,
    ...videoDevices.map(({ deviceId, label }) => ({
      label: `${label} (ID: ${deviceId})`,
      constraints: { deviceId },
    })),
  ];

  error.value = "";
}

/*** track functons ***/

function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
}
function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#007bff";
    ctx.strokeRect(x, y, width, height);
  }
}
function paintCenterText(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode;

    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width);

    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#35495e";
    ctx.strokeText(detectedCode.rawValue, centerX, centerY);

    ctx.fillStyle = "#5cb984";
    ctx.fillText(rawValue, centerX, centerY);
  }
}
const trackFunctionOptions = [
  { text: "nothing (default)", value: undefined },
  { text: "outline", value: paintOutline },
  { text: "centered text", value: paintCenterText },
  { text: "bounding box", value: paintBoundingBox },
];
const trackFunctionSelected = ref(trackFunctionOptions[1]);

/*** barcode formats ***/

const barcodeFormats = ref({
  aztec: false,
  code_128: false,
  code_39: false,
  code_93: false,
  codabar: false,
  databar: false,
  databar_expanded: false,
  data_matrix: false,
  dx_film_edge: false,
  ean_13: false,
  ean_8: false,
  itf: false,
  maxi_code: false,
  micro_qr_code: false,
  pdf417: false,
  qr_code: true,
  rm_qr_code: false,
  upc_a: false,
  upc_e: false,
  linear_codes: false,
  matrix_codes: false,
});
const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter(
    (format) => barcodeFormats.value[format]
  );
});

/*** error handling ***/

const error = ref("");

function onError(err) {
  error.value = `[${err.name}]: `;

  if (err.name === "NotAllowedError") {
    error.value += "you need to grant camera access permission";
  } else if (err.name === "NotFoundError") {
    error.value += "no camera on this device";
  } else if (err.name === "NotSupportedError") {
    error.value += "secure context required (HTTPS, localhost)";
  } else if (err.name === "NotReadableError") {
    error.value += "is the camera already in use?";
  } else if (err.name === "OverconstrainedError") {
    error.value += "installed cameras are not suitable";
  } else if (err.name === "StreamApiNotSupportedError") {
    error.value += "Stream API is not supported in this browser";
  } else if (err.name === "InsecureContextError") {
    error.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
  } else {
    error.value += err.message;
  }
}
</script>

<template>
  <div class="flex items-center justify-center p-5">
    <div class="w-[350px]">
      <div class="w-full p-3">
        <Label for="cameraSelect">Select Camera :</Label>
        <Select name="cameraSelect" v-model="selectedConstraints">
          <SelectTrigger>
            <SelectValue placeholder="Select a Camera" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in constraintOptions"
              :key="option.label"
              :value="option.constraints"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="w-full p-3">
        <qrcode-stream
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
        />
      </div>
      <div class="mt-3">
        Hasil Scan :
        <ScanResultPage :attendance="attendance"></ScanResultPage>
      </div>
    </div>
  </div>
</template>
