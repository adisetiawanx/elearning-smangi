<template>
  <NuxtLayout name="teacher-dashboard">
    <template #header
      ><span>
        <ArrowLeftIcon
          @click="navigateTo('/teacher/kelas')"
          class="w-5 text-gray-500 cursor-pointer"
        />
      </span>
      Detail Mata Pelajaran</template
    >
    <template #content>
      <TeacherAddMaterialModal
        v-if="isOpenAddMaterialModal"
        :subject-id="subjectData.id"
        :class-id="subjectData.Class?.id"
        :fetch-data-kelas="fetchSubjectData"
        :is-open="isOpenAddMaterialModal"
        @close="closeAddMaterialModal"
      />
      <TeacherAddAssignmentModal
        v-if="isOpenAddAssignmentlModal"
        :subject-id="subjectData.id"
        :class-id="subjectData.Class?.id"
        :fetch-data-kelas="fetchSubjectData"
        :is-open="isOpenAddAssignmentlModal"
        @close="closeAddAssignmentModal"
      />
      <div class="mx-5 mt-5">
        <h2 v-if="subjectData.name" class="font-medium text-xl">
          {{ subjectData.name }}
        </h2>
        <p class="text-sm mt-1 text-gray-500">
          {{ subjectData.Class?.name }}
        </p>
      </div>

      <!-- Materi List -->
      <div class="mx-5 mt-5 border-t pt-2">
        <button
          @click="isOpenAddMaterialModal = true"
          class="inline-flex items-center font-medium bg-primary text-white gap-1.5 my-2 py-1.5 px-3 shadow rounded hover:bg-secondary"
        >
          <PlusCircleIcon class="w-5" />
          <span class="text-sm">Materi</span>
        </button>
        <div class="mb-2 flex gap-2 items-center">
          <h3 class="font-medium">List materi</h3>
        </div>
        <p
          v-if="subjectData.Material && subjectData.Material.length <= 0"
          class="text-sm text-gray-500"
        >
          Tidak ada materi...
        </p>
        <ul v-else role="list" class="border-x max-h-96 overflow-y-auto">
          <li
            v-for="(material, materialIndex) in subjectData.Material"
            :key="material.id"
            :class="[
              materialIndex + 1 == subjectData.Material.length
                ? 'border-b'
                : '',
              'border-t',
            ]"
          >
            <TeacherDeleteMaterialModal
              :id="material.id"
              :is-open="isOpenDeleteMaterialModal"
              :fetch-data-material="fetchSubjectData"
              @close="isOpenDeleteMaterialModal = false"
            />
            <div
              class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
            >
              <span class="flex-1 truncate font-medium">
                {{ material.title }}
              </span>
              <span class="flex-initial truncate text-gray-500 italic">
                {{
                  new Date(material.createdAt).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                }}
              </span>
              <div class="flex-1 flex justify-end gap-2">
                <NuxtLink :to="`/teacher/materi/${material.id}`">
                  <PencilIcon
                    class="w-6 bg-primary p-0.5 rounded shadow text-white cursor-pointer"
                  />
                </NuxtLink>
                <button @click="isOpenDeleteMaterialModal = true">
                  <TrashIcon
                    class="w-6 bg-red-500 p-0.5 rounded shadow text-white cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Tugas List -->
      <div class="mx-5 mt-5 border-t pt-2">
        <button
          @click="isOpenAddAssignmentlModal = true"
          class="inline-flex items-center font-medium bg-primary text-white gap-1.5 my-2 py-1.5 px-3 shadow rounded hover:bg-secondary"
        >
          <PlusCircleIcon class="w-5" />
          <span class="text-sm">Tugas</span>
        </button>
        <div class="mb-2 flex gap-2 items-center">
          <h3 class="font-medium">List tugas</h3>
        </div>
        <p
          v-if="subjectData.Assignment && subjectData.Assignment.length <= 0"
          class="text-sm text-gray-500"
        >
          Tidak ada tugas...
        </p>
        <ul v-else role="list" class="border-x max-h-96 overflow-y-auto">
          <li
            v-for="(assignment, assignmentIndex) in subjectData.Assignment"
            :key="assignment.id"
            :class="[
              assignmentIndex + 1 == subjectData.Assignment.length
                ? 'border-b'
                : '',
              'border-t',
            ]"
          >
            <TeacherDeleteAssignmentModal
              :id="assignment.id"
              :is-open="isOpenDeleteAssignmentModal"
              :fetch-data-assignment="fetchSubjectData"
              @close="isOpenDeleteAssignmentModal = false"
            />
            <div
              class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
            >
              <span class="flex-1 truncate font-medium">
                {{ assignment.title }}
              </span>
              <span class="flex-initial truncate text-gray-500 italic">
                {{
                  new Date(assignment.createdAt).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                }}
              </span>
              <div class="flex-1 flex justify-end gap-2">
                <NuxtLink :to="`/teacher/tugas/${assignment.id}`">
                  <PencilIcon
                    class="w-6 bg-primary p-0.5 rounded shadow text-white cursor-pointer"
                  />
                </NuxtLink>
                <button @click="isOpenDeleteAssignmentModal = true">
                  <TrashIcon
                    class="w-6 bg-red-500 p-0.5 rounded shadow text-white cursor-pointer"
                  />
                </button>
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
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/outline";
const { getSubjectByIdForTeacher } = useSubject();

const isOpenAddMaterialModal = ref(false);
const isOpenDeleteMaterialModal = ref(false);
const isOpenAddAssignmentlModal = ref(false);
const isOpenDeleteAssignmentModal = ref(false);
const subjectData = ref<any>({});

const route = useRoute();
const subjectId = route.params.id;

function closeAddMaterialModal() {
  isOpenAddMaterialModal.value = false;
}

function closeAddAssignmentModal() {
  isOpenAddAssignmentlModal.value = false;
}

const fetchSubjectData = async () => {
  subjectData.value = await getSubjectByIdForTeacher(subjectId);
};

definePageMeta({
  middleware: "is-teacher",
});

onMounted(async () => {
  await fetchSubjectData();
});
</script>
