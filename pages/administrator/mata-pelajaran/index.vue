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
        class="inline-flex items-center font-medium bg-green-500 text-white gap-1.5 mx-7 mt-5 py-1.5 px-4 shadow rounded hover:bg-green-600"
      >
        <PlusCircleIcon class="w-5" />
        <span>Mata Pelajaran</span>
      </button>
      <div class="mb-3 mt-3 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="rounded shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari nama mata pelajaran..."
          />
        </div>
      </div>

      <ul role="list" class="mx-7 border-x">
        <li
          v-for="(subject, subjectIndex) in subjectArr"
          :key="subjectIndex"
          :class="[
            subjectIndex + 1 == subjectArr.length ? 'border-b' : '',
            'border-t',
          ]"
        >
          <div
            class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
          >
            <span class="flex-1 truncate font-medium">
              {{ subject.name }}
            </span>

            <div class="flex-1 flex justify-end">
              <NuxtLink
                :to="`/administrator/mata-pelajaran/${subject.id}`"
                class="flex-1 flex justify-end"
              >
                <Cog8ToothIcon
                  class="w-6 bg-green-500 p-0.5 rounded shadow text-white cursor-pointer"
                />
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { PlusCircleIcon, Cog8ToothIcon } from "@heroicons/vue/24/outline";

const isOpen = ref(false);
const { getListSubjects } = useSubject();

function closeAddModal() {
  isOpen.value = false;
}

const subjectArr = ref<any>([]);

const fetchSubjectList = async () => {
  const subjects = await getListSubjects({
    take: 20,
    skip: 0,
  });
  subjectArr.value = subjects;
};

onMounted(async () => {
  await fetchSubjectList();
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
