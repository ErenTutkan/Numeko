<template>

  <div ref="content" id="content" style="height:1230px;width:1800px;display:none;" >
    <div class="showcase" style="min-width:100%;min-height:100%;">
      <div class="basari">BAŞARI BELGESİ</div>
      <div class="name" >{{certificate?.joinNameSurname}}</div>
      <div class="description">Katıldığı programı başarıyla tamamlayarak bu belgeyi almaya hak kazanmıştır</div>
      <div class="educationName">{{certificate?.educationName}}</div>
      <div class="companyName" v-if="!isCompanyName">{{certificate?.companyName}}</div>
      <div class="educationDate">{{certificate?.educationDate}}</div>
      <div class="endDate">{{certificate?.certificateValidity}}</div>
     <div class="firstimza"><img width="200px" height="60px" /></div>
      <div class="firstimzadescription">Eğitmen</div>
      <div class="firstimzatext">{{certificate?.educators[0].educatorName}}</div>
      <div class="firstimzacompetence">{{certificate?.educators[0].educatorCompetency}}</div>
      <div class="twoimza"><div class="width:200px;height:60px" :class="{'background-image':`'url('imza.png')`}"  /></div>
      <div class="twoimzadescription">Eğitmen</div>
      <div class="twoimzatext">{{certificate?.educators[1].educatorName}}</div>
      <div class="twoimzacompetence">{{certificate?.educators[1].educatorCompetency}}</div>
      <div class="academyPresidentimza"><img width="200px" height="60px"  /></div>
      <div class="academyPresidentdescription">Akademi Başkanı</div>
      <div class="academyPresidenttext">{{certificate?.acedemyPresident}}</div>
      <div class="academyPresidentcompetence">{{certificate?.acedemyPresidentCompetency}}</div>
      <div class="qr"><qrcode-vue :value="getQRURL" size="175" level="L" /></div><!--<img width="200px" height="200px" src="qr.png"/>-->
      <div class="certificateNo">{{certificate?.certificateCode}}</div>
      <div class="informationtext">* QR (Karekod) taratarak sertifika kontrolü yapılabilir, eğitim içeriğini görüntüleyebilirsiniz.</div>
      <div class="informationtext2">Bu belge sahada alınması gereken önlem ve uygulamaların yerine geçmez.</div>
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import QrcodeVue from 'qrcode.vue'
import jspdf from 'jspdf'
export default {
  props: {
    click: Function,
    id: String,
    isCompanyName: Boolean
  },
  data () {
    return {
      certificate: null
    }
  },
  computed: {
    getAcedemyPresident () {
      return this.certificate?.acedemyPresidentSignature
    },
    getQRURL () {
      return process.env.CERTIFICATE_URL + '/' + this.id
    }
  },
  methods: {
    async download () {
      // eslint-disable-next-line new-cap
      const doc = new jspdf('l')
      const html = this.$refs.content
      console.log(html)
      console.log(this.certificate)
      const item = this.certificate
      html2canvas(html, {
        onclone: async (clonedDoc) => {
          const doc = clonedDoc.getElementById('content')
          doc.style.display = 'block'
        }
      }).then(async function (canvas) {
        const img = canvas.toDataURL('image/png')
        doc.addImage(img, 'PNG', 0, 0, 300, 210)

        doc.save(item?.joinNameSurname + '.pdf')
      })
      this.$emit('generateOff')
    }
  },
  async mounted () {
    console.log(this.id)
    console.log('Çalıştı')
    await this.$api.get('Certificate?certicateId=' + this.id).then(({ data }) => {
      console.log(data)
      this.certificate = data
    })
    await this.download()
  },
  components: {
    QrcodeVue
  }
}
</script>
<style scoped>
.showcase {
    position: relative;
    width: 100%;
    height: 35.76em;
    text-align: center;
    background: url("/Certificate.png");
    background-repeat: no-repeat;

    background-size: cover;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
}

