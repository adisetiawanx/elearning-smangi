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
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <HeadlessDialogPanel class="w-full max-w-xl rounded bg-white p-5">
            <HeadlessDialogTitle class="border-b pb-3 font-medium text-lg"
              >Hapus tugas</HeadlessDialogTitle
            >

            <p class="text-lg mt-3">
              Apakah anda yakin ingin menghapus tugas yang telah dikumpulkan
              ini?
            </p>
            <UISpinner v-if="deleteClassStatus.isLoading" class="mt-3" />
            <div v-else class="space-x-3 mt-3 flex justify-end">
              <button
                @click="closeModal"
                class="inline-flex items-center font-medium border gap-1.5 py-1.5 px-4 rounded-md hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                @click="handleDeleteClass"
                class="inline-flex items-center font-medium bg-red-500 text-white gap-1.5 py-1.5 px-4 rounded-md hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </HeadlessDialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: {
    type: String as PropType<string>,
    required: true,
  },
  isOpen: Boolean,
  fetchDataAssignment: {
    type: Function as PropType<() => Promise<void>>,
    required: true,
  },
});

const deleteClassStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});

const { deleteSubmittedAssignmentForStudent } = useAssignment();

const handleDeleteClass = async () => {
  deleteClassStatus.value.isLoading = true;
  await deleteSubmittedAssignmentForStudent(props.id);
  await props.fetchDataAssignment();
  deleteClassStatus.value.isLoading = false;
  closeModal();
};

const closeModal = () => {
  emit("close");
};

const emit = defineEmits(["close"]);
</script>
