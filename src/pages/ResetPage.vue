<template>
    <q-page class="flex window-width" >
      <div class="row justify-center items-center window-width " >
        <div class="col-md-3 col-xs-10 bg-white rounded-borders" style="height:60vh">
          <div class="row flex full-height">

            <div class="col-md-12 col-xs-12 flex">
              <div class="justify-center flex full-width items-center">

                <q-form
                style="margin-right:1rem!important"
                  @submit="ResetPassword"
                  class="q-gutter-md full-width"
                >
                <div class="text-center"><q-img
                  src="numekoacademylogo.png"

                  spinner-color="primary"
                  spinner-size="82px"
                /></div>
                <q-input v-model="email"  type="text" label="Email Adresiniz" filled outlined input-class="input-text" />
                  <div class="flex justify-center">
                    <q-btn label="Şifremi Unuttum" type="submit" color="primary"/>
                  </div >
                  <div class="row flex text-center">
                    <div class="col-12 cursor" @click="$router.push('/login')">Giriş Yap</div>

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
import { defineComponent, ref } from 'vue'

import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
export default defineComponent({

  setup () {
    const $q = useQuasar()
    function showNotify (message, type) {
      $q.notify({
        message,
        color: type,
        position: 'top-right',
        timeout: 600
      })
    }
    const vantaEffect = ref(null)
    const email = ref(null)
    function ResetPassword () {
      api.get('Account/PasswordReset?email=' + email.value).then(({ data }) => {
        showNotify('Şifre Sıfırlama İsteğiniz E Posta Adresinize Yollandı', 'positive')
      }).catch(({ response }) => {
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index]
          showNotify(element, 'negative')
        }
      })
    }
    return {
      ResetPassword, email, showNotify, vantaEffect
    }
  },
  computed: {
    isMobile () {
      return this.$q.platform.is.mobile
    }
  }

})
</script>

<style scoped>
.login-background{
  background: linear-gradient(-135deg,#58bfff,#adfffc);
}
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
