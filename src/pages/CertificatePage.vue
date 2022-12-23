<template>
  <q-layout view="hHr LpR lFf">
    <q-page >
      <div class="row">
        <div class="col-xs-12 col-md-12 col-lg-12 col-xl-12 flex justify-center">
          <certificate-component :certificate="certificate" :status="status" :error="error"></certificate-component>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>
<script>
import CertificateComponent from 'src/components/CertificatePage/CertificateComponent.vue'
import { useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'
export default {
  setup () {
    const $q = useQuasar()
    let timer
    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })
    return {
      showLoading () {
        $q.loading.show()
      }
    }
  },
  components: {
    CertificateComponent
  },
  async mounted () {
    this.showLoading()
    await this.getCertificate()
  },
  methods: {
    async getCertificate () {
      const id = this.$route.params.id
      // let id=this.$route.params.id;
      await this.$api.get(`Participant/${id}`).then(({ data }) => {
        console.log(data)
        this.certificate = data
      }).catch(({ response }) => {
        this.error = response.data
      })
      this.status = true
      this.$q.loading.hide()
    }
  },
  data () {
    return {
      certificate: null,
      error: null,
      status: false
    }
  }

}

/* <q-page class="bg">

  </q-page> */
</script>
