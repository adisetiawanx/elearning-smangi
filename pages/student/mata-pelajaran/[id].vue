<template>
  <NuxtLayout name="student-dashboard">
    <template #header
      ><span>
        <ArrowLeftIcon
          @click="navigateTo('/student/mata-pelajaran')"
          class="w-5 text-gray-500 cursor-pointer"
        />
      </span>
      Detail Mata Pelajaran</template
    >
    <template #content>
      <div class="mx-5 mt-5">
        <h2 v-if="subjectData.name" class="font-medium text-xl">
          {{ subjectData.name }}
        </h2>
        <p class="text-sm mt-1 text-gray-500">
          {{ subjectData.Class?.name }}
        </p>
      </div>

      <!-- Materi List -->
      <div class="mx-5 mt-5 border-t pt-3">
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
                <NuxtLink :to="`/student/materi/${material.id}`">
                  <EyeIcon
                    class="w-6 bg-primary p-0.5 rounded shadow text-white cursor-pointer"
                  />
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Tugas List -->
      <div class="mx-5 mt-5 border-t pt-3">
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
                <NuxtLink :to="`/student/tugas/${assignment.id}`">
                  <EyeIcon
                    class="w-6 bg-primary p-0.5 rounded shadow text-white cursor-pointer"
                  />
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { EyeIcon, ArrowLeftIcon } from "@heroicons/vue/24/outline";
const { getSubjectByIdForStudent } = useSubject();

const subjectData = ref<any>({});

const route = useRoute();
const subjectId = route.params.id;

const fetchSubjectData = async () => {
  subjectData.value = await getSubjectByIdForStudent(subjectId);
};

definePageMeta({
  middleware: "is-student",
});

onMounted(async () => {
  await fetchSubjectData();
});
</script>
