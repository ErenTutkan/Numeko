<template>
  <q-form
    @submit="changePassword(item)"
    class="q-gutter-md"
  >
    <div class="col-xs-12 col-md-12">
      <q-input v-model="item.oldPassword" :rules="[val => !!val || 'Bu Alanı Boş Bırakamazsınız']" type="password" filled label="Eski Şifreniz" />
    </div>
    <div class="col-xs-12 col-md-12">
      <q-input v-model="item.newPassword" type="password" :rules="[val => !!val || 'Bu Alanı Boş Bırakamazsınız']" filled label="Yeni Şifreniz" />
    </div>
    <div class="col-xs-12 col-md-12">
      <q-input v-model="item.checkPassword" type="password" :rules="[val => !!val || 'Bu Alanı Boş Bırakamazsınız']" filled label="Yeni Şifrenizi Tekrar Giriniz" />
    </div>
    <div>
      <q-btn label="Kaydet" type="submit" color="positive"/>
    </div>
  </q-form>
</template>
<script>
export default {
  props: {
    changePassword: Function
  },
  data () {
    return {
      item: {
        id: this.$store.getters['user/getUserId'],
        oldPassword: null,
        newPassword: null,
        checkPassword: null
      }
    }
  }
}</script>
