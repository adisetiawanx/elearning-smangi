<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>List Guru</template>
    <template #content>
      <AddTeacherModal
        v-if="isOpen"
        :fetch-teachers-data="fetchTeachersData"
        :is-open="isOpen"
        @close="closeAddModal"
      />
      <button
        @click="isOpen = true"
        class="inline-flex items-center font-medium bg-primary text-white gap-1.5 mx-7 mt-5 py-1.5 px-4 shadow rounded hover:bg-secondary"
      >
        <PlusCircleIcon class="w-5" />
        <span>Guru</span>
      </button>
      <div class="mb-3 mt-3 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="relative rounded shadow-sm">
          <input
            @input="searchTeachersData"
            v-model="queryTeacher.search"
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari guru..."
          />
        </div>
      </div>

      <!-- Guru list -->
      <ul v-if="teachersArr.length > 0" role="list" class="mx-7 border-x">
        <li
          v-for="(teacher, teacherIndex) in teachersArr"
          :key="teacher.id"
          :class="[
            teacherIndex + 1 == teachersArr.length ? 'border-b' : '',
            'border-t',
          ]"
        >
          <DeleteTeacherModal
            :id="teacher.id"
            :is-open="isOpenDeleteModal"
            :fetch-data-teacher="fetchTeachersData"
            @close="closeDeleteModal"
          />
          <div
            class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm text-center"
          >
            <span class="flex-1 truncate font-medium text-left">
              {{ teacher.name }}
            </span>
            <span class="flex-1 truncate tracking-wide">{{
              teacher.email
            }}</span>
            <span class="flex-1 truncate tracking-wide">{{
              teacher.phone
            }}</span>
            <div class="flex-1 flex justify-end gap-2">
              <NuxtLink :to="`/administrator/guru/${teacher.id}`">
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
      <Spinner v-else-if="fetchTeacherDataStatus.isLoading" />
      <p v-else class="mx-7 text-gray-500 text-sm">
        Tidak ada guru yang tersedia.
      </p>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-5 mx-7">
        <div>
          <button
            :disabled="queryTeacher.skip === 0"
            @click="
              queryTeacher.skip -= queryTeacher.take;
              fetchTeachersData();
            "
            class="inline-flex items-center font-medium border text-gray-500 text-sm gap-1.5 py-1 px-2.5 shadow rounded hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon class="w-5" />
            <span>Previous</span>
          </button>
        </div>
        <span class="mr-2 font-medium text-sm text-gray-500"
          >Page
          {{ Math.floor(queryTeacher.skip / queryTeacher.take) + 1 }}</span
        >
        <div>
          <button
            :disabled="teachersArr.length < queryTeacher.take"
            @click="
              queryTeacher.skip += queryTeacher.take;
              fetchTeachersData();
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
  PlusCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

const { getTeachersData } = useTeacher();

const isOpen = ref(false);
const isOpenDeleteModal = ref(false);

const closeAddModal = () => {
  isOpen.value = false;
};

function closeDeleteModal() {
  isOpenDeleteModal.value = false;
}

const route = useRoute();
const page = route.query.page ? Number(route.query.page) : 1;

const teachersArr = ref<any>([]);
const fetchTeacherDataStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});

const queryTeacher = ref({
  take: 20,
  skip: (page - 1) * 20,
  search: "",
});

const fetchTeachersData = async () => {
  teachersArr.value = await getTeachersData({
    take: queryTeacher.value.take,
    skip: queryTeacher.value.skip,
    search: queryTeacher.value.search,
  });
};

const searchTeachersData = debounce(async () => {
  fetchTeacherDataStatus.value.isLoading = true;
  queryTeacher.value.skip = 0;
  await fetchTeachersData();
  fetchTeacherDataStatus.value.isLoading = false;
}, 500);

onMounted(async () => {
  fetchTeacherDataStatus.value.isLoading = true;
  await fetchTeachersData();
  fetchTeacherDataStatus.value.isLoading = false;
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
