<template>
  <NuxtLayout name="teacher-dashboard">
    <template #header
      ><span>
        <ArrowLeftIcon
          @click="router.go(-1)"
          class="w-5 text-gray-500 cursor-pointer"
        />
      </span>
      Detail Tugas</template
    >
    <template #content>
      <form @submit.prevent="updateAssignment" class="mt-5 mx-5">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
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
            type="text"
            id="description"
            v-model="assignment.content"
            class="min-h-[250px] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="deadline" class="block text-sm font-medium text-gray-700"
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
          <label for="files" class="block text-sm font-medium text-gray-700"
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
              v-for="file in assignment.MediaFile"
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
          <UISpinner v-if="updateAssignmentStatus.isLoading" />
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
      <!-- Submitted Assignment -->
      <div class="mx-5 my-5 border-t pt-2">
        <div class="my-2">
          <h3 class="font-medium">List tugas yang dikumpulkan siswa</h3>
        </div>
        <p
          v-if="
            assignment.StudentAssigment &&
            assignment.StudentAssigment?.length <= 0
          "
          class="text-sm text-gray-500"
        >
          Tidak ada tugas...
        </p>
        <ul v-else role="list" class="border-x max-h-96 overflow-y-auto">
          <li
            v-for="(
              submmitedAssignment, submmitedAssignmentIndex
            ) in assignment.StudentAssigment"
            :key="assignment.id"
            :class="[
              submmitedAssignmentIndex + 1 ==
              assignment.StudentAssigment?.length
                ? 'border-b'
                : '',
              'border-t',
            ]"
          >
            <div
              class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
            >
              <span class="flex-1 truncate font-medium">
                {{ submmitedAssignment.Student.name }}
              </span>
              <span class="flex-1 truncate text-gray-500">
                {{ submmitedAssignment.grade || "Belum dinilai" }}
              </span>
              <span class="flex-initial truncate text-gray-500 italic">
                {{
                  new Date(submmitedAssignment.createdAt).toLocaleString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                }}
              </span>
              <div class="flex-1 flex justify-end gap-2">
                <NuxtLink :to="`/teacher/submitted/${submmitedAssignment.id}`">
                  <PencilIcon
                    class="w-6 bg-primary p-0.5 rounded shadow text-white cursor-pointer"
                  />
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const route = useRoute();
const assignmentId = route.params.id;

const { getAssignmentByIdForTeacher } = useAssignment();
const isOpenDeleteFileModal = ref(false);

const closeDeleteFileModal = () => {
  isOpenDeleteFileModal.value = false;
};

const assignment = ref<any>({});
const updateAssignmentStatus = ref({
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
    assignment.value.MediaFile.push(...respone.value.data);
  }

  isUploadFiles.value = false;
};

const updateAssignment = async () => {
  updateAssignmentStatus.value.isLoading = true;
  if (!assignment.value.title || !assignment.value.content) {
    alert("Judul dan Deskripsi tidak boleh kosong");
    return;
  }

  const { data: respone, error } = await useFetch(
    `/api/teacher/assignment/${assignmentId}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + useCookie("auth:token").value,
      },
      body: {
        title: assignment.value.title,
        content: assignment.value.content,
        deadline: assignment.value.deadline,
        class_id: assignment.value.class_id,
        subject_id: assignment.value.subject_id,
        files: assignment.value.MediaFile,
      },
    }
  );

  if (error.value) {
    alert(error.value);
    return;
  }

  if (respone.value) {
    alert("Tugas berhasil diupdate");
    assignment.value = respone.value.data;
    assignment.value.deadline = new Date(assignment.value.deadline)
      .toISOString()
      .split("T")[0];
  }
  updateAssignmentStatus.value.isLoading = false;
};
const fetchMaterialData = async () => {
  assignment.value = await getAssignmentByIdForTeacher(assignmentId);
  assignment.value.deadline = new Date(assignment.value.deadline)
    .toISOString()
    .split("T")[0];
};

onMounted(async () => {
  await fetchMaterialData();
});

definePageMeta({
  middleware: "is-teacher",
});

useHead({
  title: "Detail Tugas",
});
</script>
