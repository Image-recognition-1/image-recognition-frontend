<template>
  <q-page padding>
    <div class="q-ma-md">
      <div class="text-h4 q-pl-xl">Galerija</div>
    </div>
    <div class="wrapper">
      <template v-for="image in images" :key="image.id">
        <div
          class="container shadow-3"
          @click="openImageModal(image)">
          <q-img
            :src="image.imageUrl"
            class="image"
            spinner-color="primary"
          />
          <q-tooltip
            class="bg-primary"
            anchor="bottom middle"
            self="bottom middle"
            transition-show="scale"
            transition-hide="scale"
            :transition-duration="300">
            <div class="text-caption">Image <i>{{ image.filename }}</i></div>
          </q-tooltip>
        </div>
      </template>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import { Dialog } from 'quasar';
import ImageModal from 'src/components/Gallery/ImageModal.vue';
import imageApi, { ImagesRead } from 'src/services/api/image';

const images: Ref<ImagesRead[]> = ref([]);

async function getImages() {
  try {
    images.value = await imageApi.getImages();
    images.value.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    );
  } catch (error) {
    //
  }
}
getImages();

async function deleteImage(imageId: string) {
  try {
    await imageApi.deleteImage(imageId);
  } catch (error) {
    //
  } finally {
    getImages();
  }
}

function openImageModal(image: ImagesRead) {
  Dialog.create({
    component: ImageModal,
    componentProps: {
      image,
    },
  }).onOk((imageId) => {
    deleteImage(imageId);
    getImages();
  });
}

</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  place-content: center;
  place-items: center;
  gap: 25px;
  padding: 16px 0;
}

.container {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  border: 3px solid white;
  box-shadow: 3px 3px 6px 0px rgba(40, 40, 40, 0.5);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: white;
  transition: all 0.3s ease-in-out;
}

.container:hover .image {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.container:hover {
  border: 3px solid var(--q-primary);
}
</style>
