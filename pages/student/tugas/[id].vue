<template>
  <NuxtLayout name="student-dashboard">
    <template #header
      ><span>
        <ArrowLeftIcon
          @click="navigateTo('/student/mata-pelajaran')"
          class="w-5 text-gray-500 cursor-pointer"
        />
      </span>
      Detail Tugas</template
    >
    <template #content>
      <StudentSubmitAssignmentModal
        v-if="isOpenModalSubmit"
        :id="assignmentId"
        :is-open="isOpenModalSubmit"
        :fetch-data-assingment="fetchAssignmentDataFull"
        @close="
          isOpenModalSubmit = false;
          isOpenModalDelete = false;
        "
      />
      <div class="my-5 mx-5">
        <div class="mb-4">
          <p class="block text-2xl font-medium text-gray-700">
            {{ assignment.title }}
          </p>
        </div>
        <div class="mb-4 border-y py-4">
          <p
            v-html="assignment.content"
            class="block text-base text-gray-600 text-justify"
          ></p>
        </div>
        <div class="mb-4 border p-2 rounded-md w-fit border-primary shadow-sm">
          <p class="text-base text-gray-700 inline-flex gap-2 items-center">
            <CalendarDaysIcon class="w-5 text-primary" />
            Deadline:
            <span class="font-medium">{{
              new Date(assignment.deadline).toLocaleString("id", {
                hour: "numeric",
                minute: "numeric",
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }}</span>
          </p>
        </div>
        <div class="mb-4">
          <p class="block text-sm font-medium text-gray-700">Files</p>
          <div v-if="assignment.MediaFile?.length > 0" class="mt-2 space-y-1.5">
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

        <div class="mt-5 border-t pt-3">
          <button
            :disabled="
              new Date(assignment.deadline) < new Date() ||
              submittedAssignment?.length > 0
            "
            @click="isOpenModalSubmit = true"
            type="button"
            class="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded shadow text-white bg-primary hover:bg-secondary disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            Kumpulkan
          </button>
        </div>
        <div class="mt-3">
          <div
            v-if="submittedAssignment && submittedAssignment.length > 0"
            class="mt-2 space-y-1.5"
          >
            <div
              v-for="assignment in submittedAssignment"
              :key="assignment.id"
              class="border py-2 px-3.5 rounded-md flex items-center justify-between gap-2"
            >
              <StudentDeleteAssignmentModal
                v-if="isOpenModalDelete"
                :id="assignment.id"
                :is-open="isOpenModalDelete"
                :fetch-data-assignment="fetchAssignmentDataFull"
                @close="closeDeleteModal"
              />
              <div class="flex items-center gap-2">
                <DocumentTextIcon class="w-5 text-gray-500" />
                <p
                  class="inline-flex items-center gap-3 text-gray-500 italic text-sm"
                >
                  Dikumpulkan pada
                  {{
                    new Date(assignment.createdAt).toLocaleString("id", {
                      hour: "numeric",
                      minute: "numeric",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }}
                  <span class="font-medium" v-if="!assignment.grade"
                    >Belum dinilai</span
                  >
                  <span class="font-medium" v-else
                    >Mendapatkan nilai {{ assignment.grade }}</span
                  >
                  <button
                    v-if="!assignment.grade"
                    @click="isOpenModalDelete = true"
                  >
                    <TrashIcon
                      class="w-5 bg-red-500 p-0.5 rounded shadow text-white cursor-pointer"
                    />
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const assignmentId = route.params.id as string;

const { getAssignmentByIdForStudent, getSubmittedAssignmentForStudent } =
  useAssignment();

const assignment = ref<any>({});
const submittedAssignment = ref<any>();
const isOpenModalSubmit = ref(false);
const isOpenModalDelete = ref(false);

const closeDeleteModal = () => {
  isOpenModalDelete.value = false;
};

const fetchAssignmentData = async () => {
  assignment.value = await getAssignmentByIdForStudent(assignmentId);
  assignment.value.content = assignment.value.content.replace(
    /(?:\r\n|\r|\n)/g,
    "<br>"
  );
};

const fetchSubmittedAssignment = async () => {
  submittedAssignment.value = await getSubmittedAssignmentForStudent(
    assignmentId
  );
};

const fetchAssignmentDataFull = async () => {
  await fetchAssignmentData();
  await fetchSubmittedAssignment();
};

onMounted(async () => {
  await fetchAssignmentData();
  await fetchSubmittedAssignment();
});

definePageMeta({
  middleware: "is-student",
});
</script>
