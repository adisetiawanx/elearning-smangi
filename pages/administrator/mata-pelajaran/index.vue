<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>List Mata Pelajaran</template>
    <template #content>
      <AddSubjectModal
        :fetch-data-subjects="fetchSubjectList"
        :is-open="isOpen"
        @close="closeAddModal"
      />
      <button
        @click="isOpen = true"
        class="inline-flex items-center font-medium bg-primary text-white gap-1.5 mx-7 mt-5 py-1.5 px-4 shadow rounded hover:bg-secondary"
      >
        <PlusCircleIcon class="w-5" />
        <span>Mata Pelajaran</span>
      </button>
      <div class="mb-3 mt-3 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="rounded shadow-sm">
          <input
            @input="searchSubjectData"
            v-model="querySubject.search"
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari mata pelajaran..."
          />
        </div>
      </div>

      <ul v-if="subjectArr.length > 0" role="list" class="mx-7 border-x">
        <li
          v-for="(subject, subjectIndex) in subjectArr"
          :key="subjectIndex"
          :class="[
            subjectIndex + 1 == subjectArr.length ? 'border-b' : '',
            'border-t',
          ]"
        >
          <DeleteSubjectModal
            :id="subject.id"
            :is-open="isOpenDeleteModal"
            :fetch-data-subject="fetchSubjectList"
            @close="isOpenDeleteModal = false"
          />
          <div
            class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm text-center"
          >
            <span class="flex-1 truncate font-medium text-left">
              {{ subject.name }}
            </span>

            <span lass="flex-1 truncate">
              {{ subject.Class?.name || "" }}
            </span>

            <span class="flex-1 truncate">
              {{ subject.Teacher?.name || "" }}
            </span>

            <div class="flex-1 flex justify-end gap-2">
              <NuxtLink :to="`/administrator/mata-pelajaran/${subject.id}`">
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
      <Spinner v-else-if="fetchSubjectDataStatus.isLoading" />
      <p v-else class="mx-7 text-gray-500 text-sm">
        Tidak ada mata pelajaran yang tersedia.
      </p>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-5 mx-7">
        <div>
          <button
            :disabled="querySubject.skip === 0"
            @click="
              querySubject.skip -= querySubject.take;
              fetchSubjectList();
            "
            class="inline-flex items-center font-medium border text-gray-500 text-sm gap-1.5 py-1 px-2.5 shadow rounded hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon class="w-5" />
            <span>Previous</span>
          </button>
        </div>
        <span class="mr-2 font-medium text-sm text-gray-500"
          >Page
          {{ Math.floor(querySubject.skip / querySubject.take) + 1 }}</span
        >
        <div>
          <button
            :disabled="subjectArr.length < querySubject.take"
            @click="
              querySubject.skip += querySubject.take;
              fetchSubjectList();
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
  PlusCircleIcon,
  TrashIcon,
  Cog8ToothIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const page = route.query.page ? Number(route.query.page) : 1;

const { getListSubjects } = useSubject();

const isOpen = ref(false);
const isOpenDeleteModal = ref(false);

const fetchSubjectDataStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});

function closeAddModal() {
  isOpen.value = false;
}

const subjectArr = ref<any>([]);

const querySubject = ref({
  take: 20,
  skip: (page - 1) * 20,
  search: "",
});

const fetchSubjectList = async () => {
  const subjects = await getListSubjects({
    take: querySubject.value.take,
    skip: querySubject.value.skip,
    search: querySubject.value.search,
  });
  subjectArr.value = subjects;
};

const searchSubjectData = debounce(async () => {
  fetchSubjectDataStatus.value.isLoading = true;
  querySubject.value.skip = 0;
  await fetchSubjectList();
  fetchSubjectDataStatus.value.isLoading = false;
}, 500);

onMounted(async () => {
  fetchSubjectDataStatus.value.isLoading = true;
  await fetchSubjectList();
  fetchSubjectDataStatus.value.isLoading = false;
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
