<template>
  <q-dialog ref="dialogRef">
    <q-card class="container">
      <q-card-actions align="right" class="q-pb-none">
        <q-btn
          flat
          round
          class="text-white"
          size="sm"
          icon="fa-solid fa-x"
          @click="onDialogCancel" />
      </q-card-actions>
      <q-card-section class="scroll" style="max-height: 85vh;">
        <q-img :src="image" class="image"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';

defineProps({
  image: {
    type: String,
    required: true,
  },
});

const { dialogRef, onDialogCancel } = useDialogPluginComponent();
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  width: 100%;
  background-color: var(--q-primary);
  border-radius: 10px;
}

.image {
  width: 100%;
  border-radius: 10px;
}
</style>
