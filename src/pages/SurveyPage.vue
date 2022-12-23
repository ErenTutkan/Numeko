<template>

        <q-page class="full-width full-height " >
            <div class="row justify-center q-pa-md ">
                <div class="col-md-4 bg-white   rounded-borders text-center">
                    <q-form
                    @submit="postSurvey"
                        class="q-gutter-md q-pa-md"
                    >
                        <div class="q-mt-md">
                            <div class="label">{{firstQuestion}}</div>
                            <q-select v-model="firstQuestionAnswer" :options="options"   :label="firstQuestion" filled />
                        </div>
                        <div class="q-mt-md" v-for="item in questions" :key="item">
                            <div class="label" >
                                {{item.question}}
                            </div>
                            <q-input v-model="item.answer" :type="item.type" :label="item.question" :disable="item.isNotNull" autogrow filled class="q-mt-xs" />
                        </div>
                        <div>
                            <q-btn label="Gönder" type="submit" color="primary"/>

                        </div>
                    </q-form>

                </div>
            </div>
        </q-page>
</template>
<script>
export default {
  data () {
    return {
      firstQuestion: '',
      firstQuestionAnswer: '',
      questions: [
      ],
      vantaEffect: null,
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }
  },
  methods: {
    postSurvey () {
      const postItem = {
        recordId: this.$route.query.id,
        firstQuestionAnswer: this.firstQuestionAnswer,
        twoQuestionAnswer: this.questions[0].answer,
        threeQuestionAnswer: this.questions[1].answer,
        fourQuestionAnswer: this.questions[2].answer,
        educationInventoryAnswer: this.questions[3].answer,
        adviceAndRecommendations: this.questions[4].answer
      }
      this.$api.post('Survey', postItem).then(() => {
        this.$q.notify({
          message: 'Anketimizi doldurduğunuz için teşekkür ederiz. Sayfa 10 saniye sonra kapanacaktır.',
          color: 'positive',
          position: 'top-right',
          timeout: 4000
        })
        setTimeout(() => {
          window.open(location.href, '_self', '')
          open(location, '_self').close()
        }, 10000)
      }).catch(({ response }) => {
        for (const message of response.data) {
          this.$q.notify({
            message,
            color: 'negative',
            timeout: 2000,
            position: 'top-right'
          })
        }
      })
    }
  },
  async mounted () {
    const id = this.$route.query.id
    if (id === null && id === '') {
      this.$router.push('errorPage')
    }
    this.$q.loading.show({
      message: 'Anketiniz Yükleniyor'
    })

    await this.$api.get('Survey?educationPlanId=' + id).then(({ data }) => {
      this.firstQuestion = data.firstQuestion
      this.firstQuestionAnswer = data.firstQuestionAnswer
      this.questions.push({
        question: data.twoQuestion,
        answer: data.twoQuestionAnswer,
        type: 'text',
        isNotNull: data.twoQuestionAnswer !== ''
      })
      this.questions.push({
        question: data.threeQuestion,
        answer: data.threeQuestionAnswer,
        type: 'text',
        isNotNull: data.threeQuestionAnswer !== ''
      })
      this.questions.push({
        question: data.fourQuestion,
        answer: data.fourQuestionAnswer,
        type: 'text',
        isNotNull: data.fourQuestionAnswer !== ''
      })
      this.questions.push({
        question: data.educationInventory + ' Kullanılan Materyeller ile ilgili Yorumlarınız',
        answer: data.educationInventoryAnswer,
        isNotNull: data.educationInventoryAnswer !== '',
        type: 'text'
      })
      this.questions.push({
        question: 'İstek ve Önerileriniz',
        answer: data.adviceAndRecommendations,
        isNotNull: data.adviceAndRecommendations !== '',
        type: 'text'
      })
      console.log(this.questions)
    }).catch(({ response }) => {
      console.log(response)
      this.$q.notify({
        message: 'Böyle Bir Kayıt Bulunamadı veya Tarihi Geçti Ana sayfaya yönlendiriliyor',
        color: 'negative',
        position: 'top-right',
        timeout: 2000
      })
      setTimeout(() => {
        this.$router.push('/login')
      }, 2200)
    })
    this.$q.loading.hide()
  }
}
</script>
<style scoped>
.label{
    font-weight:600;
    font-size:1rem;
}
</style>
