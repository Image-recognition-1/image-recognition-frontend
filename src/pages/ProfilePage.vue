<template>
  <q-page padding>
    <div class="row justify-between items-center q-mb-md">
        <div class="text-h4 q-pl-xl q-mt-md">{{ "Uredi profil" }}</div>
    </div>
    <div class="row justify-center">
      <q-card rounded class="shadow-11" style="width: 75%;">
      <q-form ref="formRef" class="q-pa-md">
        <label class="q-ml-md">Ime i prezime</label>
        <q-input
          class="q-mb-sm"
          outlined
          dense
          clearable
          v-model="formStateUpdate.fullName"
          type="text"
          :rules="[required]"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <label class="q-ml-md">Emal</label>
        <q-input
          class="q-mb-sm"
          dense
          outlined
          clearable
          v-model="formStateUpdate.email"
          type="email"
          :rules="[required, email]"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <label class="q-ml-md">Korisničko ime</label>
        <q-input
          dense
          class="q-mb-sm"
          outlined
          clearable
          v-model="formStateUpdate.username"
          type="text"
          :rules="[required]"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <label class="q-ml-md">Lozinka</label>
        <q-input
          dense
          class="q-mb-sm"
          outlined
          clearable
          v-model="formStateUpdate.password"
          type="password"
          :rules="[required, password]"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <label class="q-ml-md">Potvrda lozinke</label>
        <q-input
          dense
          class="q-mb-sm"
          outlined
          clearable
          v-model="formStateUpdate.confirmPassword"
          type="password"
          :rules="[required]"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <label class="q-ml-md">Uloga</label>
        <q-select
          v-model="formStateUpdate.role"
          outlined
          class="q-mb-md"
          dense
          :disable="userStore.currentUser.role !== 'ADMIN'"
          options-dense
          :options="['GUEST', 'USER', 'ADMIN', ]" />
        <q-btn
          dense
          unelevated
          size="md"
          color="primary"
          class="full-width text-white q-my-md"
          label="Spremi promjene"
          :disable="isSubmitting"
          :loading="isSubmitting"
          @click="submitForm"
        />
      </q-form>
    </q-card>
    </div>

    </q-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { Notify, QForm } from 'quasar';
import { userApi } from 'src/services/api';
import { useValidation } from 'src/composables';
import { useUserStore } from 'src/stores/UserStore';

const formRef: Ref<QForm | null> = ref(null);
const isSubmitting: Ref<boolean> = ref(false);

const { required, email, password } = useValidation();
const userStore = useUserStore();

const formStateUpdate = ref({
  fullName: userStore.currentUser.fullName,
  email: userStore.currentUser.email,
  username: userStore.currentUser.username,
  password: '',
  confirmPassword: '',
  role: userStore.currentUser.role,
  disabled: userStore.currentUser.disabled,
});

const submitForm = async () => {
  if (!formRef.value) return;

  const isValid = await formRef.value.validate();
  if (!isValid) return;

  if (formStateUpdate.value.password !== formStateUpdate.value.confirmPassword) {
    Notify.create({
      message: 'Lozinke se ne podudaraju',
      color: 'negative',
    });
    isSubmitting.value = false;
    return;
  }
  try {
    isSubmitting.value = true;

    const response = await userApi.updateUser(
      userStore.currentUser.uid,
      formStateUpdate.value,
    );
    userStore.setCurrentUser(response);
    Notify.create({
      message: 'Profil uspješno ažuriran',
      color: 'positive',
    });
  } catch (error) {
    Notify.create({
      message: 'Došlo je do pogreške',
      color: 'negative',
    });
  } finally {
    isSubmitting.value = false;
  }
};

</script>
