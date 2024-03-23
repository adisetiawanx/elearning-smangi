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
              >Tambahkan Mata Pelajaran ke Kelas</HeadlessDialogTitle
            >

            <!-- Form for adding Siswa -->
            <form @submit.prevent="addSubjectToClass" class="mt-3">
              <div class="mb-4">
                <label
                  for="kelas"
                  class="block text-sm font-medium text-gray-700"
                  >mata pelajaran</label
                >
                <select
                  id="kelas"
                  v-model="choosedSubject"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Pilih Mata Pelajaran</option>
                  <option
                    v-for="(subject, subjectIndex) in subjectList"
                    :key="subjectIndex"
                    :value="subject.name"
                  >
                    {{ subject.name }}
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
                  Tamabahkan
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
  classId: {
    type: String,
    required: true,
  },
  isOpen: Boolean,
  fetchClassData: {
    type: Function as PropType<() => Promise<void>>,
    required: true,
  },
});

const { addSubjectToClass: postSubjectToClass, getListSubjects } = useSubject();

const choosedSubject = ref<any>("");
const subjectList = ref<any>([]);

const closeModal = () => {
  emit("close");
};

const addSubjectToClass = async () => {
  await postSubjectToClass(props.classId, choosedSubject.value);
  await props.fetchClassData();
  closeModal();
};

onMounted(async () => {
  subjectList.value = await getListSubjects({
    take: undefined,
    skip: 0,
  });
});

const emit = defineEmits(["close"]);
</script>
