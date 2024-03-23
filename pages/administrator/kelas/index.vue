<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>List Kelas</template>
    <template #content>
      <AddClassModal
        :fetch-data-kelas="fetchKelasList"
        :is-open="isOpen"
        @close="closeAddModal"
      />
      <button
        @click="isOpen = true"
        class="inline-flex items-center font-medium bg-green-500 text-white gap-1.5 mx-7 mt-5 py-1.5 px-4 shadow rounded hover:bg-green-600"
      >
        <PlusCircleIcon class="w-5" />
        <span>Kelas</span>
      </button>
      <div class="mb-3 mt-3 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="rounded shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari nama kelas"
          />
        </div>
      </div>

      <ul role="list" class="mx-7 border-x">
        <li
          v-for="(kelas, kelasIndex) in kelasArr"
          :key="kelasIndex"
          :class="[
            kelasIndex + 1 == kelasArr.length ? 'border-b' : '',
            'border-t',
          ]"
        >
          <div
            class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
          >
            <span class="flex-1 truncate font-medium">
              {{ kelas.name }}
            </span>
            <span class="flex-initial truncate">
              {{ kelas.major }}
            </span>
            <div class="flex-1 flex justify-end">
              <NuxtLink
                :to="`/administrator/kelas/${kelas.id}`"
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
import AddClassModal from "~/components/AddClassModal.vue";

const isOpen = ref(false);
const { getListKelas } = useKelas();

function closeAddModal() {
  isOpen.value = false;
}

const kelasArr = ref<any>([]);

const fetchKelasList = async () => {
  const kelas = await getListKelas({
    take: 20,
    skip: 0,
  });
  kelasArr.value = kelas;
};

onMounted(async () => {
  await fetchKelasList();
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
