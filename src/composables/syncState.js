import { ref } from "vue";
import { sendRequest } from "./requestHelper";
import initializeFirebase from "./initializeFirebase";
import { doc, getDoc } from "firebase/firestore";
import { isReady } from "./statusHelper";

const db = initializeFirebase();

const firstLoad = ref(true);
export const syncMasterStatus = ref({ status: false, syncedDate: "" });
export const syncAttendancesStatus = ref({ status: false, syncedDate: "" });

function syncUsers() {
  sendRequest("sync/users");
}

function syncProjects() {
  sendRequest("sync/projects");
}

function sendSyncAttendances() {
  sendRequest("sync/attendances");
}

function setStatusMaster(users = {}, projects = {}) {
  var status = [false, false];
  var syncedDate = ["Harap tunggu ...", "Harap tunggu ..."];

  if (users.status !== undefined) {
    status[0] = isReady(users.status);
  }

  if (users.syncedDate !== undefined) {
    syncedDate[0] = "Tersinkron " + users.syncedDate;
  }

  if (projects.status !== undefined) {
    status[1] = isReady(projects.status);
  }

  if (projects.syncedDate !== undefined) {
    syncedDate[1] = "Tersinkron " + projects.syncedDate;
  }

  syncMasterStatus.value.status = false;
  syncMasterStatus.value.syncedDate = "Harap tunggu ...";

  if (status[0] && status[1]) {
    syncMasterStatus.value.status = status[0];
    syncMasterStatus.value.syncedDate = syncedDate[1];
  }
}

function setStatusAttendances(attendances = {}) {
  var status = false;
  var syncedDate = "Harap tunggu ...";

  if (attendances.status !== undefined) {
    status = isReady(attendances.status);
  }

  if (attendances.syncedDate !== undefined) {
    if (status) {
      syncedDate = "Tersinkron " + attendances.syncedDate;
    }
  }

  syncAttendancesStatus.value.status = status;
  syncAttendancesStatus.value.syncedDate = syncedDate;
}

async function getSyncMaster() {
  var users = {};
  var projects = {};

  var docRef = doc(db, "Sync", "Users");
  var docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    var data = docSnap.data();
    users = data;
  }

  var docRef = doc(db, "Sync", "Projects");
  docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    var data = docSnap.data();
    projects = data;
  }

  setStatusMaster(users, projects);
}

async function getSyncAttendances() {
  try {
    const sync = await sendRequest("attendances/sync-status");

    if (sync.data !== undefined) {
      setStatusAttendances(sync.data);
    }
  } catch (error) {
    console.log(error);
    setStatusAttendances();
  }
}

export function loadSync() {
  if (!firstLoad.value) {
    return;
  }

  setStatusMaster();
  setStatusAttendances();

  setTimeout(() => {
    getSyncMaster();
    getSyncAttendances();

    firstLoad.value = false;
  }, 2000);
}

export async function syncMaster() {
  setStatusMaster();
  syncUsers();
  syncProjects();

  setTimeout(() => {
    getSyncMaster();
  }, 2000);
}

export async function syncAttendances() {
  setStatusAttendances();
  sendSyncAttendances();

  setTimeout(() => {
    getSyncAttendances();
  }, 5000);
}
