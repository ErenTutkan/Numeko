<template>
     <q-dialog v-model="dialog" persistent full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6" >Eğitimler</div>
        </q-card-section>
        <q-card-section>
          <div>
            <q-table title="Eğitimi Alan Kişiler" inline :rows="rows" :columns="columns" row-key="name">
            </q-table>
          </div>
        </q-card-section>
        <q-card-actions>
             <q-btn flat label="Cancel" color="primary" @click="$emit('closePopup')"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
<script setup>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Durum',
    align: 'left',
    field: 'Status',
    format: val => `${val}`,
    sortable: true
  },
  { name: 'tarih', align: 'center', label: 'Tarih', field: 'Date', sortable: true },
  { name: 'egitimKodu', label: 'E. Kodu', field: 'EgitimKodu', sortable: true },
  { name: 'egitim', label: 'Eğitim', field: 'Egitim', sortable: true },
  { name: 'actions', label: 'İşlemler', field: '' }
]
const rows = [
  {
    Status: 'Deneme',
    Date: 'Deneme',
    EgitimKodu: '123',
    Egitim: 'deneme'
  }, {
    Status: 'Deneme',
    Date: 'Deneme',
    EgitimKodu: '123',
    Egitim: 'deneme'
  }, {
    Status: 'Deneme',
    Date: 'Deneme',
    EgitimKodu: '123',
    Egitim: 'deneme'
  }, {
    Status: 'Deneme',
    Date: 'Deneme',
    EgitimKodu: '123',
    Egitim: 'deneme'
  }
]

const { defineProps } = require('@vue/reactivity')
const { ref, reactive } = require('@vue/reactivity')
const props = defineProps([
  'dialog',
  'item'
])
const dialog = ref(props.dialog)
console.log(dialog)
const item = reactive(props.item)
console.log(item.row.Date)

</script>
