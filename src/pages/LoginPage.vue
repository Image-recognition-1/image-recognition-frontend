<template>
  <q-page
    class="row justify-center items-center"
    style="background: linear-gradient(
      135deg, rgba(0,57,166,1) 10%,
      rgba(224,255,255,1) 30%, rgba(224,255,255,1) 70%, rgba(0,57,166,1) 90%);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-form ref="formRef">
          <q-card
            class="shadow-24"
            style="width:350px; height: 470px; border-radius: 10px;">
            <q-card-section class="bg-blue-7">
              <h4 class="text-h5 text-white q-my-md">Prijava</h4>
              <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
                <q-btn fab icon="fa-solid fa-arrow-right-to-bracket" color="blue-4" />
              </div>
            </q-card-section>
            <q-card-section class="q-px-lg q-mt-lg">
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
            </q-card-section>
            <q-card-actions class="q-px-lg">
              <q-btn
                unelevated
                rounded
                dense
                color="blue-4"
                class="full-width text-white q-mb-md"
                no-caps
                label="Prijavi se"
                :loading="isSubmitting"
                @click="submitForm"
                style="font-size: 17px;"
              />
              <q-btn
                outline
                rounded
                dense
                color="blue-4"
                class="full-width text-white q-mb-md"
                no-caps
                :icon="'img:src/assets/google.png'"
                label="Google prijava"
                :loading="isSubmittingGoogle"
                @click="signInWithGoogle"
                style="font-size: 17px;"
              />
              <q-btn
                flat
                rounded
                class="full-width text-center"
                color="blue-4"
                label="Nemate račun? Registrirajte se!"
                @click="() => router.push({ name: 'RegisterPage' })"
              />
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify, QForm } from 'quasar';
import { useUserStore } from 'src/stores/UserStore';
import { useValidation } from 'src/composables';
import { authApi, GoogleLoginRequest, userApi } from 'src/services/api';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'src/firebaseConfig';

const router = useRouter();
const userStore = useUserStore();
const { required, email, password } = useValidation();

const provider = new GoogleAuthProvider();

const isSubmittingGoogle: Ref<boolean> = ref(false);

const signInWithGoogle = async () => {
  try {
    isSubmittingGoogle.value = true;

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    const user = await authApi.googleLogin({ idToken } as GoogleLoginRequest);

    userStore.setCurrentUser(user);
  } catch (error) {
    //
  } finally {
    isSubmittingGoogle.value = false;
    router.push({ name: 'HomePage' });
  }
};

const formRef: Ref<QForm | null> = ref(null);

const formStateLogin = ref({
  email: '',
  password: '',
});

const isSubmitting: Ref<boolean> = ref(false);
const submitForm = async () => {
  if (!formRef.value) return;

  const isValid = await formRef.value.validate();
  if (!isValid) return;
  try {
    isSubmitting.value = true;

    await authApi.login({
      username: formStateLogin.value.email,
      password: formStateLogin.value.password,
    });

    const response = await userApi.getMe();
    userStore.setCurrentUser(response);

    Notify.create({
      type: 'positive',
      message: 'Uspješno ste se prijavili.',
    });

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
