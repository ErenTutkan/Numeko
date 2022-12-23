<template>
<q-page>

        <div class="col">

    <div class="text-h5 q-ml-md text-black bi-align-center q-mt-md" style="display:flex;"><q-icon name="business" size="30px"></q-icon><span style="align-items:center;margin-left: 0.5rem;">  Firma Bilgileri</span></div>
    <div class="row q-pa-md">
        <div class="col-md-3 col-sm-12 col-lg-3 col-xs-12">
            <CompanyCard :company="company"/>
        </div>
        <div class="col-md-9 col-sm-12 col-lg-9 col-xs-12 mt-lg">
            <CompanyDetailCard class="ml-lg" :company="company"></CompanyDetailCard>
        </div>

    </div>
</div>

</q-page>
</template>
<script>

import CompanyCard from 'src/components/CompanyDetail/CompanyCard.vue'
import CompanyDetailCard from 'src/components/CompanyDetail/CompanyDetailCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CompanyCard,
    CompanyDetailCard
  },
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
    ...mapGetters({
      company: 'user/getCompany'
    })
  },
  created () {

  }
}
</script>
<style scoped>
  @media (min-width:1024px) {
    .ml-lg{
    margin-left: 0.8rem;
  }
  }
 @media (max-width:1024px) {
  .mt-lg{
    margin-top:0.8rem;
  }
 }
</style>
