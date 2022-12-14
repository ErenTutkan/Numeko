import { boot } from 'quasar/wrappers'
import vueHtml2pdfSsr from 'vue-html2pdf'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }/* { app, router, ... } */) => {
  app.use(vueHtml2pdfSsr)
})
