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
          <HeadlessDialogPanel class="w-full max-w-5xl rounded bg-white p-5">
            <HeadlessDialogTitle class="border-b pb-3 font-medium text-lg"
              >Tambahkan Materi Baru</HeadlessDialogTitle
            >

            <form @submit.prevent="addMateri" class="mt-3">
              <div class="mb-4">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >Judul</label
                >
                <input
                  type="text"
                  id="name"
                  v-model="material.title"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div class="mb-4">
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700"
                  >Deskripsi</label
                >
                <textarea
                  type="text"
                  spellcheck="false"
                  id="description"
                  v-model="material.content"
                  class="min-h-[400px] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="mb-4">
                <label
                  for="files"
                  class="block text-sm font-medium text-gray-700"
                  >Files</label
                >
                <Spinner v-if="isUploadFiles" class="mt-1" />
                <input
                  v-else
                  @change="uploadFiles"
                  type="file"
                  id="name"
                  class="mt-1 text-sm"
                  multiple
                />
                <div v-if="!isUploadFiles" class="mt-3 space-y-1.5">
                  <div
                    v-for="file in material.files"
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
              <div class="flex justify-end gap-3 mt-5 border-t pt-3">
                <button
                  @click="closeModal"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Batal
                </button>
                <button
                  :disabled="isUploadFiles"
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
                >
                  Add Materi
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
const props = defineProps({
  isOpen: Boolean,
  classId: String,
  subjectId: String,
  fetchDataKelas: {
    type: Function as PropType<() => Promise<void>>,
    required: true,
  },
});

const material = ref({
  title: "",
  content: "",
  files: [] as any[],
});

const isUploadFiles = ref(false);

const closeModal = () => {
  emit("close");
};

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
    material.value.files.push(...respone.value.data);
  }

  isUploadFiles.value = false;
};

const addMateri = async () => {
  if (!material.value.title || !material.value.content) {
    alert("Judul dan Deskripsi tidak boleh kosong");
    return;
  }

  const { data: respone, error } = await useFetch("/api/teacher/material", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + useCookie("auth:token").value,
    },
    body: {
      title: material.value.title,
      content: material.value.content,
      class_id: props.classId,
      subject_id: props.subjectId,
      files: material.value.files,
    },
  });

  if (error.value) {
    alert(error.value);
    return;
  }

  if (respone.value) {
    alert("Materi berhasil ditambahkan");
    props.fetchDataKelas();
  }

  closeModal();
};

const emit = defineEmits(["close"]);
</script>
