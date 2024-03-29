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
      <form @submit.prevent="updateSubmittedAssignment" class="my-5 mx-5">
        <div v-if="assignment.description" class="mb-5">
          <p class="font-medium text-gray-700">Deskripsi</p>
          <p
            v-html="assignment.description"
            class="block text-base text-gray-600 text-justify mt-1"
          ></p>
        </div>
        <div v-if="assignment.proof_image" class="mb-5">
          <p class="font-medium text-gray-700">Bukti foto diri</p>
          <NuxtImg
            :src="assignment.proof_image"
            width="700"
            layout="fixed"
            class="rounded shadow-sm mt-1"
          />
        </div>
        <div class="mb-5">
          <p class="block font-medium text-gray-700">Files</p>
          <div
            v-if="assignment.MediaFile && assignment.MediaFile?.length > 0"
            class="mt-2 space-y-1.5"
          >
            <div
              v-for="file in assignment.MediaFile"
              :key="file.url"
              class="border py-2 px-3.5 rounded-md flex items-center justify-between gap-2"
            >
              <div class="flex items-center gap-2">
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
          <div v-else>
            <p class="text-xs mt-1 italic text-gray-500">Tidak ada file</p>
          </div>
        </div>
        <div class="mb-5">
          <p class="font-medium text-gray-700">Nilai</p>
          <input
            v-model="assignment.grade"
            type="number"
            class="border border-gray-300 rounded-md py-1 px-2 mt-1"
          />
        </div>
        <div class="flex justify-end gap-3 mt-5 border-t pt-3">
          <UISpinner v-if="updateAssignmentStatus.isLoading" />
          <button
            v-else
            :disabled="updateAssignmentStatus.isLoading"
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Simpan
          </button>
        </div>
      </form>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
const route = useRoute();
const assignmentId = route.params.id;

const { getSubmittedAssignmentByIdForTeacher } = useAssignment();

const assignment = ref<any>({});
const updateAssignmentStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});

const updateSubmittedAssignment = async () => {
  updateAssignmentStatus.value.isLoading = true;

  const { data: respone, error } = await useFetch(
    `/api/teacher/submit-assignment/${assignmentId}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + useCookie("auth:token").value,
      },
      body: {
        grade: assignment.value.grade,
      },
    }
  );

  if (error.value) {
    alert(error.value);
  }

  if (respone.value) {
    alert("Tugas siswa berhasil diupdate");
    assignment.value = respone.value.data;
  }
  updateAssignmentStatus.value.isLoading = false;
};
const fetchMaterialData = async () => {
  assignment.value = await getSubmittedAssignmentByIdForTeacher(assignmentId);
};

onMounted(async () => {
  await fetchMaterialData();
});

definePageMeta({
  middleware: "is-teacher",
});

useHead({
  title: "Detail Tugas Siswa",
});
</script>
