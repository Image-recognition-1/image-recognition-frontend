<template>
  <q-dialog ref="dialogRef" persistent :backdrop-filter="'blur(4px) saturate(150%)'">
      <q-card bordered rounded>
          <q-card-section>
              <div class="text-h6">{{ message }}</div>
          </q-card-section>

          <q-card-actions align="right">
              <q-btn
              color="secondary" unelevated label="Odustani" v-close-popup />
              <q-btn
              color="red" unelevated label="Obriši" @click="onDialogOK()" />
          </q-card-actions>
      </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';

defineProps({
  message: String,
});

const { dialogRef, onDialogOK } = useDialogPluginComponent();
</script>
