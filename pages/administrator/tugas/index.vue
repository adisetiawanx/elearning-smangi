<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>List Tugas</template>
    <template #content>
      <div class="mb-3 mt-3 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="rounded shadow-sm">
          <input
            @input="searchMaterialData"
            v-model="queryAssignment.search"
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari nama tugas"
          />
        </div>
      </div>

      <ul v-if="assignmentArr.length > 0" role="list" class="mx-7 border-x">
        <li
          v-for="(assignment, assignmentIndex) in assignmentArr"
          :key="assignmentIndex"
          :class="[
            assignmentIndex + 1 == assignmentArr.length ? 'border-b' : '',
            'border-t',
          ]"
        >
          <div
            class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
          >
            <span class="flex-1 truncate font-medium">
              {{ assignment.title }}
            </span>
            <span class="flex-1 truncate text-center">
              {{ assignment.Teacher.name }}
            </span>
            <span class="flex-1 truncate text-right">
              {{ assignment.Class.name }}
            </span>
          </div>
        </li>
      </ul>
      <p v-else class="mx-7 text-gray-500 text-sm">
        Tidak ada tugas yang tersedia.
      </p>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-5 mx-7">
        <div>
          <button
            :disabled="queryAssignment.skip === 0"
            @click="
              queryAssignment.skip -= queryAssignment.take;
              fetchAssignmentData();
            "
            class="inline-flex items-center font-medium border text-gray-500 text-sm gap-1.5 py-1 px-2.5 shadow rounded hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon class="w-5" />
            <span>Previous</span>
          </button>
        </div>
        <span class="mr-2 font-medium text-sm text-gray-500"
          >Page
          {{
            Math.floor(queryAssignment.skip / queryAssignment.take) + 1
          }}</span
        >
        <div>
          <button
            :disabled="assignmentArr.length < queryAssignment.take"
            @click="
              queryAssignment.skip += queryAssignment.take;
              fetchAssignmentData();
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
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";

const { getListAssignment } = useAssignment();

const route = useRoute();
const page = route.query.page ? Number(route.query.page) : 1;

const assignmentArr = ref<any>([]);

const fetchAssignmentDataStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});

const queryAssignment = ref({
  take: 20,
  skip: (page - 1) * 20,
  search: "",
});

const searchMaterialData = debounce(async () => {
  fetchAssignmentDataStatus.value.isLoading = true;
  queryAssignment.value.skip = 0;
  await fetchAssignmentData();
  fetchAssignmentDataStatus.value.isLoading = false;
}, 500);

const fetchAssignmentData = async () => {
  const assignments = await getListAssignment({
    take: queryAssignment.value.take,
    skip: queryAssignment.value.skip,
    search: queryAssignment.value.search,
  });
  assignmentArr.value = assignments;
};

onMounted(async () => {
  fetchAssignmentDataStatus.value.isLoading = true;
  await fetchAssignmentData();
  fetchAssignmentDataStatus.value.isLoading = false;
});

definePageMeta({
  middleware: "is-administrator",
});

useHead({
  title: "Tugas",
});
</script>
