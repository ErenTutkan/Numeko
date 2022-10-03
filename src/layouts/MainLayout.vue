<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #717171;">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-input dark dense standout v-model="text" label="Ara" input-class="text-left" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>

        <q-space/>

        <div><q-btn :icon="matPerson" >Müşteri Adı</q-btn></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="background-color:#E9E9E9;"
    ><div class="absolute-top"  style="height: 7rem">
          <div class="absolute-bottom " style="background-color:#E9E9E9;">
            <div class="text-weight-bold text-center" style="font-size: 2rem;border-bottom:1px solid  #C9C9C9">Semih Koçak</div>

          </div>
        </div>

        <q-list style="margin-top:7rem">

        <EssentialLink style="background-color:#E9E9E9;border-bottom:1px solid  #C9C9C9" class="mt-2"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { matPerson } from '@quasar/extras/material-icons'
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Anasayfa',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Firma Bilgileri',
    icon: 'info',
    link: '/deneme'
  },
  {
    title: 'İstatislik',
    icon: 'data_exploration',
    link: 'https://chat.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      matPerson,

      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style scoped>

</style>
