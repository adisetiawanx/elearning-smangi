<template>
  <HeadlessTransitionRoot
    :show="props.isOpen"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <HeadlessDialog
      :open="props.isOpen"
      @close="closeModal"
      class="relative z-50"
    >
      <!-- The backdrop, rendered as a fixed sibling to the panel container -->
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <!-- Full-screen scrollable container -->
      <div class="fixed inset-0 w-screen overflow-y-auto">
        <!-- Container to center the panel -->
        <div class="flex min-h-full items-center justify-center p-4">
          <!-- The actual dialog panel -->
          <HeadlessDialogPanel class="w-full max-w-xl rounded bg-white p-5">
            <HeadlessDialogTitle class="border-b pb-3 font-medium text-lg"
              >Tambahkan Mata Pelajaran Baru</HeadlessDialogTitle
            >

            <!-- Form for adding Siswa -->
            <form @submit.prevent="addSubject" class="mt-3">
              <div class="mb-4">
                <label
                  for="subject_name"
                  class="block text-sm font-medium text-gray-700"
                  >Nama</label
                >
                <input
                  type="text"
                  id="subject_name"
                  v-model="subject.name"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="mb-4">
                <label
                  for="kelas"
                  class="block text-sm font-medium text-gray-700"
                  >Kelas</label
                >
                <select
                  id="kelas"
                  v-model="subject.classId"
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
                <label
                  for="teacher"
                  class="block text-sm font-medium text-gray-700"
                  >Guru</label
                >
                <select
                  id="teacher"
                  v-model="subject.teacherId"
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
                <button
                  @click="closeModal"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Mata Pelajaran
                </button>
              </div>
            </form>
          </HeadlessDialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script lang="ts" setup>
const props = defineProps({
  isOpen: Boolean,
  fetchDataSubjects: {
    type: Function as PropType<() => Promise<void>>,
    required: true,
  },
});

const { getListKelas } = useKelas();
const { getTeachersData: getListTeacher } = useTeacher();

const listClass = ref<any>([]);
const listTeacher = ref<any>([]);
const subject = ref({
  name: "",
  teacherId: "",
  classId: "",
});

const closeModal = () => {
  emit("close");
};

const addSubject = async () => {
  if (!subject.value.name) {
    alert("Nama dan Jurusan tidak boleh kosong");
    return;
  }

  const { data: respone, error } = await useFetch(
    "/api/administrator/subject",
    {
      method: "POST",
      body: {
        name: subject.value.name,
        class_id: subject.value.classId,
        teacher_id: subject.value.teacherId,
      },
    }
  );

  if (error.value) {
    alert(error.value);
    return;
  }

  if (respone.value) {
    alert("Mata Pelajaran berhasil ditambahkan");
    props.fetchDataSubjects();
  }

  closeModal();
};

onMounted(async () => {
  listClass.value = await getListKelas({
    take: undefined,
    skip: 0,
  });

  listTeacher.value = await getListTeacher({
    take: undefined,
    skip: 0,
    search: "",
  });
});

const emit = defineEmits(["close"]);
</script>
