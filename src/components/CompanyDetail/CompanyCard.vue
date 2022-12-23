<template>
    <q-card  bordered class="col-xs-12 col-md-3 col-lg-3">
      <q-card-section>

        <div class="text-h6 text-center">
            <q-avatar  size="6rem">
                <img @click="handleBtnClick" @error="replaceByDefault" :src="getImageUrl">
            </q-avatar >
            <q-file label="Logo Yükle" v-model="file" @update:model-value="fileUpload()" filled clearable style="display:none;" ref="file"></q-file>
          <!--  <q-btn color="primary" icon="download"  @click="handleBtnClick" />-->
        </div>
        <div class=" text-h5 text-center q-mt-xs"><q-btn dense no-caps color="primary" icon="download" label="Logo Yükle"  @click="handleBtnClick" /></div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="row">
            <div class="col-3"><span class="text-bold">Telefon</span></div>
            <div class="col-6">{{company?.phone}}</div>
        </div>

      </q-card-section>
      <q-separator  inset />
      <q-card-section >
        <div class="row">
            <div class="col-3">
                <span class="text-bold">Email</span>
            </div>
            <div class="col-6">
                <span>{{company?.email}}</span>
            </div>
        </div>

      </q-card-section>
      <q-separator inset />
      <q-card-section >
        <div class="row">
            <div class="col-3">
                <span class="text-bold">Firma</span>
            </div>
            <div class="col-6">
                <span>{{company?.companyName}}</span>
            </div>
        </div>

      </q-card-section>
    </q-card>
</template>
<script>
import { api } from 'src/boot/axios'
export default {
  props: {
    company: Object
  },
  data () {
    return {
      file: null
    }
  },
  methods: {
    handleBtnClick () {
      this.$refs.file.pickFiles()
    },
    fileUpload () {
      console.log(this.file)
      if (this.file != null) {
        // eslint-disable-next-line no-var
        var data = new FormData()
        data.append('file', this.file)
        console.log(data)
        api.post(`Account/LogoUpload?userId=${this.company.id}`, data, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        }).then(({ data }) => {
          this.$store.commit('user/setLogo', data)
          this.$q.notify({
            message: 'Logonun Etkinleşmesi için Sayfayı Yenileyiniz.',
            timeout: 1000,
            color: 'positive'
          })
        })
      }
    },
    replaceByDefault (e) {
      e.target.src = process.env.CERTIFICATE_URL + 'images/bulut.png'
    }
  },
  computed: {
    getImageUrl () {
      return process.env.CERTIFICATE_URL + this.company.logo
    }
  }
}
</script>
<style lang="sass" scoped>
    .my-card
      width: 100%
      max-width: 250px
    </style>
