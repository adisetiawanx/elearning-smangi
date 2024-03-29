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
              >Tambahkan Tugas Baru</HeadlessDialogTitle
            >

            <form @submit.prevent="addTugas" class="mt-3">
              <div class="mb-4">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >Judul</label
                >
                <input
                  type="text"
                  id="name"
                  v-model="assignment.title"
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
                  spellcheck="false"
                  auto
                  type="text"
                  id="description"
                  v-model="assignment.content"
                  class="min-h-[400px] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div class="mb-4">
                <label
                  for="deadline"
                  class="block text-sm font-medium text-gray-700"
                  >Deadline</label
                >
                <input
                  type="date"
                  id="deadline"
                  v-model="assignment.deadline"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  multiple
                />
                <div v-if="!isUploadFiles" class="mt-3 space-y-1.5">
                  <div
                    v-for="file in assignment.files"
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
                  Add Tugas
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

const assignment = ref({
  title: "",
  content: "",
  deadline: "",
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
    assignment.value.files.push(...respone.value.data);
  }

  isUploadFiles.value = false;
};

const addTugas = async () => {
  if (
    !assignment.value.title ||
    !assignment.value.content ||
    !assignment.value.deadline
  ) {
    alert("Judul, Deskripsi dan Deadline tidak boleh kosong");
    return;
  }

  const { data: respone, error } = await useFetch("/api/teacher/assignment", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + useCookie("auth:token").value,
    },
    body: {
      title: assignment.value.title,
      content: assignment.value.content,
      deadline: assignment.value.deadline,
      class_id: props.classId,
      subject_id: props.subjectId,
      files: assignment.value.files,
    },
  });

  if (error.value) {
    alert(error.value);
    return;
  }

  if (respone.value) {
    alert("Tugas berhasil ditambahkan");
    props.fetchDataKelas();
  }

  closeModal();
};

const emit = defineEmits(["close"]);
</script>
