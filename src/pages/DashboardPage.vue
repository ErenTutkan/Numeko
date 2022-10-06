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
              <q-btn color="light-blue-12" label="Listele" @click="GetDialog(props)"></q-btn>
            </q-td>
          </template>
          <template v-slot:top>
      <div class="row justify-end" style="width:100%">
        <div class="column">
          <q-btn :label="ActiveMenu.Name" style="width:15rem;" :style="{'background':ActiveMenu.Color,'color':ActiveMenu.textColor}">
            <q-menu fit>
              <q-list style="min-width: 100px">
            <q-item clickable v-for="item in menu" v-close-popup :key="item.Name" @click="ChangeMenu(item)">
              <q-item-section >{{item.Name}}</q-item-section>
            </q-item>
            </q-list>

            </q-menu>
          </q-btn>
        </div>
      </div>
        <q-space />

      </template>

  </q-table>
       </div>
    </q-page>
<EducationPopup :dialog="dialog" :item="selectedItem" v-if="dialog" @closePopup="closeDialog"></EducationPopup>
</template>
<script>
function GetDialog (props) {
  dialog.value = !dialog.value
  this.selectedItem = props
}
import { reactive, ref, computed } from 'vue'
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
const menu = reactive([
  {
    Id: 1,
    Name: 'Planlanmış Eğitimler',
    isActive: false,
    Color: 'purple',
    textColor: 'white'
  },
  {
    Id: 2,
    Name: 'Gerçekleşen Eğitimler',
    isActive: false,
    Color: 'Blue',
    textColor: 'White'
  },
  {
    Id: 3,
    Name: 'Yaklaşan Eğitimler',
    isActive: true,
    Color: 'Red',
    textColor: 'Black'
  }
])
const ActiveMenu = computed(() => {
  return menu.find((x) => x.isActive === true)
})
function ChangeMenu (item) {
  const menuItem = this.menu.find((x) => x.Id === this.ActiveMenu.Id)
  menuItem.isActive = false
  const activeMenu = this.menu.find((x) => x.Id === item.Id)
  activeMenu.isActive = true
}
console.log(ActiveMenu)
const dialog = ref(false)
const selectedItem = reactive()
export default {
  setup () {
    return {
      columns,
      rows,
      dialog,
      GetDialog,
      closeDialog,
      selectedItem,
      menu,
      ActiveMenu,
      ChangeMenu
    }
  },
  components: { EducationPopup }
}
</script>
