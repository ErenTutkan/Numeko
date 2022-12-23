<template>
  <q-page>
   <div class="col">
    <div class="col-12 q-pa-md">
      <q-card class="my-card">

        <q-card-section>
          <div class="text-h6"><q-icon name="key" size="34px" /> Şifre Değiştirme</div>

        </q-card-section>
        <q-card-section>
          <form-component :changePassword="changePassword"></form-component>
        </q-card-section>
      </q-card>
    </div>
   </div>
   </q-page>
</template>
<script>
import FormComponent from 'src/components/ChangePasswordPage/FormComponent.vue'
export default {
  components: {
    FormComponent
  },
  methods: {
    changePassword (password) {
      if (password?.newPassword === password?.checkPassword) {
        this.$api.post('Account/ChangePassword', password).then(({ data }) => {
          this.showNotify('Şifre Değiştirme İşlemi Gerçekleşti', 'positive')
          this.$router.push('/')
        }).catch(({ response }) => {
          for (const item of response.data) {
            this.showNotify(item, 'negative')
          }
        })
      } else {
        this.showNotify('Şifreleriniz Uyuşmuyor.', 'negative')
      }
    },
    showNotify (message, type) {
      this.$q.notify({
        message,
        color: type,
        position: 'top-right',
        timeout: 1000
      })
    }
  }
}
</script>
