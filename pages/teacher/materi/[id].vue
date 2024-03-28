<template>
  <NuxtLayout name="teacher-dashboard">
    <template #header
      ><span>
        <ArrowLeftIcon
          @click="navigateTo('/teacher/kelas')"
          class="w-5 text-gray-500 cursor-pointer"
        />
      </span>
      Detail Materi</template
    >
    <template #content>
      <form @submit.prevent="updateMaterial" class="mt-5 mx-5">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
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
            id="description"
            v-model="material.content"
            class="min-h-[400px] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="files" class="block text-sm font-medium text-gray-700"
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
              v-for="file in material.MediaFile"
              :key="file.url"
              class="border py-2 px-3.5 rounded-md flex items-center justify-between gap-2"
            >
              <TeacherDeleteFileModal
                :id="file.id"
                :is-open="isOpenDeleteFileModal"
                :fetch-data-material="fetchMaterialData"
                @close="closeDeleteFileModal"
              />
              <div class="flex items-center gap-2">
                <DocumentTextIcon class="w-8 text-gray-500" />
                <a
                  :href="file.url"
                  target="_blank"
                  class="text-sm text-blue-500 hover:underline"
                  >{{ file.name }}</a
                >
              </div>
              <button type="button" @click="isOpenDeleteFileModal = true">
                <TrashIcon
                  class="w-6 bg-red-500 p-0.5 rounded shadow text-white cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-5 border-t pt-3">
          <Spinner v-if="updateMaterialStatus.isLoading" />
          <button
            v-else
            :disabled="isUploadFiles"
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>
      </form>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const materialId = route.params.id;

const { getMaterialByIdForTeacher } = useMaterial();
const isOpenDeleteFileModal = ref(false);

const closeDeleteFileModal = () => {
  isOpenDeleteFileModal.value = false;
};

const material = ref<any>({});
const updateMaterialStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});

const isUploadFiles = ref(false);

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
    material.value.MediaFile.push(...respone.value.data);
  }

  isUploadFiles.value = false;
};

const updateMaterial = async () => {
  updateMaterialStatus.value.isLoading = true;
  if (!material.value.title || !material.value.content) {
    alert("Judul dan Deskripsi tidak boleh kosong");
    return;
  }

  const { data: respone, error } = await useFetch(
    `/api/teacher/material/${materialId}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + useCookie("auth:token").value,
      },
      body: {
        title: material.value.title,
        content: material.value.content,
        class_id: material.value.class_id,
        subject_id: material.value.subject_id,
        files: material.value.MediaFile,
      },
    }
  );

  if (error.value) {
    alert(error.value);
    return;
  }

  if (respone.value) {
    alert("Materi berhasil diupdate");
    material.value = respone.value.data;
  }
  updateMaterialStatus.value.isLoading = false;
};
const fetchMaterialData = async () => {
  material.value = await getMaterialByIdForTeacher(materialId);
};

onMounted(async () => {
  await fetchMaterialData();
});

definePageMeta({
  middleware: "is-teacher",
});
</script>
