<template>
    <q-card>
        <q-card-section>
           <div class="row">
            <div class="col-6 text-bold"><slot name="CardTitle"></slot></div>
            <div  @click="openCloseCharts" class="col-6 text-right"><slot name="CardButton"></slot></div>
           </div>
        </q-card-section>
        <q-card-section>

        </q-card-section>
        <q-separator inset></q-separator>
      <div v-if="!isChart"><card-item v-for="item in list" :key="item" :item="item"/></div>
      <div v-else><apexchart height="250" type="pie" :options="options" :series="educationCount"></apexchart></div>
    </q-card>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts'
import CardItem from './CardItem.vue'
import { getCssVar } from 'quasar'
export default {
  components: {
    CardItem,
    apexchart: VueApexCharts
  },
  props: {
    list: {
      type: Array
    },
    educationCount: Array,
    isEducation: {
      type: Boolean,
      default: false
    },
    isChart: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      charts: false,
      options: {

        chart: {
          id: 'apex-donut'
        },
        colors: [
          getCssVar('warning'),
          getCssVar('positive'),
          getCssVar('primary'),
          getCssVar('primary'),
          getCssVar('negative'),
          getCssVar('info')
        ],
        markers: {
          size: 4,
          hover: {
            sizeOffset: 6
          }
        },
        labels: [
          'Planlanan Eğitim Sayısı',
          'Gerçekleşen Eğitim Sayısı'
        ]
      },
      series: [
        /**
         * Data source:
         * https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population
         */
        4694576167,
        1393676444,
        745173774,
        595783465,
        434254119,
        44491724
      ]
    }
  },
  methods: {
    openCloseCharts () {
      if (this.isEducation === true) {
        this.charts = !this.charts
      }
    }
  }

}
</script>
