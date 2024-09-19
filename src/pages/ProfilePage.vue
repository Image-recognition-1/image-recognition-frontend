<template>
  <q-page padding>
    <div class="row justify-between items-center q-mb-xl">
        <div class="text-h4 q-pl-xl q-mt-md">{{ "Uredi profil" }}</div>
    </div>
    <div class="row justify-center">
      <q-card
        rounded
        class="shadow-11 q-py-lg q-px-xl q-mb-xl"
        style="width: 70%; border-radius: 10px;"
        >
        <div class="container">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            style="display: none;"
          />
          <q-btn round @click="openImagePicker">
            <q-img
              class="image"
              :src="formStateUpdate.profilePictureUrl"
              :ratio="1"
            />
            <div class="overlay flex flex-center">
              <q-icon
                name="fa-solid fa-camera"
                size="50px"
                color="black"
              />
            </div>
          </q-btn>
        </div>
        <q-form ref="formRef">
          <label class="q-ml-md">Ime i prezime</label>
          <q-input
            class="q-pt-xs"
            outlined
            rounded
            dense
            clearable
            v-model="formStateUpdate.fullName"
            type="text"
            :rules="[required]"
          />
          <label class="q-ml-md">Email</label>
          <q-input
            class="q-pt-xs"
            dense
            outlined
            rounded
            clearable
            v-model="formStateUpdate.email"
            type="email"
            :rules="[required, email]"
          />
          <label class="q-ml-md">Korisničko ime</label>
          <q-input
            dense
            class="q-pt-xs"
            outlined
            rounded
            clearable
            v-model="formStateUpdate.username"
            type="text"
            :rules="[required]"
          />
          <label class="q-ml-md">Uloga</label>
          <q-select
            v-model="formStateUpdate.role"
            outlined
            rounded
            class="q-pt-xs"
            dense
            :disable="userStore.currentUser.role !== 'ADMIN'"
            options-dense
            :options="['GUEST', 'USER', 'ADMIN', ]"
            :rules="[() => true]"
          />
          <q-btn
            dense
            unelevated
            rounded
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

const imageFile: Ref<File | undefined> = ref();

const formRef: Ref<QForm | null> = ref(null);
const isSubmitting: Ref<boolean> = ref(false);

const { required, email } = useValidation();
const userStore = useUserStore();

const formStateUpdate = ref({
  fullName: userStore.currentUser.fullName,
  email: userStore.currentUser.email,
  username: userStore.currentUser.username,
  role: userStore.currentUser.role,
  disabled: userStore.currentUser.disabled,
  profilePictureUrl: userStore.currentUser.profilePictureUrl,
});

const openImagePicker = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.click();

  fileInput.onchange = () => {
    const file = fileInput.files?.[0];
    if (file) {
      imageFile.value = file;

      const reader = new FileReader();
      reader.onload = () => {
        formStateUpdate.value.profilePictureUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
};

const submitForm = async () => {
  if (!formRef.value) return;

  const isValid = await formRef.value.validate();
  if (!isValid) return;

  try {
    isSubmitting.value = true;

    if (imageFile.value) {
      await userApi.updateProfilePicture(
        userStore.currentUser.uid,
        imageFile.value,
      );
    }

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

<style lang="css" scoped>
.q-form {
  margin-top: -90px;
}
.container {
  position: relative;
  width: fit-content;
  margin: 0 auto;
  transform: translateY(-50%);
}

.image {
  display: block;
  height: 200px;
  width: 200px;
  height: auto;
  border-radius: 50%;
  border: 2px solid var(--q-primary);
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  border-radius: 50%;
  transition: .5s ease;
  background-color: var(--q-secondary);
}

.container:hover .overlay {
  opacity: 0.7;
  border-radius: 50%;
}
</style>
