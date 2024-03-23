<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>List Guru</template>
    <template #content>
      <AddTeacherModal
        :fetch-teachers-data="fetchTeachersData"
        :is-open="isOpen"
        @close="closeAddModal"
      />
      <button
        @click="isOpen = true"
        class="inline-flex items-center font-medium bg-green-500 text-white gap-1.5 mx-7 mt-5 py-1.5 px-4 shadow rounded hover:bg-green-600"
      >
        <PlusCircleIcon class="w-5" />
        <span>Guru</span>
      </button>
      <div class="mb-3 mt-5 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="relative rounded shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari nama siswa"
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
          <div
            class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
          >
            <span class="flex-1 truncate font-medium">
              {{ teacher.name }}
            </span>
            <span class="flex-initial truncate tracking-wide">{{
              teacher.nuptk
            }}</span>
            <NuxtLink
              :to="`/administrator/guru/${teacher.id}`"
              class="flex-1 flex justify-end"
            >
              <Cog8ToothIcon
                class="w-6 bg-green-500 p-0.5 rounded shadow text-white cursor-pointer"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>
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
import {
  Cog8ToothIcon,
  PlusCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";

const isOpen = ref(false);
const { getTeachersData } = useTeacher();

const closeAddModal = () => {
  isOpen.value = false;
};

const route = useRoute();
const page = route.query.page ? Number(route.query.page) : 1;

const teachersArr = ref<any>([]);

const queryTeacher = ref({
  take: 20,
  skip: (page - 1) * 20,
});

const fetchTeachersData = async () => {
  teachersArr.value = await getTeachersData({
    take: queryTeacher.value.take,
    skip: queryTeacher.value.skip,
  });
};

onMounted(async () => {
  await fetchTeachersData();
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
