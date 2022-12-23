import { boot } from 'quasar/wrappers'
import VideoBg from 'vue-videobg'
export default boot(({ app }) => {
  app.use(VideoBg)
})
