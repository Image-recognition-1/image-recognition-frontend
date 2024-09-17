<template>
  <q-page padding>
    <div class="row justify-between items-center q-mb-md">
        <div class="text-h4 q-pl-xl q-mt-md">Galerija</div>
    </div>
    <div class="row justify-center q-gutter-lg">
          <div v-for="image in images" :key="image.id">
            <div
              class="container shadow-3"
              @click="openImageModal(image.imageUrl)">
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
          </div>
        </div>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { Dialog } from 'quasar';
import ImageModal from 'src/components/Gallery/ImageModal.vue';
import imageApi, { ImagesRead } from 'src/services/api/image';

const images: Ref<ImagesRead[]> = ref([]);

async function getImages() {
  try {
    images.value = await imageApi.getImages();
  } catch (error) {
    //
  }
}

function openImageModal(image: string) {
  Dialog.create({
    component: ImageModal,
    componentProps: {
      image,
    },
  });
}

onMounted(() => {
  getImages();
});
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 3px 3px 6px 0px rgba(40, 40, 40, 0.5);
  position: relative;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
}
.image {
  transition: all 0.3s ease-in-out;
}

.container:hover .image {
  transform: scale(1.05);
  filter: brightness(1.2);
}

.container:hover {
  border: 3px solid var(--q-primary);
}
</style>
