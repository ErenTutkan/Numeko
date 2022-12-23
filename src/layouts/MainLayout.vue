<template>
  <q-layout view="lHh Lpr lFf" >
    <div class="wrap">
     <!-- <div class="background"></div> -->
    <q-header elevated style="background-color: #efefef;">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          color="black"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

       <!--<q-input  dark  dense standout  v-model="text" label-color="black" label="Ara" color="black" input-class="text-left" bg-color="white" input-style="color:#000;"  class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="text === ''" color="black" name="search"/>
            <q-icon v-else name="clear" color="black" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>-->

        <q-space/>

        <div><q-btn :icon="matPerson" color="black" flat rounded size="1rem" >
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item clickable v-for="item in userMenu" v-close-popup :key="item.Name" >
              <q-item-section @click="menuClick(item.id)" >{{item.Name}}</q-item-section>
            </q-item>
            </q-list>
        </q-menu>
      </q-btn>
    </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="background-color:#E9E9E9;"
    >
    <q-img
          :src="getCompanyImage"
          v-if="getCompany.logo!==''"
          spinner-color="primary"
          spinner-size="82px"
        />
       <div v-else class="text-center q-mt-md"><span class="text-h5" >{{getCompany.companyName}}</span> </div>

        <q-list style="margin-top:1rem;">

        <EssentialLink style="background-color:#E9E9E9;border-bottom:1px solid  #C9C9C9;font-weight: 600;" class="mt-2"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <div class="absolute-bottom"  >
      <div class=" q-mb-xl q-mt-xl text-center">
        <img src="honeywelllogo.png"  style="width:auto;height:10rem;max-width:18.7rem" spinner-color="primary" spinner-size="82px"/>
        <!--<img src="honeywell_logo-removebg.png"  style="width:auto;height:5rem;max-width:18.7rem" spinner-color="primary" spinner-size="82px"/>-->
      </div>
          <div class="absolute-bottom q-mt-xl" style="background-color:#E9E9E9;">
            <!--<div class="text-weight-bold text-center" style="font-size: 2rem;border-bottom:1px solid  #C9C9C9">{{$store.getters['user/getCompanyName']}}</div>
-->
            <div class="text-center q-mb-md"><q-btn color="red-8" text-color="grey-blue-8" icon="mail" label="Bize Ulaşın" @click="contactUs=true" /></div>
          </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog
      v-model="contactUs"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 text-center">Bize Ulaşın</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-gutter-xs">

            <div class="col-xs-12 col-md-12 col-lg-12 col-xl-12">
              <q-input v-model="contactItem.name" type="text" filled stack-label label="Adınız Soyadınız" />
            </div>
            <div class="col-xs-12 col-md-12 col-lg-12 col-xl-12">
              <q-input v-model="contactItem.email" type="text" filled stack-label label="İletişim Adresiniz" />
            </div>
            <div class="col-xs-12 col-md-12 col-lg-12 col-xl-12">
              <q-input v-model="contactItem.subject" type="text" filled stack-label label="İletişim Kurmak İstediğiniz Konu" />
            </div>
            <div class="col-xs-12 col-md-12 col-lg-12 col-xl-12">
              <q-input v-model="contactItem.content" type="textarea" filled stack-label label="İletişim Kurmak İstediğiniz Konunun Açıklaması" />
            </div>
            <div class="col-xs-12 col-md-12 col-lg-12 col-xl-12 q-mt-md"><div class="text-left"><q-btn color="positive" icon="check" label="Gönder" @click="sendContact" /></div></div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Kapat" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  </q-layout>

</template>

<script>
import { matPerson } from '@quasar/extras/material-icons'
import { defineComponent, reactive, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

import { useRouter } from 'vue-router'
import { mapGetters, useStore } from 'vuex'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'

const linksList = [
  {
    title: 'Anasayfa',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Firma Bilgileri',
    icon: 'info',
    link: '/Company'
  },
  {
    title: 'İstatislik',
    icon: 'data_exploration',
    link: '/CompanyStat'
  }
]
const userMenu = [
  { Name: 'Şifre Değiştir', id: 1 },
  { Name: 'Çıkış', id: 2 }
]
const text = ref()
export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const store = useStore()
    const router = useRouter()
    const leftDrawerOpen = ref(false)
    const $q = useQuasar()
    const showNotify = (message, type) => {
      $q.notify({
        message,
        color: type,
        position: 'top-right'
      })
    }
    const menuClick = (id) => {
      console.log(id)
      if (id === 1) {
        router.push('/changepassword')
      } else if (id === 2) {
        console.log('Burası Çalıştı')
        store.commit('user/Logout')
        router.push('/login')
      } else {
        router.push('/')
      }
    }
    const company = () => {
      store.dispatch('user/getCompany')
    }
    const contactItem = reactive({
      name: '',
      email: '',
      subject: '',
      content: ''
    })
    const sendContact = () => {
      if (contactItem.name !== '' && contactItem.email !== '' && contactItem.subject !== '' && contactItem.content !== '') {
        api.post('Contact', contactItem).then(() => {
          showNotify('Göderdiğiniz Mesaj Başarılı Bir Şekilde Bize Ulaşmıştır.', 'positive')
        }).catch(({ response }) => {
          for (const item of response.data) {
            showNotify(item, 'negative')
          }
        })
      } else {
        showNotify('Bir Alanı Boş Bıraktınız', 'negative')
      }
    }

    return {
      matPerson,
      userMenu,
      essentialLinks: linksList,
      leftDrawerOpen,
      text,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      menuClick,
      company,
      contactItem,
      sendContact,
      showNotify
    }
  },
  mounted () {
    this.company()
  },
  updated () {
    this.company()
  },
  data () {
    return {
      contactUs: false
    }
  },
  computed: {
    ...mapGetters({
      getCompany: 'user/getCompany'
    }),
    getContactUs () {
      return this.contactUs
    },
    getCompanyImage () {
      return process.env.CERTIFICATE_URL + this.getCompany?.logo
    }
  }
})
</script>
<style scoped>
@media (min-width:1024px) {
  .menu-title{
    font-size: 1rem;
}
}
@media (max-width:1024px) {
  .menu-title{
    font-size: 0rem;
}
}
.text-color {
  color: rgb(0, 0, 0) !important;
}
.wrap{
  position: relative;
}
.background{
background:url('/Logo.png') no-repeat center center ;
background-size: 100vh;
background-position: center center;
}
</style>
