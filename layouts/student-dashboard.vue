<template>
  <div class="min-h-full">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute right-0 top-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="absolute -inset-0.5" />
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-shrink-0 items-center px-4">
                <img class="h-12 w-auto" src="/logo.png" alt="Your Company" />
              </div>
              <div class="mt-5 h-0 flex-1 overflow-y-auto">
                <nav class="px-2">
                  <div class="space-y-1">
                    <NuxtLink
                      v-for="item in navigation"
                      :key="item.name"
                      :to="item.href"
                      :class="[
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5',
                      ]"
                      :aria-current="item.current ? 'page' : undefined"
                    >
                      <component
                        :is="item.icon"
                        :class="[
                          item.current
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 h-6 w-6 flex-shrink-0',
                        ]"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pb-4 lg:pt-5"
    >
      <div class="flex flex-shrink-0 items-center px-6">
        <img class="h-12 w-auto" src="/logo.png" alt="Your Company" />
      </div>
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
        <!-- User account dropdown -->
        <Menu as="div" class="relative inline-block px-3 text-left">
          <div>
            <MenuButton
              class="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              <span class="flex w-full items-center justify-between">
                <span
                  class="flex min-w-0 items-center justify-between space-x-3"
                >
                  <img
                    v-if="studentData.profile_image"
                    class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                    :src="studentData.profile_image"
                    alt=""
                  />
                  <span class="flex min-w-0 flex-1 flex-col">
                    <span
                      v-if="studentData.name"
                      class="truncate text-sm font-medium text-gray-900"
                      >{{ studentData.name }}</span
                    >
                    <span
                      v-if="studentData.email"
                      class="truncate text-sm text-gray-500"
                      >{{ studentData.email }}</span
                    >
                  </span>
                </span>
                <ChevronUpDownIcon
                  class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    :to="`${studentPath}/setting`"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Settings</NuxtLink
                  >
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    @click="
                      () =>
                        signOut({
                          callbackUrl: '/student/login',
                        })
                    "
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-red-700',
                      'block px-4 py-2 text-sm w-full',
                    ]"
                  >
                    Logout
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>

        <!-- Navigation -->
        <nav class="mt-6 px-3">
          <div class="space-y-1">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-6 w-6 flex-shrink-0',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>
    <!-- Main column -->
    <div class="flex flex-col lg:pl-64">
      <div
        class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden"
      >
        <button
          type="button"
          class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex flex-1 justify-end px-4 sm:px-6 lg:px-8">
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <NuxtLink
                        :to="`${studentPath}/setting`"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Settings</NuxtLink
                      >
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="
                          () =>
                            signOut({
                              callbackUrl: '/student/login',
                            })
                        "
                        href="#"
                        :class="[
                          active ? 'bg-gray-100 text-gray-900' : 'text-red-700',
                          'block px-4 py-2 text-sm w-full',
                        ]"
                      >
                        Logout
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <!-- Page title & actions -->
        <div
          class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        >
          <div class="min-w-0 flex-1">
            <h1
              class="inline-flex gap-2 items-center text-lg font-medium leading-6 text-gray-900 sm:truncate"
            >
              <slot name="header" />
            </h1>
          </div>
        </div>
        <slot name="content" />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3CenterLeftIcon,
  XMarkIcon,
  DocumentChartBarIcon,
  DocumentTextIcon,
  ClipboardIcon,
} from "@heroicons/vue/24/outline";
import { ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const studentData = ref<any>({});

const { signOut } = useAuth();
const { getStudentFromToken } = useStudent();

const studentPath = "/student";
const route = useRoute();

const navigation = [
  {
    name: "Mata Pelajaran",
    href: `${studentPath}/mata-pelajaran`,
    icon: ClipboardIcon,
    current: false,
  },
  {
    name: "Materi",
    href: `${studentPath}/materi`,
    icon: DocumentChartBarIcon,
    current: false,
  },
  {
    name: "Tugas",
    href: `${studentPath}/tugas`,
    icon: DocumentTextIcon,
    current: false,
  },
];

const sidebarOpen = ref(false);

onMounted(() => {
  studentData.value = getStudentFromToken();
});

watchEffect(() => {
  navigation.forEach((item) => {
    item.current = item.href === route.path;
  });
});
</script>
