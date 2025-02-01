import { ref } from "vue";

const isLoading = ref(false);

function getLoadingState() {
    return isLoading.value;
}

function setLoadingState(param) {
    isLoading.value = param;
    return isLoading.value;
}

export { getLoadingState, setLoadingState };
