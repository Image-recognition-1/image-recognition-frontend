<template>
  <q-page padding>
    <div class="flex flex-center q-my-md" style="min-height: 80vh;">
      <q-card flat style="max-width: 750px; border-radius: 10px;">
        <q-card-section>
          <div class="text-h5 text-center">
              Učitaj sliku
          </div>
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-file
            v-model="file"
            label="Odaberi sliku"
            flat
            rounded
            outlined
            use-chips
            clearable
            :disable="isSubmitting"
            accept="image/*"
            max-file-size="5120000"
            @update:model-value="onImageAdded([file as File])"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </q-card-section>
        <q-card-section v-if="uploadedImage">
          <div class="row justify-center q-pa-md">
            <q-img
              :src="uploadedImage"
              spinner-color="primary"
              :width="uploadedImage !== 'src/assets/upload-img.png' ? '480px' : '250px'"
              style="border-radius: 10px;" />
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            v-if="!isSubmitting"
            label="Pošalji sliku"
            color="primary"
            class="q-mb-md"
            unelevated
            rounded
            @click="uploadImage"
            :disable="!file"
          />
          <div v-if="isSubmitting" class="flex flex-center">
            <q-circular-progress
              indeterminate
              size="80px"
              :thickness="0.6"
              color="primary"
              center-color="grey-8"
              class="q-ma-md"
            />
          </div>
        </q-card-actions>
        <q-separator v-if="!results" />
        <q-card-section>
          <div v-if="!results" class="text-h5 text-center">
              Rezultati predikcije
          </div>
          <template v-for="(value, key) in results.predictions" :key="key">
            <div class="row-container">
              <div class="key-name">{{ key }}
                <span class="text-weight-bold">{{ (value * 100).toFixed(2) }}%</span>
              </div>
              <div class="value-bar">
                <span
                  class="bar bg-primary text-warning q-ma-md"
                  :style="{ width: (value * 100) + '%' }">

                </span>
              </div>
            </div>
          </template>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { imageApi } from 'src/services/api';

const file = ref<File | undefined>();
const uploadedImage = ref<string | null>('src/assets/upload-img.png');

const results = ref<{ [key: string]: number }>({});

const onImageAdded = (files: File[]) => {
  if (!files[0]) {
    uploadedImage.value = 'src/assets/upload-img.png';
    results.value = {};
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.value = e.target?.result as string;
  };
  if (files[0]) {
    reader.readAsDataURL(files[0]);
  }
};

const isSubmitting = ref(false);
const uploadImage = async () => {
  onImageAdded([file.value as File]);
  if (file.value) {
    const formData = new FormData();
    formData.append('file', file.value);

    isSubmitting.value = true;
    try {
      const response = await imageApi.uploadImage(file.value as File);
      results.value = response;
    } catch (error) {
      //
    } finally {
      isSubmitting.value = false;
    }
  }
};

</script>

<style lang="css" scoped>
.row-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.key-name {
  flex-basis: 125px;
  text-align: left;
}

.value-bar {
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
}

.bar {
  height: 45px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  color: white;
}

</style>
