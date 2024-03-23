<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>Edit Kelas : {{ subjectData.name }}</template>
    <template #content>
      <form v-if="subjectData" @submit.prevent="" class="mt-5 mx-5">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nama</label
          >
          <input
            type="text"
            id="name"
            v-model="subjectData.name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="flex justify-end gap-3 mt-5 border-t pt-3">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Simpan
          </button>
        </div>
      </form>

      <div class="mx-5 mt-5">
        <div class="mb-2">
          <h3 class="font-medium">List guru yang mengajar mapel ini</h3>
        </div>
        <p
          v-if="subjectData.Teacher && subjectData.Teacher.length <= 0"
          class="text-sm text-gray-500"
        >
          Tidak ada guru...
        </p>
        <ul v-else role="list" class="border-x max-h-96 overflow-y-auto">
          <li
            v-for="(teacher, teacherIndex) in subjectData.Teacher"
            :key="teacher.id"
            :class="[
              teacherIndex + 1 == subjectData.Teacher.length ? 'border-b' : '',
              'border-t',
            ]"
          >
            <div
              class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
            >
              <span class="flex-1 truncate font-medium">
                {{ teacher.name }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const subjectData = ref<any>({});

const { getSubjectById } = useSubject();

const route = useRoute();
const subjectId = route.params.id;

onMounted(async () => {
  subjectData.value = await getSubjectById(subjectId);
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
