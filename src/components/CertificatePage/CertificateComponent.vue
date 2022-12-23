<template>
<div class=" mainDiv" v-if="status" >
  <div v-if="certificate!=null">
  <q-card class="my-card q-mt-md">
    <img src="numekoacademylogo.png"/>

    <q-card-section class="bg-green-6 ">
      <div class="text-h5 text-white"><q-icon name="check" color="white" /> Sertifika Geçerli</div>
      <div class="text-subtitle2 text-white">Sertifikanız halen geçerli olup, detaylar aşağıda gösterilmiştir.</div>
    </q-card-section>
    <q-card-section class="border">
      <div class="row card-text"><div class="col-6 text-blue-6 ">Sertifika Geçerlilik Tarihi</div> <div class="col-6 text-right text-white"><span class="bg-blue-8 round q-pa-xs">{{certificate.certificateValidityDate}}</span> </div> </div>
    </q-card-section>
    <q-card-section class="border">
      <div class="row card-text"><div class="col-6 text-blue-6 ">Ad Soyad</div> <div class="col-6 text-right "><span >{{certificate.joinNameSurname.toUpperCase()}}</span> </div> </div>
    </q-card-section>
    <q-card-section class="border">
      <div class="row card-text"><div class="col-6 text-blue-6 ">Eğitim Tarihi</div> <div class="col-6 text-right text-white"><span class="bg-green-7 round q-pa-xs">{{certificate.certificateDate}}</span> </div> </div>
    </q-card-section>
    <q-card-section class="border">
      <div class="row card-text"><div class="col-6 text-blue-6 ">Eğitim Kodu</div> <div class="col-6 text-right "><span >{{certificate.educationCode.toUpperCase()}}</span> </div> </div>
    </q-card-section>
    <q-card-section class="border">
      <div class="row card-text"><div class="col-6 text-blue-6 ">Eğitim Adı</div> <div class="col-6 text-right "><span >{{certificate.educationName.toUpperCase()}}</span> </div> </div>
    </q-card-section>
    <q-card-section class="border">
      <div class="row card-text"><div class="col-6 text-blue-6 ">Belge Türü</div> <div class="col-6 text-right "><span >Başarı Belgesi</span> </div> </div>
    </q-card-section>
    <q-card-section class="border">
      <div class="row card-text"><div class="col-6 text-blue-6 ">Eğitmen Adı</div> <div class="col-6 text-right "><span >{{certificate.educatorName}}</span> </div> </div>
    </q-card-section>
    <q-card-section class="border">
      <div class="row card-text"><div class="col-6 text-blue-6 ">Sertifika Kodu</div> <div class="col-6 text-right "><span >{{certificate.certificateCode}}</span> </div> </div>
    </q-card-section>
  </q-card>
  <q-card class="my-card q-mt-lg q-mb-lg">

    <q-card-section class="border-bottom">
      <div class="card-title q-ml-xs"><q-icon name="content_paste" /> Eğitim İçeriği</div>
    </q-card-section>
    <q-card-section>
    </q-card-section>
    <q-card-section class="q-ml-xs">
      <div class="card-subtitle">Teorik Eğitim</div>
      <div class="">Teorik | {{certificate.theoreticalTrainingHours}} saat</div>
    </q-card-section>
    <q-card-section class="q-ml-xs card-content"><div v-html="replaceTheoreticalContent"></div></q-card-section>
    <q-card-section class="q-ml-xs">
      <div class="card-subtitle">Pratik Eğitim</div>
      <div class="">Pratik | {{certificate.practiceTrainingHours}} saat</div>

    </q-card-section>
    <q-card-section class="q-ml-xs "><div class="card-content"  v-html="replacePracticeContent"></div></q-card-section>

  </q-card>
</div>
<div v-else class="q-mt-md">
    <img src="numekoacademylogo.png"/>
    <q-card class="bg-negative">
      <q-card-section><q-icon class="q-ml-lg q-mr-lg" color="white" size="2rem" name="block" /> <span class="text-white text-h6 vertical-middle" > Sertifika Bulunamadı</span></q-card-section>
      <q-card-section class="text-white text-body1 q-ml-lg">Sistemlerimizde geçerli böyle bir sertifika bulunamamıştır.</q-card-section>
    </q-card>
</div>
</div>
</template>
<script>
export default {
  setup () {

  },
  props: {
    certificate: Object,
    error: String,
    status: Boolean
  },
  data () {
    return {

    }
  },
  computed: {
    replaceTheoreticalContent () {
      return this.certificate.theoreticalTrainingContent.replaceAll('*', '<br>')
    },
    replacePracticeContent () {
      return this.certificate.practiceTrainingContent.replaceAll('*', '<br/>')
    }
  }
}
</script>
<style>
@media (max-width:1000px) {
  .mainDiv{
    width:100vw;
  }
}
@media (min-width: 1001px){
  .mainDiv{
    width:35vw;
  }
}
.border{
  border-top: solid 1px rgb(218, 215, 215);
}
.card-text{
  font-size: 0.9rem;
}
.round{
  font-weight: 600;
  border: solid 1px grey;
  border-radius: 0.3rem;
}
.q-card__section--vert {
    padding:8px !important;
}
.border-bottom{
  border-bottom:solid 1px rgb(218,215,215)
}
.card-title{
  font-size:1.2rem;
}
.card-subtitle{
  font-size:1.1rem;
  font-weight: 600;
}
.card-content{
  font-size:1rem;
}
</style>
