<template>
  <HeadlessTransitionRoot
    :show="props.isOpen"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <HeadlessDialog
      :open="props.isOpen"
      @close="closeModal"
      class="relative z-50"
    >
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <HeadlessDialogPanel class="w-full max-w-4xl rounded bg-white p-5">
            <HeadlessDialogTitle class="border-b pb-3 font-medium text-lg"
              >Kumpulkan Tugas</HeadlessDialogTitle
            >

            <form @submit.prevent="submitAssingmentHandler" class="mt-3">
              <div class="mb-4">
                <label
                  for="deskripsi"
                  class="block text-sm font-medium text-gray-700"
                  >Deskripsi</label
                >
                <textarea
                  v-model="submitAssignment.description"
                  spellcheck="false"
                  auto
                  type="text"
                  id="deskripsi"
                  class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md min-h-[100px]"
                />
              </div>

              <div class="mb-4">
                <label
                  for="files"
                  class="block text-sm font-medium text-gray-700"
                  >Files</label
                >
                <UISpinner v-if="isUploadFiles" class="mt-1" />
                <input
                  v-else
                  @change="uploadFiles"
                  type="file"
                  id="name"
                  class="mt-1 text-sm"
                />
                <div v-if="!isUploadFiles" class="mt-3 space-y-1.5">
                  <div
                    v-for="file in submitAssignment.files"
                    :key="file.url"
                    class="border p-2 rounded-md flex items-center gap-2"
                  >
                    <DocumentTextIcon class="w-8 text-gray-500" />
                    <a
                      :href="file.url"
                      target="_blank"
                      class="text-sm text-blue-500 hover:underline"
                      >{{ file.name }}</a
                    >
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label
                  for="files"
                  class="block text-sm font-medium text-gray-700"
                  >Foto wajah untuk bukti</label
                >
                <div v-if="submitAssignment.proof_image">
                  <NuxtImg
                    :src="submitAssignment.proof_image"
                    width="full"
                    layout="fixed"
                    class="rounded shadow-sm"
                  />

                  <button
                    class="mt-3 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded shadow text-white bg-primary hover:bg-secondary disabled:cursor-not-allowed"
                    @click="submitAssignment.proof_image = ''"
                  >
                    Ambil Ulang
                  </button>
                </div>

                <div v-else class="mt-2">
                  <vue-camera ref="camera" />
                  <UISpinner v-if="isUploadProofImage" class="mt-3" />
                  <button
                    v-else
                    class="mt-3 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded shadow text-white bg-primary hover:bg-secondary disabled:cursor-not-allowed"
                    @click="takePicture"
                  >
                    Ambil Gambar
                  </button>
                </div>
              </div>

              <div class="flex justify-end gap-3 mt-5 border-t pt-3">
                <button
                  @click="closeModal"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Batal
                </button>
                <button
                  :disabled="isUploadFiles || isUploadProofImage"
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </form>
          </HeadlessDialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script lang="ts" setup>
import { DocumentTextIcon } from "@heroicons/vue/24/outline";
import Camera from "simple-vue-camera";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  isOpen: Boolean,
  fetchDataAssingment: {
    type: Function as PropType<() => Promise<void>>,
    required: true,
  },
});

const camera = ref<InstanceType<typeof Camera>>();

const submitAssignment = ref({
  description: "",
  proof_image: "",
  files: [] as any[],
});

const isUploadFiles = ref(false);
const isUploadProofImage = ref(false);

const uploadFiles = async () => {
  isUploadFiles.value = true;
  const formData = new FormData();

  // @ts-expect-error
  Array.from(event.target.files).forEach((file) => {
    // @ts-expect-error
    formData.append("files", file);
  });

  const { data: respone, error } = await useFetch("/api/files", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + useCookie("auth:token").value,
    },
    body: formData,
  });

  if (error.value) {
    console.error(error.value);
    return;
  }

  if (respone.value) {
    //@ts-expect-error
    submitAssignment.value.files = respone.value.data;
  }

  isUploadFiles.value = false;
};

const takePicture = async () => {
  isUploadProofImage.value = true;
  const blob: any = await camera.value?.snapshot();

  const formData = new FormData();
  formData.append("file", blob);

  const { data: respone, error } = await useFetch("/api/image", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + useCookie("auth:token").value,
    },
    body: formData,
  });

  if (error.value) {
    alert(error.value);
    isUploadProofImage.value = false;
    return;
  }

  if (respone.value) {
    // @ts-expect-error
    submitAssignment.value.proof_image = respone.value.data?.url;
    isUploadProofImage.value = false;
  }
};

const submitAssingmentHandler = async () => {
  if (!submitAssignment.value.proof_image) {
    alert("Foto wajah untuk bukti tidak boleh kosong");
    return;
  }

  const { data: respone, error } = await useFetch(
    `/api/student/submit-assignment/${props.id}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + useCookie("auth:token").value,
      },
      body: {
        description: submitAssignment.value.description,
        proof_image: submitAssignment.value.proof_image,
        files: submitAssignment.value.files,
      },
    }
  );

  if (error.value) {
    alert(error.value);
    return;
  }

  if (respone.value) {
    alert("Tugas berhasil dikumpulkan");
    props.fetchDataAssingment();
  }

  closeModal();
};
const closeModal = () => {
  emit("close");
};

const emit = defineEmits(["close"]);
</script>