.name {
  margin-top:400px;
    position: absolute;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: "Montserrat", sans-serif;
    font-size: 65px;
    font-weight: 400;
}
.educationName{
  margin-top:620px;
  position: absolute;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: "Montserrat", sans-serif;
    font-size: 32px;
    font-weight: bold;
}
.basari{
  margin-top:280px;
  color:rgb(57, 57, 57);
  position: absolute;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: "Times New Roman", sans-serif;
    font-size: 65px;
    font-weight: 800;
}
.description{
  margin-top:520px;
  width:800px;
  color:rgb(67, 67, 67);
  position: absolute;
  letter-spacing: 1px;
  font-family: "Times New Roman",sans-serif;
  font-size:28px;
  font-style: italic;
  font-weight: 400;
}
.companyName{
  margin-top:655px;
  position: absolute;
  letter-spacing: 1px;
  font-family: "Times New Roman",sans-serif;
  font-size:40px;
  font-weight: 300;
}
.educationDate{
  margin-top:700px;
  position: absolute;
  letter-spacing: 1px;
  font-family: 'Times New Roman', sans-serif;
  font-size:45px;
  font-weight: 500;
}
.endDate{
  color:blue;
  margin-top:1020px;
  margin-right:1280px;
  position: absolute;
  letter-spacing: 1px;
  font-family: "Times New Roman",sans-serif;
  font-size:28px;
  font-weight: 400;
}
.firstimza{
  position: absolute;
  margin-top:930px;
  margin-right: 700px;
}
.firstimzadescription{
  position: absolute;
  margin-top:1000px;
  margin-right: 700px;
  letter-spacing: 1px;
  font-family: 'Times New Roman', Times, serif;
  font-size:25px;
  font-weight: 500;

}
.firstimzatext{
  position: absolute;
  margin-top:1030px;
  margin-right: 700px;
  letter-spacing: 1px;
  font-family: 'Times New Roman', Times, serif;
  font-size:25px;
  font-weight: 500;
}
.firstimzacompetence{
  position: absolute;
  margin-top:1080px;
  margin-right: 700px;
  letter-spacing: 1px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size:14px;
  font-weight: 500;
}
.twoimza{
  position: absolute;
  margin-top:930px;

}
.twoimzadescription{
  position: absolute;
  margin-top:1000px;

  letter-spacing: 1px;
  font-family: 'Times New Roman', Times, serif;
  font-size:25px;
  font-weight: 500;

}
.twoimzatext{
  position: absolute;
  margin-top:1030px;

  letter-spacing: 1px;
  font-family: 'Times New Roman', Times, serif;
  font-size:25px;
  font-weight: 500;
}
.twoimzacompetence{
  position: absolute;
  margin-top:1080px;

  letter-spacing: 1px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size:14px;
  font-weight: 500;
}
.academyPresidentimza{
  position: absolute;
  margin-top:930px;
  margin-left:700px;
}
.academyPresidentdescription{
  position: absolute;
  margin-top:1000px;
  margin-left:700px;
  letter-spacing: 1px;
  font-family: 'Times New Roman', Times, serif;
  font-size:25px;
  font-weight: 500;

}
.academyPresidenttext{
  position: absolute;
  margin-top:1030px;
  margin-left:700px;
  letter-spacing: 1px;
  font-family: 'Times New Roman', Times, serif;
  font-size:25px;
  font-weight: 500;
}
.academyPresidentcompetence{
  position: absolute;
  margin-top:1080px;
  margin-left:700px;
  letter-spacing: 1px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size:14px;
  font-weight: 500;
}
.qr{
  position: absolute;
  margin-top:900px;
  margin-left:1400px;

}
.qr img{
  border-style:solid;
  border-color:black;
}
.certificateNo{
  position: absolute;
  margin-top:1100px;
  margin-left:1400px;
  font-size:24px;
  font-weight: 400;
  color:red;
}
.informationtext{
  position: absolute;
  margin-top:1160px;
  margin-right:700px;
  font-size:20px;
  font-weight: 400;
  font-style:italic;
  color:rgb(51, 51, 51)
}
.informationtext2{
  position: absolute;
  margin-top:1180px;
  margin-right:812px;
  font-size:20px;
  font-weight: 400;
  font-style:italic;
  color:rgb(51, 51, 51)
}
</style>
