<template>
     <q-dialog v-model="dialog" persistent >
      <q-card>
        <q-card-section>
          <div class="text-h6" >Katılımcılar</div>
        </q-card-section>
        <q-card-section>
          <div>
            <q-table title="Eğitimi Alan Kişiler" :visible-columns="visibleColumns" no-data-label="Eğitimi Alan Kayıtlı Kişi Bulunamadı" inline :rows="rows" :columns="columns" row-key="id">
              <template v-slot:body-cell-isCertificate="props">
                <q-td :props="props">
                  <div v-if="props.row.isCertificate===false" style="color:red;font-weight:600;font-size:1rem;">Sertifika Kazanamadı.</div>
                  <q-btn v-else color="primary"  label="İndir" @click="onClick(props)" />
                </q-td>
              </template>
            </q-table>
          </div>
        </q-card-section>
        <q-card-actions>
             <div class="row">
              <div class="col-12">
                <q-btn color="primary"  label="Toplu İndir" no-caps @click="multiDownload" />
              </div>
              <div class="col-12">

                <q-toggle v-model="isCompanyName" color="primary" label="Firma İsmi Gizleyin" />
              </div>
              <div class="col-12">
                <q-btn flat label="Kapat" color="primary" @click="$emit('closePopup')"  />
              </div>
             </div>

        </q-card-actions>
      </q-card>

    </q-dialog>
   <!-- <certificate-template v-if="generate" :isCompanyName="isCompanyName" :id="selectedItem" @generateOff="generatePdf=false"></certificate-template>-->
</template>
<script setup>

const columns = [
  {
    name: 'id',
    label: 'id',
    field: (row) => row.id,
    align: 'left'
  },
  {
    name: 'joinNameSurname',
    label: 'Katılımcı Adı Soyadı',
    field: (row) => row.joinNameSurname,
    align: 'left'
  },
  {
    name: 'isCertificate',
    label: 'Sertifika',
    field: 'isCertificate',
    align: 'right'
  }

]
const { computed } = require('vue')
const { defineProps } = require('@vue/reactivity')
const { ref } = require('@vue/reactivity')
const { useStore } = require('vuex')
const { api } = require('src/boot/axios')

const { useQuasar } = require('quasar')
const $q = useQuasar()
const showLoading = (message) => {
  $q.loading.show({
    message,
    messageColor: 'white'
  })
}
const hideLoading = () => {
  $q.loading.hide()
}
const showNotify = (message, type) => {
  $q.notify({
    message,
    color: type,
    position: 'top-right',
    timeout: 2000
  })
}
const store = useStore()
const rows = computed(() => store.getters['participant/getList'])
const props = defineProps([
  'dialog',
  'item'
])
const visibleColumns = ['isCertificate', 'joinNameSurname']

function multiDownload () {
  showLoading('Dosyaların Oluşturulma İşlemi Gerçekleştiriliyor. Bittikten Sonra Mail Olarak Atılacaktır.')
  const activeList = store.getters['participant/getList'].filter(x => x.isCertificate === true)
  const activeId = []
  for (const item of activeList) {
    activeId.push(item?.id)
  }

  const company = store.getters['user/getCompany']
  const postItem = {
    certificateIds: activeId,
    companyName: company?.companyName,
    email: company?.email,
    isHide: isCompanyName.value
  }
  console.log(postItem)
  api.post('Certificate', postItem).then(({ data }) => {
    showNotify('Sertifikalar Yollanacak', 'positive')
  }).catch(() => {
    showNotify('Hata Oluştu Lütfen Daha Sonra Tekrar Deneyiniz Çözüyoruz.', 'negative')
  })
  hideLoading()
}

const isCompanyName = ref(false)

const dialog = ref(props.dialog)
console.log(dialog)
const onClick = async (props) => {
  showLoading('Sertifika Oluşturuluyor. Oluşturulduktan Sonra Otomatik Olarak İndirilecektir.')
  await api.get(`Certificate?certificateId=${props.key}&companyNameHide=${isCompanyName.value}`).then(async ({ data }) => {
    const url = process.env.CERTIFICATE_URL + data
    await api.get(url, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = data.split('/')[1]
        link.click()
        URL.revokeObjectURL(link.href)
        api.get('Certificate/DeleteCertificate?fileName=' + data.split('/')[1])
      }).catch(console.error)
  }).catch((error) => {
    console.log(error)
  })
  hideLoading()
}

</script>
