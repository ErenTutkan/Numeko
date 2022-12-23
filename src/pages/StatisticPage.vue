<template>
    <q-page>
        <div class="col">
            <div class="text-h5 q-ml-md text-black bi-align-center q-mt-md" style="display:flex;"><img src="https://img.icons8.com/external-flat-berkahicon/30/000000/external-Statistics-market-analytics-flat-berkahicon.png"/><span style="align-items:center;margin-left: 0.5rem;">  İstatislikler</span></div>
            <div class="row q-pa-md">
                <div class="col-md-6 col-xs-12 col-sm-12 col-lg-6 col-xl-6">
                    <CardTemplate :is-education="true" :list="EducationData" :educationCount="chartEducationCount">
                        <template v-slot:CardTitle>Eğitim Adetleri</template>
                        <template v-slot:CardButton>

                        <!--  <q-icon flat color="grey" name="download" size="sm" ></q-icon>-->
                         <!-- <q-icon flat color="grey" name="menu" size="sm" ></q-icon>-->
                         <q-btn v-if="false" color="positive" dense  flat no-caps @click="onClick" />

                        </template>
                    </CardTemplate>
                </div>
                <div class="col-md-6 col-xs-12 col-sm-12 col-lg-6 col-xl-6">
                    <CardTemplate class="ml-lg mt-lg" :list="ParticipantData">
                        <template v-slot:CardTitle>Katılımcı İstatislikleri</template>
                        <template v-slot:CardButton>
                          <q-icon flat color="grey" v-if="false" name="download" size="sm" ></q-icon>
                          <q-icon flat color="grey" name="menu" v-if="false" size="sm" ></q-icon>
                        </template>
                    </CardTemplate>
                </div>
            </div>
            <div class="row q-pa-md">
              <div class="col-md-6 col-xs-12 col-sm-12 col-lg-6 col-xl-6">
                    <CardTemplate :is-education="true" :list="EducationData" :is-chart="true" :educationCount="chartEducationCount">
                        <template v-slot:CardTitle>Eğitim Adetleri</template>
                        <template v-slot:CardButton>

                        <!--  <q-icon flat color="grey" name="download" size="sm" ></q-icon>-->
                         <!-- <q-icon flat color="grey" name="menu" size="sm" ></q-icon>-->
                         <q-btn v-if="false" color="positive" dense  flat no-caps @click="onClick" />

                        </template>
                    </CardTemplate>
                </div>
            </div>
        </div>
    </q-page>
</template>
<script>

import CardTemplate from 'src/components/StatisticPage/CardTemplate.vue'
export default {
  components: {
    CardTemplate

  },
  data () {
    return {
      EducationData: [
        {
          IconUrl: 'https://img.icons8.com/cute-clipart/48/000000/flip-chart.png',
          TotalNumber: 0,
          Title: 'İstenen Eğitim Sayısı'
        },
        {
          IconUrl: 'https://img.icons8.com/fluency/48/000000/parking.png',
          TotalNumber: 0,
          Title: 'Planlanan Eğitim Sayısı'
        },
        {
          IconUrl: 'https://img.icons8.com/color/48/000000/school.png',
          TotalNumber: 0,
          Title: 'Gerçekleşen Eğitim Sayısı'
        }
      ],
      ParticipantData: [
        {
          IconUrl: 'https://img.icons8.com/external-dualtone-zulfa-mahendra/48/000000/external-graduate-online-study-dualtone-zulfa-mahendra.png',
          TotalNumber: 0,
          Title: 'Toplam Katılımcı Sayısı'
        },
        {
          IconUrl: 'https://img.icons8.com/color-glass/48/000000/certificate.png',
          TotalNumber: 0,
          Title: 'Geçerli Sertifika Sayısı'
        },
        {
          IconUrl: 'https://img.icons8.com/external-anggara-blue-anggara-putra/48/000000/external-time-support-anggara-blue-anggara-putra.png',
          TotalNumber: 0,
          UnitExtension: 'Adam/Gün',
          Title: 'Toplam Eğitimde Harcanan Süre'
        }
      ],
      chartEducationCount: [
      ]
    }
  },
  methods: {
    async getEducationCounts () {
      const companyId = this.$store.getters['user/getUserId']
      await this.$api.get(`Education/EducationCount?companyId=${companyId}`).then(({ data }) => {
        this.EducationData[0].TotalNumber = data.totalCount
        this.EducationData[1].TotalNumber = data.planningCount
        this.EducationData[2].TotalNumber = data.realizedCount

        this.chartEducationCount.push(data.planningCount)
        this.chartEducationCount.push(data.realizedCount)
      })
    },
    async setCount () {
      await this.$store.dispatch('getTotalCount')
      const totalDay = this.$store.getters.getTotalDay
      const totalCount = this.$store.getters['participant/getTotalCount']
      const validCount = this.$store.getters['participant/getValidCount']
      this.ParticipantData[0].TotalNumber = totalCount
      this.ParticipantData[1].TotalNumber = validCount
      this.ParticipantData[2].TotalNumber = parseFloat((totalCount / totalDay)).toFixed(2) | 0
    }
  },
  async created () {
    await this.getEducationCounts()
    await this.setCount()
  }
}
</script>
<style scoped>
@media (min-width:991px) {
    .ml-lg{
        margin-left: 1rem !important;
    }

}
@media (max-width:992px) {
    .mt-lg{
        margin-top:1rem;
    }
}
</style>
