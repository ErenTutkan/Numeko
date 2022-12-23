<template>
    <div>
        <q-card bordered square>
            <q-card-section>

                <q-btn label="Firma Bilgileri" size=".8rem" color="primary"></q-btn>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section >
                <div class="text-right"><q-btn :label="getButtonText"  @click="Editable" style="color:white" :class="[{'bg-yellow-10':!edit},{'bg-positive':edit}]"></q-btn></div>
            </q-card-section>
            <q-card-section class="q-gutter-md">
                <div class="row">
                    <div class="col-md-4 col-xs-12 col-lg-4 col-xl-4">
                       <span class="text-bold">Firma Kısa Adı</span>
                    <br>
                    <q-input outlined :dense="true"  :disable="!edit" v-model="companyItem.companyShortName" :filled="!edit"/>
                    </div>
                    <div class="col-md-8 col-xs-12 col-lg-8 col-xl-8">
                   <span class="text-bold ml-lg">Firma Ünvanı</span>
                    <br>
                    <q-input outlined :dense="true" class="ml-lg" :disable="!edit" v-model="companyItem.companyName" :filled="!edit"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-xs-12 col-lg-4 col-xl-4">
                       <span class="text-bold">Şehir</span>
                    <br>
                    <q-select outlined :dense="true" :disable="!edit" :filled="!edit" v-model="companyItem.city" :options="sehirler"></q-select>
                    </div>
                    <div class="col-md-8 col-xs-12 col-lg-8 col-xl-8">
                   <span class="text-bold ml-lg">Adres</span>
                    <br>
                    <q-input outlined :dense="true" class="ml-lg" :disable="!edit" v-model="companyItem.address" :filled="!edit"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-xs-12 col-lg-4 col-xl-4">
                       <span class="text-bold ">Telefon</span>
                        <br>
                        <q-input outlined :dense="true"  :disable="!edit" v-model="companyItem.phone" :filled="!edit"/>
                    </div>
                    <div class="col-md-4 col-xs-12 col-lg-4 col-xl-4">
                       <span class="text-bold ml-lg">Website</span>
                        <br>
                        <q-input outlined :dense="true" class="ml-lg" :disable="!edit" v-model="companyItem.website" :filled="!edit"/>
                    </div>
                    <div class="col-md-4 col-xs-12 col-lg-4 col-xl-4">
                       <span class="text-bold ml-lg">Email</span>
                        <br>
                        <q-input outlined :dense="true" class="ml-lg" :disable="!edit" v-model="companyItem.email" :filled="!edit"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-xs-12 col-lg-4 col-xl-4">
                        <span class="text-bold">Vergi Dairesi İli</span>
                        <q-select outlined :dense="true" :disable="!edit" :filled="!edit" v-model="companyItem.taxOfficeCity" :options="sehirler"></q-select>
                    </div>
                    <div class="col-md-4 col-xs-12 col-lg-4 col-xl-4">
                        <span class="text-bold ml-lg">Vergi Dairesi</span>
                        <q-input class="ml-lg" outlined :dense="true" :disable="!edit" :filled="!edit" v-model="companyItem.taxOffice" ></q-input>
                    </div>
                    <div class="col-md-4 col-xs-12 col-lg-4 col-xl-4">
                       <span class="text-bold ml-lg">Vergi Numarası</span>
                        <br>
                        <q-input outlined :dense="true" class="ml-lg" :disable="!edit" v-model="companyItem.taxNumber" :filled="!edit"/>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
export default {
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editButtonText: 'Düzenle',
      edit: false,
      companyItem: {
        ...this.company
      },
      sehirler: ['Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'İçel (Mersin)', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
      ]

    }
  },
  methods: {
    showNotify (message, type) {
      this.$q.notify({
        message,
        color: type,
        position: 'top-right',
        timeout: 2000
      })
    },
    Editable () {
      this.edit = !this.edit
      if (this.edit) { this.editButtonText = 'Kaydet' } else {
        this.editButtonText = 'Düzenle'
        this.updateCompany()
      }
    },
    updateCompany () {
      const item = {
        id: this.companyItem.id,
        companyShortName: this.companyItem.companyShortName,
        city: this.companyItem.city,
        address: this.companyItem.address,
        website: this.companyItem.website,
        taxOffice: this.companyItem.taxOffice,
        taxOfficeCity: this.companyItem.taxOfficeCity,
        taxNumber: this.companyItem.taxNumber
      }
      this.$api.post('Account/UpdateAsync', item).then(({ data }) => {
        this.showNotify('Güncelleme Başarılı Bir Şekilde Gerçekleşti', 'positive')
      }).catch(({ response }) => {
        this.showNotify('Güncelleme Başarısız Oldu.', 'negative')
      })
    }
  },
  computed: {
    getButtonText () {
      return this.editButtonText
    }

  },
  updated () {
    this.companyItem = {
      ...this.company
    }
  }
}
</script>
<style scoped>
  @media (min-width:1024px){
    .ml-lg{
      margin-left: 1rem;
    }
  }
</style>
