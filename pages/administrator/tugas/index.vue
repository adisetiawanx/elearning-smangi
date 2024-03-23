<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>List Tugas</template>
    <template #content>
      <div class="mb-3 mt-3 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="rounded shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari nama tugas"
          />
        </div>
      </div>

      <ul role="list" class="mx-7 border-x">
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
              {{ assignment.name }}
            </span>
            <div class="flex-1 flex justify-end">
              <NuxtLink
                :to="`/administrator/tugas/${assignment.id}`"
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
import { Cog8ToothIcon } from "@heroicons/vue/24/outline";

const { getListAssignment } = useAssignment();

const assignmentArr = ref<any>([]);

const fetchKelasList = async () => {
  const assignments = await getListAssignment({
    take: 20,
    skip: 0,
  });
  assignmentArr.value = assignments;
};

onMounted(async () => {
  await fetchKelasList();
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
