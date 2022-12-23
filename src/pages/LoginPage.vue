<template>
    <q-page class=" full-width full-height flex">
      <div class="row justify-center items-center window-width " >
        <div class="col-md-3 col-xs-10 bg-white rounded-borders" style="height:60vh">
          <div class="row flex full-height">

            <div class="col-md-12 col-xs-12 flex bg-blue-">
              <div class="justify-center flex full-width items-center">

                <q-form
                  @submit="Login"
                  style="margin-right:1rem !important"
                  class="q-gutter-md full-width"
                >
                <div class="text-center"><q-img
                  src="numekoacademylogo.png"
                  spinner-color="primary"
                  spinner-size="82px"
                /></div>
                <q-input v-model="user.email"  type="text"   hint="example@example.com"  label="Email"  filled outlined input-class="input-text" />
                <q-input v-model="user.password" type="password" label="Şifre" filled outlined  input-class="input-text" />
                  <div class="flex justify-center">
                    <q-btn label="Giriş Yap" type="submit" :disable="btnDisable" color="positive"/>
                  </div >
                  <div class="row flex text-center">
                    <div class="col-7 cursor" @click="$router.push('/reset')">Şifremi Unuttum</div>
                  <div class="col-5 cursor" @click="Register"> Kayıt Ol</div>
                  </div>

                </q-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
</template>
<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()

    function Register () {
      $q.dialog({
        title: 'Kayıt Ol',
        message: 'Sadece müşterilerimiz için kayıt açılmaktadır. Eğer müşterimiz iseniz, lütfen info@numekoacademy.com adresine eposta gönderiniz.',
        position: 'top'
      })
    }

    return {
      Register
    }
  },
  computed: {
    isMobile () {
      return this.$q.platform.is.mobile
    }
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      btnDisable: false,
      vantaEffect: null
    }
  },
  methods: {
    async Login () {
      this.btnDisable = true
      await this.$store.dispatch('user/Login', this.user)
      this.btnDisable = false
    }
  }
})
</script>

<style scoped>
@media (min-width:1000px) {
  .input-text{
    width:18rem !important;
}
@media (max-width:998px) {
  .input-text{
    width:70vw !important;
  }
}
}
.cursor{
  cursor:pointer;
}
</style>
