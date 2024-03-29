<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>Edit Mata Pelajaran</template>
    <template #content>
      <form
        v-if="subjectData"
        @submit.prevent="updateSubject"
        class="mt-5 mx-5"
      >
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

        <div class="mb-4">
          <label for="kelas" class="block text-sm font-medium text-gray-700"
            >Kelas</label
          >
          <select
            id="kelas"
            v-model="subjectData.class_id"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Pilih Kelas</option>
            <option
              v-for="(kelas, kelasIndex) in listClass"
              :key="kelasIndex"
              :value="kelas.id"
            >
              {{ kelas.name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="teacher" class="block text-sm font-medium text-gray-700"
            >Guru</label
          >
          <select
            id="teacher"
            v-model="subjectData.teacher_id"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Pilih Guru</option>
            <option
              v-for="(teacher, teacherIndex) in listTeacher"
              :key="teacherIndex"
              :value="teacher.id"
            >
              {{ teacher.name }}
            </option>
          </select>
        </div>

        <div class="flex justify-end gap-3 mt-5 border-t pt-3">
          <UISpinner v-if="updateSubjectStatus.isLoading" />
          <button
            v-else
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Simpan
          </button>
        </div>
      </form>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const { getSubjectById } = useSubject();
const { getListKelas } = useKelas();
const { getTeachersData: getListTeacher } = useTeacher();

const subjectData = ref<any>({});

const listClass = ref<any>([]);
const listTeacher = ref<any>([]);

const updateSubjectStatus = ref({
  isLoading: false,
  isSuccess: false,
  isFailed: false,
});

const route = useRoute();
const subjectId = route.params.id;

const updateSubject = async () => {
  updateSubjectStatus.value.isLoading = true;

  if (
    !subjectData.value.name ||
    !subjectData.value.class_id ||
    !subjectData.value.teacher_id
  ) {
    alert("Tolong isi semua field!");
    updateSubjectStatus.value.isLoading = false;
    return;
  }
  const { data: respone, error } = await useFetch(
    `/api/administrator/subject/${subjectId}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + useCookie("auth:token").value,
      },
      body: {
        name: subjectData.value.name,
        class_id: subjectData.value.class_id,
        teacher_id: subjectData.value.teacher_id,
      },
    }
  );

  if (error.value) {
    alert(error.value.message);
  }

  if (respone.value) {
    updateSubjectStatus.value.isSuccess = true;
    subjectData.value = respone.value.data;
    alert("Berhasil mengupdate data mata pelajaran!");
  }
  updateSubjectStatus.value.isLoading = false;
};

onMounted(async () => {
  subjectData.value = await getSubjectById(subjectId);
  listClass.value = await getListKelas({
    take: undefined,
    skip: 0,
    search: "",
  });

  listTeacher.value = await getListTeacher({
    take: undefined,
    skip: 0,
    search: "",
  });
});

definePageMeta({
  middleware: "is-administrator",
});

useHead({
  title: "Edit Mata Pelajaran",
});
</script>
