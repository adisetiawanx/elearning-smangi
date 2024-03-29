<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>List Siswa</template>
    <template #content>
      <AdministratorAddStudentModal
        v-if="isOpen"
        :is-open="isOpen"
        :fetch-students-data="fetchStudentsData"
        @close="closeAddModal"
      />

      <button
        @click="isOpen = true"
        class="inline-flex items-center font-medium bg-primary text-white gap-1.5 mx-7 mt-5 py-1.5 px-4 shadow rounded hover:bg-secondary"
      >
        <PlusCircleIcon class="w-5" />
        <span>Siswa</span>
      </button>
      <div class="mb-3 mt-3 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="rounded shadow-sm">
          <input
            @input="searchStudentsData"
            v-model="queryStudent.search"
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari siswa..."
          />
        </div>
      </div>

      <!-- Siswa list -->
      <ul v-if="studentArr.length > 0" role="list" class="mx-7 border-x">
        <li
          v-for="(student, studentIndex) in studentArr"
          :key="student.id"
          :class="[
            studentIndex + 1 == studentArr.length ? 'border-b' : '',
            'border-t',
          ]"
        >
          <AdministratorDeleteStudentModal
            :id="student.id"
            :isOpen="isOpenDeleteModal"
            :fetch-data-student="fetchStudentsData"
            @close="closeDeleteModal"
          />
          <div
            class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm text-center"
          >
            <span class="flex-1 truncate font-medium text-left">
              {{ student.name }}
            </span>
            <span class="flex-1 truncate hidden lg:block">
              {{ student.email }}
            </span>
            <span class="flex-1 truncate">{{ student.Class.name }}</span>
            <div class="flex-1 flex justify-end gap-2">
              <NuxtLink :to="`/administrator/siswa/${student.id}`">
                <Cog8ToothIcon
                  class="w-6 bg-primary p-0.5 rounded shadow text-white cursor-pointer"
                />
              </NuxtLink>
              <button @click="isOpenDeleteModal = true">
                <TrashIcon
                  class="w-6 bg-red-500 p-0.5 rounded shadow text-white cursor-pointer"
                />
              </button>
            </div>
          </div>
        </li>
      </ul>
      <UISpinner v-else-if="fetchStudentDataStatus.isLoading" />
      <p v-else class="mx-7 text-gray-500 text-sm">
        Tidak ada siswa yang tersedia.
      </p>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-5 mx-7">
        <div>
          <button
            :disabled="queryStudent.skip === 0"
            @click="
              queryStudent.skip -= queryStudent.take;
              fetchStudentsData();
            "
            class="inline-flex items-center font-medium border text-gray-500 text-sm gap-1.5 py-1 px-2.5 shadow rounded hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon class="w-5" />
            <span>Previous</span>
          </button>
        </div>
        <span class="mr-2 font-medium text-sm text-gray-500"
          >Page
          {{ Math.floor(queryStudent.skip / queryStudent.take) + 1 }}</span
        >
        <div>
          <button
            :disabled="studentArr.length < queryStudent.take"
            @click="
              queryStudent.skip += queryStudent.take;
              fetchStudentsData();
            "
            class="inline-flex items-center font-medium border text-gray-500 text-sm gap-1.5 py-1 px-2.5 shadow rounded hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ArrowRightIcon class="w-5" />
          </button>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// @ts-ignore
import { debounce } from "lodash";
import {
  Cog8ToothIcon,
  TrashIcon,
  PlusCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";

const isOpen = ref(false);
const isOpenDeleteModal = ref(false);

const fetchStudentDataStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});

const { getStudentsData } = useStudent();

function closeAddModal() {
  isOpen.value = false;
}

function closeDeleteModal() {
  isOpenDeleteModal.value = false;
}

const studentArr = ref<any>([]);

const route = useRoute();
const page = route.query.page ? Number(route.query.page) : 1;

const queryStudent = ref({
  take: 20,
  skip: (page - 1) * 20,
  search: "",
});

const fetchStudentsData = async () => {
  studentArr.value = await getStudentsData({
    take: queryStudent.value.take,
    skip: queryStudent.value.skip,
    search: queryStudent.value.search,
  });
};

const searchStudentsData = debounce(async () => {
  fetchStudentDataStatus.value.isLoading = true;
  queryStudent.value.skip = 0;
  await fetchStudentsData();
  fetchStudentDataStatus.value.isLoading = false;
}, 500);

onMounted(async () => {
  fetchStudentDataStatus.value.isLoading = true;
  await fetchStudentsData();
  fetchStudentDataStatus.value.isLoading = false;
});

definePageMeta({
  middleware: "is-administrator",
});

useHead({
  title: "Siswa",
});
</script>
