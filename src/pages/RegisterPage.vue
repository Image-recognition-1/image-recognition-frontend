<template>
  <q-page
    class="row justify-center items-center"
    style="background: linear-gradient(
      215deg, rgba(0,57,166,1) 10%,
      rgba(224,255,255,1) 30%, rgba(224,255,255,1) 70%, rgba(0,57,166,1) 90%);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-form ref="formRef">
          <q-card class="shadow-24" style="width:350px; height:565px; border-radius: 10px;">
            <q-card-section class="bg-blue-7">
              <h4 class="text-h5 text-white q-my-md">Registracija</h4>
              <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
                <q-btn fab icon="fa-solid fa-arrow-right-to-bracket" color="blue-4" />
              </div>
            </q-card-section>
            <q-card-section class="q-px-lg q-mt-lg">
              <q-input
                dense
                rounded
                clearable
                v-model="formStateReg.fullName"
                type="text"
                label="Ime i prezime"
                :rules="[required]"
              >
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
                :rules="[required, email]"
              >
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
                :rules="[required]"
              >
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
                :rules="[required, password]"
              >
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
                :rules="[required]"
              >
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
                label="Registriraj se"
                :loading="isSubmitting"
                @click="submitForm"
                style="font-size: 17px;"
              />
              <q-btn
                flat
                rounded
                class="full-width text-center"
                color="blue-4"
                label="Povratak na prijavu"
                @click="() => router.push({ name: 'LoginPage' })"
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
import { useValidation } from 'src/composables';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/firebaseConfig';
import { useUserStore } from 'src/stores/UserStore';
import { authApi } from 'src/services/api';

const router = useRouter();
const userStore = useUserStore();
const { required, email, password } = useValidation();

const formRef: Ref<QForm | null> = ref(null);

const formStateReg = ref({
  username: '',
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const isSubmitting: Ref<boolean> = ref(false);
const submitForm = async () => {
  if (!formRef.value) return;

  const isValid = await formRef.value.validate();
  if (!isValid) return;

  if (formStateReg.value.password !== formStateReg.value.confirmPassword) {
    Notify.create({
      type: 'negative',
      message: 'Lozinke se ne podudaraju.',
    });
    return;
  }

  try {
    isSubmitting.value = true;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formStateReg.value.email,
      formStateReg.value.password,
    );
    const { user } = userCredential;

    const userResponse = await authApi.register({
      uid: user.uid,
      email: user.email || '',
      username: formStateReg.value.username,
      password: formStateReg.value.password,
      fullName: formStateReg.value.fullName,
      role: 'USER',
      disabled: false,
    });

    userStore.setCurrentUser({
      uid: userResponse.uid,
      email: userResponse.email || '',
      username: userResponse.username,
      fullName: userResponse.fullName,
      role: 'USER',
      disabled: false,
    });

    router.push({ name: 'HomePage' });

    Notify.create({
      type: 'positive',
      message: 'Registracija uspješna!',
    });
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Došlo je do greške. Pokušajte ponovo.',
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
