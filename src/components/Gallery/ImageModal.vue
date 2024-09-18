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
      <q-card-section class="scroll flex flex-center q-gutter-md" style="max-height: 85vh;">
        <div>
          <q-img :src="props.image.imageUrl" class="image" width="450px" :ratio="1" />
        </div>
        <div class="q-pa-md wrapper">
          <q-list separator padding>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="fa-solid fa-hashtag" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>ID</q-item-label>
                <q-item-label>{{ props.image.id }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="fa-solid fa-file" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Naziv slike</q-item-label>
                <q-item-label>{{ props.image.filename }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="fa-solid fa-clock" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Kreirana</q-item-label>
                <q-item-label>
                  {{ date.formatDate(props.image.uploadedAt, 'DD.MMM.YYYY HH:mm') }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <template v-for="(value, key) in props.image.predictions" :key="key">
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
        </div>
        <q-btn
          color="red"
          rounded
          unelevated
          label="Obriši"
          icon="fa-solid fa-trash"
          @click="openConfirmationDialog(props.image.id)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { useDialogPluginComponent, date, Dialog } from 'quasar';
import { ImagesRead } from 'app/schemas/generated-api';

const props = defineProps({
  image: {
    type: Object as PropType<ImagesRead>,
    required: true,
  },
});

const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent();

function openConfirmationDialog(imageId: string) {
  Dialog.create({
    title: 'Brisanje slike',
    message: 'Jeste li sigurni da želite obrisati ovu sliku?',
    style: 'border-radius: 10px;',
    cancel: {
      color: 'primary',
      label: 'Odustani',
      unelevated: true,
      rounded: true,
    },
    ok: {
      color: 'red',
      label: 'Obriši',
      unelevated: true,
      rounded: true,
    },
  }).onOk(() => {
    onDialogOK(imageId);
  });
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  width: 100%;
  background-color: var(--q-primary);
  border-radius: 10px;
}

.image {
  width: 100%;
  border-radius: 10px;
  border: 3px solid white;
}

.wrapper {
  background-color: white;
  border-radius: 10px;
  margin-left: 12px;
  height: fit-content;
  display: grid;
  place-content: center;
}

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
  height: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  color: white;
}

</style>
