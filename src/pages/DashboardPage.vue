<template>
    <q-page>
        <div class="text-h5 q-ml-md text-black bi-align-center q-mt-md" style="display:flex;"><img src="https://img.icons8.com/ios/30/000000/customer-insight--v1.png"/> <span style="align-items:center;margin-left: 0.5rem;">  Müşteri Sayfası</span></div>
      <div class="q-pa-md">
         <q-table
      title="Firma Adı"
      inline
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
 <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn color="light-blue-12" label="Listele" @click="GetDialog()"></q-btn>
            </q-td>
          </template>
          <template v-slot:top-right>
        <q-btn color="secondary" :disable="loading" label="Planlanmış Eğitimler"  />
        <q-btn class="q-ml-sm" color="info" :disable="loading" label="Gerçekleşen Eğitimler" />
        <q-space />

      </template>

  </q-table>
       </div>
    </q-page>
<EducationPopup :dialog="dialog" v-if="dialog" @closePopup="closeDialog"></EducationPopup>
</template>
<script>
function GetDialog () {
  dialog.value = !dialog.value
}
import { ref } from 'vue'
import EducationPopup from 'src/components/EducationPopup.vue'
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
  { name: 'katilim', label: '#Katılım', field: 'Katilim', sortable: true },
  { name: 'sure', label: 'Süre', field: 'Sure', sortable: true },
  { name: 'sehir', label: 'Şehir', field: 'Sehir', sortable: true },
  { name: 'actions', label: 'İşlemler', field: '' }
]

const rows = [
  {
    Status: 'Deneme',
    Date: 'Deneme',
    EgitimKodu: '123',
    Egitim: 'deneme',
    Katilim: 'deneme',
    Sure: '123',
    Sehir: '123'

  }, {
    Status: 'Deneme',
    Date: 'Deneme',
    EgitimKodu: '123',
    Egitim: 'deneme',
    Katilim: 'deneme',
    Sure: '123',
    Sehir: '123'
  }, {
    Status: 'Deneme',
    Date: 'Deneme',
    EgitimKodu: '123',
    Egitim: 'deneme',
    Katilim: 'deneme',
    Sure: '123',
    Sehir: '123'
  }, {
    Status: 'Deneme',
    Date: 'Deneme',
    EgitimKodu: '123',
    Egitim: 'deneme',
    Katilim: 'deneme',
    Sure: '123',
    Sehir: '123'
  }
]
function closeDialog () {
  dialog.value = false
}
const dialog = ref(false)
export default {
  setup () {
    return {
      columns,
      rows,
      dialog,
      GetDialog,
      closeDialog
    }
  },
  components: { EducationPopup }
}
</script>
