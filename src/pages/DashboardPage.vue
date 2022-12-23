<template>
    <q-page>
        <div class="text-h5 q-ml-md text-black bi-align-center q-mt-md" style="display:flex;"><img src="https://img.icons8.com/ios/30/000000/customer-insight--v1.png"/> <span style="align-items:center;margin-left: 0.5rem;">  Anasayfa</span></div>
      <div class="q-pa-md">
         <q-table
      title="Firma Adı"
      inline
      :rows="rows"
      :columns="columns"
      :visible-columns="visibleColumn"
      no-data-label="Gösterilebilecek Bir Kayıt Bulunamadı"
      :filter="search"
      row-key="id"
    >
 <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn color="light-blue-12" label="Listele" @click="GetDialog(props)"></q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <div v-if="props.row.status==='Gerçekleşen' && ActiveMenu.Name.toLowerCase()==='gerçekleşen eğitimler'" style="color:green;font-size:1rem;font-weight: 600;">Gerçekleşen</div>
            <div v-else-if="props.row.status==='Gerçekleşen' && (props.row.validityEndDate < dateNow)"   style="color:red;font-size:1rem;font-weight: 600;">Yaklaşan</div>

            <div v-else style="color:darkgoldenrod;font-size:1rem;font-weight: 600;">Planlanan</div>
          </q-td>
          </template>
          <template v-slot:top>
      <div class="row " style="width:100%">

     <!--   <q-btn :label="ActiveMenu.Name" style="width:15rem;font-weight: 500;" :style="{'background':ActiveMenu.Color,'color':ActiveMenu.textColor}">
            <q-menu fit>
              <q-list style="min-width: 100px">
            <q-item clickable v-for="item in menu" v-close-popup :key="item.Name" @click="ChangeMenu(item)">
              <q-item-section >{{item.Name}}</q-item-section>
            </q-item>
            </q-list>

            </q-menu>
          </q-btn>-->
         <div class="col-xs-9 justify-start ">
          <q-btn   :label="item.Name" class="ml-xs" :color="item.Color" v-for="item in menu" :key="item.Id" @click="ChangeMenu(item)" />
         </div>
         <div class="col-xs-3 text-right">
          <q-input  dense label="Arama Yap" color="primary" v-model="search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
         </div>

      </div>
        <q-space />

      </template>

  </q-table>
       </div>
    </q-page>
<EducationPopup :dialog="dialog"  v-if="dialog" @closePopup="closeDialog"></EducationPopup>
</template>
<script>
function GetDialog (props) {
  dialog.value = !dialog.value
  this.store.dispatch('participant/getList', props.key)
  this.selectedItem = props
}
import { reactive, ref, computed } from 'vue'
import EducationPopup from 'src/components/EducationPopup.vue'
import { mapGetters, useStore } from 'vuex'
import dayjs from 'dayjs'

const columns = [
  {
    name: 'id',
    label: 'id',
    field: 'id',
    align: 'left'
  },
  {
    name: 'status',
    required: true,
    label: 'Durum',
    field: 'status',
    sortable: true,
    align: 'left'
  },
  {
    name: 'educationId',
    required: true,
    label: 'Eğitim Numarası',
    field: (row) => row.educationId

  },
  {
    name: 'educationDate',
    align: 'left',
    label: 'Tarih',
    field: (row) => {
      const date = dayjs(row.educationDate)
      return date.format('DD/MM/YYYY')
    },
    sort: (a, b, rowA, rowB) => new Date(rowA.educationDate) - new Date(rowB.educationDate),
    sortable: true
  },
  {
    name: 'educationCode',
    label: 'E. Kodu',
    field: 'educationCode',
    align: 'left'
  },
  {
    name: 'educationName',
    label: 'Eğitim',
    field: 'educationName',
    align: 'left'
  },
  {
    name: 'participantCount',
    label: 'Katılım',
    field: (row) => {
      if (row.participantCount !== '') {
        return parseInt(row.participantCount)
      } else {
        return '0'
      }
    },
    align: 'left'
  },
  {
    name: 'educationTime',
    label: 'Süre(Gün)',
    field: 'educationTime',
    align: 'left'
  },
  {
    name: 'validityEndDate',
    label: 'Geçerlilik Bitiş Tarihi',
    field: (row) => {
      const date = dayjs(row.validityEndDate)
      return date.format('DD/MM/YYYY')
    },
    sort: (a, b, rowA, rowB) => new Date(rowA.validityEndDate) - new Date(rowB.validityEndDate),
    sortable: true,
    align: 'left'
  },
  {
    name: 'actions',
    label: 'İşlemler',
    field: '',
    align: 'right'
  }
]

function closeDialog () {
  dialog.value = false
}
const menu = reactive([
  {
    Id: 1,
    Name: 'Gerçekleşen Eğitimler',
    isActive: true,
    Color: 'blue-7',
    textColor: 'White'
  },
  {
    Id: 2,
    Name: 'Planlanmış Eğitimler',
    isActive: false,
    Color: 'green-7',
    textColor: 'white'
  },
  {
    Id: 3,
    Name: 'Yenilenecek Eğitimler',
    isActive: false,
    Color: 'red-7',
    textColor: 'Black'
  }
])
const ActiveMenu = computed(() => {
  return menu.find((x) => x.isActive === true)
})
const visibleColumn = ref(['status', 'educationDate', 'educationCode', 'educationName', 'participantCount', 'educationTime', 'validityEndDate', 'actions'])
async function ChangeMenu (item) {
  const menuItem = this.menu.find((x) => x.Id === this.ActiveMenu.Id)
  menuItem.isActive = false
  const activeMenu = this.menu.find((x) => x.Id === item.Id)
  activeMenu.isActive = true

  await this.store.dispatch('Education/getList', item.Id)
  if (item.Id === 1) {
    this.visibleColumn = ['status', 'educationDate', 'educationCode', 'educationName', 'participantCount', 'educationTime', 'validityEndDate', 'actions']
  } else {
    this.visibleColumn = ['status', 'educationDate', 'educationCode', 'educationName', 'participantCount', 'educationTime', 'validityEndDate']
  }
}
console.log(ActiveMenu)
const dialog = ref(false)
const selectedItem = reactive()
const search = ref(null)
export default {
  setup () {
    const store = useStore()
    return {
      columns,
      dialog,
      GetDialog,
      store,
      closeDialog,
      selectedItem,
      menu,
      ActiveMenu,
      ChangeMenu,
      visibleColumn,
      search
    }
  },
  components: { EducationPopup },
  async mounted () {
    this.ChangeMenu({ Id: 1 })
    console.log(this.dateNow)
    await this.$store.dispatch('initial')
  },
  computed: {
    ...mapGetters({
      rows: 'Education/getList'
    }),
    dateNow () {
      return dayjs().add(90, 'day').format('DD/MM/YYYY')
    }
  }
}
</script>
<style scoped>
@media(min-width:1000px){
  .ml-xs{
    margin-left:0.5rem;
  }
}
</style>
