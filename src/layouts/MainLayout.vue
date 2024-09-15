<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Prepoznavanje objekata na slici
        </q-toolbar-title>
        <q-btn
        v-if="$q.screen.width > 505"
        unelevated
        class="text-right text-body1"
        @click="router.push({ name: 'ProfilePage' })"
        >
          {{ userStore.currentUser.fullName }}
          <q-avatar class="q-ml-sm" rounded>
              <q-img
                  :src="'https://i.pravatar.cc/300?img=' + userStore.currentUser.id"
                  :img-style="{ border: '2px solid #FFF', borderRadius: '50%' }"
              />
          </q-avatar>
          <q-tooltip
          class="text-body2"
          :offset="[5, 5]"
          transition-show="scale"
          transition-hide="scale">
              <q-card flat class="bg-transparent text-white">
                  <q-card-section>
                      <q-img
                          :src="'https://i.pravatar.cc/300?img=' + (userStore.currentUser.id - 2)"
                          class="q-mb-md"
                      />
                      <strong>{{ 'id' }}:</strong>
                      {{ userStore.currentUser.id }} <q-space />
                      <strong>{{ 'email'}}:</strong>
                      {{ userStore.currentUser.email }} <q-space />
                      <strong>{{ 'role' }}:</strong>
                      {{ userStore.currentUser.role }}
                  </q-card-section>
              </q-card>
          </q-tooltip>
        </q-btn>
        <q-btn
        color="white"
        text-color="black"
        label="LOGOUT"
        icon="logout"
        @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-banner class="text-center q-my-sm">
        <label class="text-weight-light text-h5">{{ 'Izbornik' }}</label>
      </q-banner>
      <q-separator />
      <q-list>
          <q-item
            v-for="menuItem in menuItems"
            :key="menuItem.title"
            clickable
            v-ripple
            :to="menuItem.to"
            active-class="my-menu-link"
            @click="toggleLeftDrawer"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" size="sm" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ menuItem.title }}</q-item-label>
            </q-item-section>
          </q-item>
      </q-list>
      <q-item class="q-mb-md absolute-bottom">
          <q-item-section avatar>
              <q-avatar rounded>
                  <q-img
                      :src="'https://i.pravatar.cc/300?img=' + userStore.currentUser.id"
                      :img-style="{ border: '1px solid #000', borderRadius: '50%' }"
                  />
              </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ userStore.currentUser.fullName }}</q-item-label>
            <q-item-label caption>{{ userStore.currentUser.email }}</q-item-label>
          </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { authApi } from 'src/services/api';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/UserStore';

const router = useRouter();
const userStore = useUserStore();

const menuItems: Ref<{ title: string; to: { name: string }; icon: string }[]> = ref([]);
const setMenuItems = () => {
  menuItems.value = [
    { title: 'Prepoznavanje slike', to: { name: 'HomePage' }, icon: 'fa-solid fa-image' },
    { title: 'Korisnički profil', to: { name: 'ProfilePage' }, icon: 'fa-solid fa-user' },
  ];
};
setMenuItems();

const logout = async () => {
  await authApi.logout();
  userStore.clearCurrentUser();
  router.push({ name: 'LoginPage' });
};

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

</script>
