<template>
  <q-page
    class="row justify-center items-center"
    style="background: linear-gradient(#00BCD4, #009688);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card rounded class="shadow-24" style="width:350px; height:610px;">
          <q-card-section class="bg-teal-7">
            <h4 class="text-h5 text-white q-my-md">Registracija</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="fa-solid fa-arrow-right-to-bracket" color="teal-4" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
              dense
              rounded
              clearable
              v-model="formStateReg.fullName" type="text" label="Ime i prezime" :rules="[required]">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
              dense
              rounded
              clearable
              v-model="formStateReg.email"
              type="email"
              label="Email"
              :rules="[required, email]">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
              dense
                rounded
                clearable
                v-model="formStateReg.username"
                type="text"
                label="Korisničko ime"
                :rules="[required]">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                dense
                rounded
                clearable
                v-model="formStateReg.password"
                type="password"
                label="Lozinka"
                :rules="[required, password]">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input
                dense
                rounded
                clearable
                v-model="formStateReg.confirmPassword"
                type="password"
                label="Ponovi lozinku"
                :rules="[required]">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="teal-4"
              class="full-width text-white"
              label="Registriraj se"
              @click="submitForm"/>
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <q-btn
              flat
              color="teal-4"
              class="mb-sm"
              label="Povratak na prijavu"
              @click="() => router.push({ name: 'LoginPage' })"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { useValidation } from 'src/composables';
import { authApi, UserResponse } from 'src/services/api';
import { useUserStore } from 'src/stores/UserStore';

const router = useRouter();
const userStore = useUserStore();
const { required, email, password } = useValidation();

const isSubmitting: Ref<boolean> = ref(false);

const formStateReg = ref({
  username: '',
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const submitForm = async () => {
  try {
    isSubmitting.value = true;
    await authApi.register({ ...formStateReg.value });
    await authApi.login({
      username: formStateReg.value.username,
      password: formStateReg.value.password,
    });
    const response = await authApi.getMe();
    userStore.setCurrentUser(response as UserResponse);
    router.push({ name: 'HomePage' });
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Please try again.',
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
