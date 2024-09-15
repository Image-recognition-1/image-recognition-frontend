<template>
  <q-page padding>
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h4 q-pl-xl">
        <div class="q-pa-md bg-white" style="border-radius: 10px;">
          {{ "Učitaj sliku" }}
        </div>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <q-card flat style="max-width: 600px;">
        <q-card-section>
          <q-file
            v-model="files"
            label="Odaberi sliku"
            square
            flat
            counter
            outlined
            use-chips
            clearable
            accept="image/*"
            max-file-size="5120000"
            @="onFileSelect"
          >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-card-section>
       <q-card-section v-if="previewSrc">
          <div class="row justify-center q-mt-md">
            <q-img :src="previewSrc" style="max-width: 100%;" />
          </div>
        </q-card-section>
      <q-card-actions align="center">
        <q-btn
          label="Pošalji sliku"
          color="primary"
          unelevated
          @click="uploadImage"
        />
      </q-card-actions>
    </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const files = ref<File[]>([]);
const previewSrc = ref<string | null>(null);

const onFileSelect = (fileList: File[]) => {
  if (fileList.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewSrc.value = e.target?.result as string;
    };
    reader.readAsDataURL(fileList[0]);
  } else {
    previewSrc.value = null;
  }
};

const uploadImage = () => {
  if (files.value.length > 0) {
    console.log('Uploading:', files.value[0]);
  }
};
</script>
