<template>
  <q-page
    class="row justify-center items-center"
    style="background: linear-gradient(#AED4FF, #6FA2FF);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card rounded class="shadow-24" style="width:350px; height:465px;">
          <q-card-section class="bg-light-blue-7">
            <h4 class="text-h5 text-white q-my-md">Prijava</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="fa-solid fa-arrow-right-to-bracket" color="blue-4" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
              rounded
              v-model="formStateLogin.email"
              type="text"
              label="Email"
              :rules="[required, email]">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                rounded
                v-model="formStateLogin.password"
                type="password"
                label="Lozinka"
                :rules="[required, password]">
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
              color="blue-4"
              class="full-width text-white"
              label="Prijavi se"
              :disable="formStateLogin.email === ''
              || formStateLogin.password === ''
              || isSubmitting"
              @click="submitForm"
            />
          </q-card-actions>
          <q-card-section>
            <div class="text-center">
              <q-btn
                flat
                color="blue-4"
                label="Nemate račun? Registrirajte se!"
                @click="() => router.push({ name: 'RegisterPage' })"
              />
            </div>
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
import { useUserStore } from 'src/stores/UserStore';
import { useValidation } from 'src/composables';
import { authApi } from 'src/services/api';

const router = useRouter();
const userStore = useUserStore();
const { required, email, password } = useValidation();

const isSubmitting: Ref<boolean> = ref(false);

const formStateLogin = ref({
  email: '',
  password: '',
});

const submitForm = async () => {
  try {
    isSubmitting.value = true;

    await authApi.login({
      username: formStateLogin.value.email,
      password: formStateLogin.value.password,
    });

    const response = await authApi.getMe();
    userStore.setCurrentUser(response);

    router.push({ name: 'HomePage' });
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Netočni podaci za prijavu.',
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
